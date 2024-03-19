import React, {useState, useEffect, useRef, createFactory} from "react";
import './Login.css';
import classNames from "classnames";
import {NavLink} from "react-router-dom";

export const Login = (props) => {
    const [checked, setChecked] = useState(false);
    const [switchToRegister, setSwitchToRegister] = useState(false);
    const [switchToReset, setSwitchToReset] = useState(false);

    const toggleCheckbox = () => setChecked(!checked);
    const toggleSwitchToReg = () => setSwitchToRegister(!switchToRegister);
    const toggleSwitchToReset = () => setSwitchToReset(!switchToReset)



    return (
        <>
            <div className="container">
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
                                <div className="button" onClick={toggleSwitchToReset}>
                                    I remember my password
                                </div>
                            </div>
                            <div className="clear"></div>
                            <form method="POST">
                                <div>
                                    <label className="user" htmlFor="text">
                                        <i className="fa-solid fa-user"></i>
                                    </label>
                                    <input className="user-input" type="text" name="name" id="name"
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
                                <div className="button" onClick={toggleSwitchToReg}>
                                    Register
                                </div>
                            </div>
                            <div className="clear"></div>
                            <form method="POST">
                                <div>
                                    <label className="user" htmlFor="text">
                                        <i className="fa-solid fa-user"></i>
                                    </label>
                                    <input className="user-input" type="text" name="name" id="name"
                                           placeholder="Email"/>
                                </div>
                                <div>
                                    <label className="lock" htmlFor="password">
                                        <i className="fa-solid fa-key"></i>
                                    </label>
                                    <input type="password" name="name" id="name" placeholder="Password"/>
                                </div>
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
                                <span className="forgot-label" onClick={toggleSwitchToReset}>Lost your password?</span>
                                <div className="clear"></div>
                            </form>
                        </div>

                        <div className={classNames("login-content-section", {
                            'login-switch-right': switchToRegister,
                            'login-switch-left': switchToReset,
                            })}>
                            <div className="login-header">
                                <h3 className="sign-in">Sign up</h3>
                                <div className="button" onClick={toggleSwitchToReg}>
                                    I have an account
                                </div>
                            </div>
                            <div className="clear"></div>
                            <form method="POST">
                                <div>
                                    <label className="user" htmlFor="text">
                                        <i className="fa-solid fa-user"></i>
                                    </label>
                                    <input className="user-input" type="text" name="name" id="name"
                                           placeholder="Email"/>
                                </div>
                                <div>
                                    <label className="lock" htmlFor="password">
                                        <i className="fa-solid fa-key"></i>
                                    </label>
                                    <input type="password" name="name" id="name" placeholder="Password"/>
                                </div>
                                <div>
                                    <input type="password" name="name" id="name" placeholder="Repeat password"/>
                                </div>
                                <div>
                                    <input type="submit" value="Register"/>
                                </div>
                                <div className={classNames("radio-check", {'login-checkbox-success': checked})}>
                                    <input type="radio" className="radio-no" id="no" name="remember" value="no"/>
                                    <label htmlFor="no" onClick={toggleCheckbox}><i className="fa fa-times"></i></label>
                                    <input type="radio" className="radio-yes" id="yes" name="remember" value="yes"/>
                                    <label htmlFor="yes" onClick={toggleCheckbox}><i
                                        className="fa fa-check"></i></label>
                                    <span className="switch-selection"></span>
                                </div>
                                <span className="check-label">Accept rules</span>
                                <div className="clear"></div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
