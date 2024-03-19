import React, {useState, useEffect, useRef, createFactory} from "react";
import './Login.css';
import classNames from "classnames";
import {NavLink} from "react-router-dom";
import {regexPatterns} from "../../helpers/regex";
import ReCAPTCHA from "react-google-recaptcha";
import {NotificationComponent} from "../NotificationComponent/NotificationComponent";
import {toast} from "react-toastify";
import axios from "axios";

export const Login = (props) => {
    const [checked, setChecked] = useState(false);
    const [switchToRegister, setSwitchToRegister] = useState(false);
    const [switchToReset, setSwitchToReset] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);

    const toggleCheckbox = () => setChecked(!checked);
    const toggleSwitchToReg = () => setSwitchToRegister(!switchToRegister);
    const toggleSwitchToReset = () => setSwitchToReset(!switchToReset)

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    }
    const handleInputChange = (e) => {
        const { value, pattern } = e.target;
        if(!pattern){
            return
        }
        const isValid = new RegExp(pattern).test(value);
        e.target.classList.toggle('input-correct', isValid);
        e.target.classList.toggle('wrong-input-value', !isValid);
        e.target['data-valid'] = isValid

    }

    const clearInputs = () => {
        const textInputs = Array.from(document.querySelectorAll('input[type=text]'));
        const passwordInputs = Array.from(document.querySelectorAll('input[type=password]'));

        [...textInputs, ...passwordInputs].forEach(input => {
            input.value=null;
            input.classList.remove('wrong-input-value');
            input.classList.remove('input-correct');
        })
    }

    const allInputsFilled = (form) => {
        let filled = true;
        for (const el of form.elements) {
            if (!el['data-valid'] === true && (el.type === 'password' || el.type === 'text')){
                filled = false;
                break;
            }
        }
        return filled
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.currentTarget

        if(!allInputsFilled(form)){
            toast.warning('Заполните все поля');
            return;
        }
        if(form.elements['password'].value !== form.elements['passwordconfirm'].value){
            toast.warning('Пароли должны совпадать')
            return;
        }
        if(!captchaValue){
            toast.warning('Подтвердите что Вы человек');
            return;
        }

        try{
            const response = await axios.post(
                `${props.host.auth}/register`,
                {
                email: form.elements['email'],
                password: form.elements['password'],
            }, {
            headers: {
              "Content-Type": "application/json",
            }})

            if(response.status === 200){
                toast.success('Вы успешно зарегистрированы. Пожалуйста авторизуйтесь')
                toggleSwitchToReg();
            } else {
                toast.error('Регистрация прошла неудачно. Попробуйте еще раз')
            }
        } catch (e) {
            toast.error('Регистрация в данный момент невозможна. Пожалуйста, попробуйте позже')
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const form = e.currentTarget

        if(!allInputsFilled(form)){
            toast.warning('Заполните все поля');
            return;
        }

        try {
            const response = await axios.post(
                `${props.host.auth}/resetpassword`,
                {
                    email: form.elements['email'],
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

            if(response.status === 200){
                toast.success('Заявка на смену пароля обработана. Проверьте электронную почту')
            } else{
                toast.warning('Не удалось запросить смену пароля')
            }
        }
        catch (e){
            toast.error('Сброс пароля в данный момент недоступен. Пожалуйста попробуйте позже')
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if(!allInputsFilled(form)){
            toast.warning('Заполните все поля');
            return;
        }

        if(!captchaValue){
            toast.warning('Подтвердите что Вы человек');
            return;
        }

        try{
            const response = await axios.post(
                `${props.host.auth}/login`,
                {
                    email: form.elements['email'],
                    password: form.elements['password'],
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
            if(response.status === 200){
                toast.success('LOGGED IN')
                // TODO здесь проверка что логин и пароль правильные, выдача токена, сохранение в редакс хранилище,
                // TODO обработка чекбокса и сохранение куки если галочка стоит
            } else{
                toast.error('Не удалось войти в аккаунт. Попробуйте позже')
            }
        }
        catch (e) {
            toast.error('Авторизация в данный момент недоступна. Пожалуйста попробуйте позже')
        }



    }

    return (
        <>
            <div className="container">
                <NotificationComponent position="top-right"/>
                <div className="login-content">
                    <div className="login-back-button">
                        <NavLink to="/" id="login-back-arrow"><i className="fa-solid fa-arrow-left"></i></NavLink>
                    </div>
                    <div className="login-wrapper">

                        <div className={classNames("login-content-section", {
                                'login-switch-right': switchToRegister,
                                'login-switch-left': switchToReset,
                            })}>
                            <div className="login-header">
                                <h3></h3>
                                <div className="button" onClick={() => {
                                    toggleSwitchToReset();
                                    clearInputs();
                                }}>
                                    I remember my password
                                </div>
                            </div>
                            <div className="clear"></div>
                            <form method="POST" onSubmit={handleResetPassword}>
                                <div>
                                    <label className="user" htmlFor="text">
                                        <i className="fa-solid fa-user"></i>
                                    </label>
                                    <input className="user-input"
                                           type="text"
                                           name="password"
                                           pattern={regexPatterns.email.source}
                                           onChange={handleInputChange}
                                           placeholder="Email"/>
                                </div>
                                <div>
                                    <input type="submit" value="Reset password"/>
                                </div>
                                <div className="clear"></div>
                            </form>
                        </div>

                        <div className={classNames("login-content-section", {
                            'login-switch-right': switchToRegister,
                            'login-switch-left': switchToReset,
                            })}>
                            <div className="login-header">
                                <h3 className="sign-in">Sign in</h3>
                                <div className="button" onClick={() => {
                                    toggleSwitchToReg();
                                    clearInputs();
                                }}>
                                    Register
                                </div>
                            </div>
                            <div className="clear"></div>
                            <form method="POST" onSubmit={handleLogin}>
                                <div>
                                    <label className="user" htmlFor="text">
                                        <i className="fa-solid fa-user"></i>
                                    </label>
                                    <input className="user-input"
                                           type="text"
                                           name="email"
                                           placeholder="Email"
                                           pattern={regexPatterns.email.source}
                                           onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="lock" htmlFor="password">
                                        <i className="fa-solid fa-key"></i>
                                    </label>
                                    <input type="password"
                                           name="password"
                                           placeholder="Password"
                                           pattern={regexPatterns.password.source}
                                           onChange={handleInputChange}
                                    />
                                </div>
                                <label>
                                    <ReCAPTCHA
                                        sitekey={process.env.REACT_APP_CAPTCHA_KEY}
                                        onChange={handleCaptchaChange}
                                    />
                                </label>
                                <div>
                                    <input type="submit" value="Sign in"/>
                                </div>
                                <div className={classNames("radio-check", {'login-checkbox-success': checked})}>
                                    <input type="radio" className="radio-no" id="no" name="remember" value="no"/>
                                    <label htmlFor="no" onClick={toggleCheckbox}><i className="fa fa-times"></i></label>
                                    <input type="radio" className="radio-yes" id="yes" name="remember" value="yes"/>
                                    <label htmlFor="yes" onClick={toggleCheckbox}><i
                                        className="fa fa-check"></i></label>
                                    <span className="switch-selection"></span>
                                </div>
                                <span className="check-label">Remember me</span>
                                <span className="forgot-label" onClick={() => {
                                    toggleSwitchToReset();
                                    clearInputs();
                                }}>Lost your password?</span>
                                <div className="clear"></div>
                            </form>
                        </div>

                        <div className={classNames("login-content-section", {
                            'login-switch-right': switchToRegister,
                            'login-switch-left': switchToReset,
                        })}>
                        <div className="login-header">
                                <h3 className="sign-in">Register</h3>
                                <div className="button" onClick={() => {
                                    toggleSwitchToReg();
                                    clearInputs();
                                }}>
                                    I have an account
                                </div>
                            </div>
                            <div className="clear"></div>
                            <form method="POST" onSubmit={handleRegister}>
                                <div>
                                    <label className="user" htmlFor="text">
                                        <i className="fa-solid fa-user"></i>
                                    </label>
                                    <input className="user-input" type="text"
                                           name="email"
                                           placeholder="Email"
                                           pattern={regexPatterns.email.source}
                                           onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="lock" htmlFor="password">
                                        <i className="fa-solid fa-key"></i>
                                    </label>
                                    <input type="password"
                                           name="password"
                                           placeholder="Password"
                                           pattern={regexPatterns.password.source}
                                           onChange={handleInputChange}/>
                                </div>
                                <div>
                                    <input type="password"
                                           name="passwordconfirm"
                                           placeholder="Repeat password"
                                           pattern={regexPatterns.password.source}
                                           onChange={handleInputChange}/>
                                </div>
                                <label>
                                    <ReCAPTCHA
                                        sitekey={process.env.REACT_APP_CAPTCHA_KEY}
                                        onChange={handleCaptchaChange}
                                    />
                                </label>
                                <div>
                                    <input type="submit" value="Register"/>
                                </div>
                                <div className="clear"></div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
