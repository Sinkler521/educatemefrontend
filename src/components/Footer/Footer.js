import React, {useState, useEffect} from "react";
import footerLogo from '../../assets/images/footer/footerlogo.png'
import './Footer.css'
import {NavLink} from "react-router-dom";
import {TELEGRAMCONTACT, EMAILCONTACT} from '../../config'

export const Footer = (props) => {

    return (
        <>
            <div className="footer-container">
                <div className="footer-content">
                    <div>
                        <span>©2024</span><span><strong>EDUCATEME</strong></span>
                    </div>
                    <div className="footer-logo-container">
                        <a href="/" id="footer-logo"></a>
                    </div>
                    <div>
                        <NavLink to={TELEGRAMCONTACT}><i className="fa-brands fa-telegram"></i></NavLink>
                        <NavLink to={EMAILCONTACT}><i className="fa-solid fa-envelope"></i></NavLink>
                    </div>
                </div>
                <div className="footer-basement">
                    <hr/>
                    <p>Все права защищены</p>
                </div>
            </div>
        </>
    )
}