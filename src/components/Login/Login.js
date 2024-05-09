import React, {useState} from "react";
import './Login.css';
import classNames from "classnames";
import {NavLink, useNavigate} from "react-router-dom";
import {regexPatterns} from "../../helpers/regex";
import ReCAPTCHA from "react-google-recaptcha";
import {NotificationComponent} from "../NotificationComponent/NotificationComponent";
import {toast} from "react-toastify";
import axios from "axios";
import {userLogged} from "../../store/userSlice";
import {useDispatch} from "react-redux";
import {useCookies} from "react-cookie";
import {FormattedMessage, useIntl} from "react-intl";

export const Login = (props) => {
    const intl = useIntl();
    const [checked, setChecked] = useState(false);
    const [switchToRegister, setSwitchToRegister] = useState(false);
    const [switchToReset, setSwitchToReset] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);

    const navigate = useNavigate()

    const [cookies, setCookie, removeCookie] = useCookies(['user', 'token']);
    const dispatch = useDispatch();

    const toggleSwitchToReg = () => setSwitchToRegister(!switchToRegister);
    const toggleSwitchToReset = () => setSwitchToReset(!switchToReset)

    const toggleCheckbox = (e) => {
        const value = e.currentTarget.htmlFor === "yes";
        setChecked(value);
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    }
    const handleInputChange = (e) => {
        const { value, pattern } = e.target;
        if(!pattern){
            return
        }
        const isValid = new RegExp(pattern).test(value);
        e.target.classList.toggle('login-input-correct', isValid);
        e.target.classList.toggle('login-wrong-input-value', !isValid);
        e.target['data-valid'] = isValid

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
            toast.warning(intl.formatMessage({ id: 'login_toast_all' }));
            return;
        }
        if(!captchaValue){
            toast.warning(intl.formatMessage({ id: 'login_toast_confirm' }));
            return;
        }

        try {
            const response = await axios.post(
                `${props.host.auth}/register/`,
                {
                    email: form.elements['email'].value,
                    username: form.elements['username'].value,
                    password: form.elements['password'].value,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            if (response.status === 201) {
                toast.success(intl.formatMessage({ id: 'login_toast_reg_success' }));
                toggleSwitchToReg();
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    toast.error(intl.formatMessage({ id: 'login_toast_reg_exists' }));
                    console.log(error);
                } else {
                    toast.error(intl.formatMessage({ id: 'login_toast_reg_unsuccess' }));
                    console.log(error);
                }
            } else {
                toast.error(intl.formatMessage({ id: 'login_toast_reg_impossible' }));
                console.log(error);
            }
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const form = e.currentTarget

        if(!allInputsFilled(form)){
            toast.warning(intl.formatMessage({ id: 'login_toast_all' }));
            return;
        }

        try {
            const response = await axios.post(
                `${props.host.auth}/resetpassword/`,
                {
                    email: form.elements['email'].value,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            if(response.status === 200){
                toast.success(intl.formatMessage({ id: 'login_toast_passreset_ok' }));
                toggleSwitchToReset();
            }
        }
        catch (error){
            if(error.response){
                if(error.response.status === 404){

                    toast.warning(intl.formatMessage({ id: 'login_toast_no_user' }));
                    console.log(error);
                }
            }else{
                toast.error(intl.formatMessage({ id: 'login_toast_passreset_not_ok' }));
                console.log(error);
            }
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (!allInputsFilled(form)) {
            toast.warning(intl.formatMessage({ id: 'login_toast_all' }));
            return;
        }

        if (!captchaValue) {
            toast.warning(intl.formatMessage({ id: 'login_toast_confirm' }));
            return;
        }

        try {
            const response = await axios.post(
                `${props.host.auth}/login/`,
                {
                    email: form.elements['email'].value,
                    password: form.elements['password'].value,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

            if (response.status === 200) {
                const { user, token } = response.data;
                const userData = { ...user, token };
                dispatch(userLogged(userData));

                toast.success(intl.formatMessage({ id: 'login_toast_auth_ok' }));

                if (checked) {
                    setCookie('user', user)
                    setCookie('token', token)
                }
                navigate('/app/news')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 404) {
                    toast.error(intl.formatMessage({ id: 'login_toast_wrong_data' }));
                    console.log(error);
                } else {
                    toast.error(intl.formatMessage({ id: 'login_auth_not_ok' }));
                    console.log(error);
                }
            } else {
                toast.error(intl.formatMessage({ id: 'request_goes_wrong' }));
                console.log(error);
            }
        }
    }

    return (
        <>
            <div className="container">
                <NotificationComponent position="top-right"/>
                <div className="login-content">
                    <div className="back-button">
                        <NavLink to="/" className="back-arrow"><i className="fa-solid fa-arrow-left"></i></NavLink>
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

                                }}>
                                    <FormattedMessage id='login_i_remember_password' />
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
                                           name="email"
                                           pattern={regexPatterns.email.source}
                                           onChange={handleInputChange}
                                           placeholder={intl.formatMessage({ id: 'placeholder_email' })}/>
                                </div>
                                <div>
                                    <input type="submit" value={intl.formatMessage({ id: 'login_reset_password' })}/>
                                </div>
                                <div className="clear"></div>
                            </form>
                        </div>

                        <div className={classNames("login-content-section", {
                            'login-switch-right': switchToRegister,
                            'login-switch-left': switchToReset,
                            })}>
                            <div className="login-header">
                                <h3 className="sign-in"><FormattedMessage id='login_sign_in' /></h3>
                                <div className="button" onClick={() => {
                                    toggleSwitchToReg();

                                }}>
                                    <FormattedMessage id='login_register' />
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
                                           placeholder={intl.formatMessage({ id: 'placeholder_email' })}
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
                                           placeholder={intl.formatMessage({ id: 'placeholder_password' })}
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
                                    <input type="submit" value={intl.formatMessage({ id: 'login_sign_in' })}/>
                                </div>
                                <div className={classNames("radio-check", {'login-checkbox-success': checked})}>
                                    <input type="radio" className="radio-no" id="no" name="remember" value="no"/>
                                    <label htmlFor="no" onClick={toggleCheckbox}><i className="fa fa-times"></i></label>
                                    <input type="radio" className="radio-yes" id="yes" name="remember" value="yes"/>
                                    <label htmlFor="yes" onClick={toggleCheckbox}><i
                                        className="fa fa-check"></i></label>
                                    <span className="switch-selection"></span>
                                </div>
                                <span className="check-label"><FormattedMessage id='login_remember_me' /></span>
                                <span className="forgot-label" onClick={() => {
                                    toggleSwitchToReset();

                                }}><FormattedMessage id='login_lost_password' /></span>
                                <div className="clear"></div>
                            </form>
                        </div>

                        <div className={classNames("login-content-section", {
                            'login-switch-right': switchToRegister,
                            'login-switch-left': switchToReset,
                        })}>
                            <div className="login-header">
                                <h3 className="sign-in"><FormattedMessage id='login_register' /></h3>
                                <div className="button" onClick={() => {
                                    toggleSwitchToReg();

                                }}>
                                    <FormattedMessage id='login_i_have_account' />
                                </div>
                            </div>
                            <div className="clear"></div>
                            <form method="POST" onSubmit={handleRegister}>
                                <div>
                                    <label className="user" htmlFor="text">
                                        <i className="fa-solid fa-envelope"></i>
                                    </label>
                                    <input className="user-input" type="text"
                                           name="email"
                                           placeholder={intl.formatMessage({ id: 'placeholder_email' })}
                                           pattern={regexPatterns.email.source}
                                           onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="user" htmlFor="text">
                                        <i className="fa-solid fa-user"></i>
                                    </label>
                                    <input type="text"
                                           name="username"
                                           placeholder={intl.formatMessage({ id: 'placeholder_username' })}
                                           pattern={regexPatterns.username.source}
                                           onChange={handleInputChange}/>
                                </div>
                                <div>
                                    <label className="lock" htmlFor="password">
                                        <i className="fa-solid fa-key"></i>
                                    </label>
                                    <input type="password"
                                           name="password"
                                           placeholder={intl.formatMessage({ id: 'placeholder_password' })}
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
                                    <input type="submit" value={intl.formatMessage({ id: 'login_register' })}/>
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
