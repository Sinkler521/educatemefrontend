import React, {useState, useEffect, useRef} from "react";
import Typed from "typed.js";
import './Firstscreen.css'
import {FormattedMessage} from "react-intl";

export const FirstScreen = (props) => {
    const [typed, setTyped] = useState(null);
    const typed1 = useRef();

    useEffect(() => {
        setTyped(new Typed('#typed', {
            stringsElement: '#typed-strings',
            typeSpeed: 100,
            startDelay: 500,
            backSpeed: 50,
            loop: true
        }));

    }, [])

    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };


    return (
        <div className="firstscreen-container">
            <div id="firstscreen-content">
                <div id="text-typing">
                    <div id="typed"></div>
                </div>

                <div id="typed-strings">
                    <span ref={typed1}><FormattedMessage id='firstscreen_courses' /></span>
                    <span><FormattedMessage id='firstscreen_qual' /></span>
                    <span><FormattedMessage id='firstscreen_new' /></span>
                </div>
                <p>
                    <span className="firstscreen-span"><FormattedMessage id='firstscreen_span_free' /></span>
                    <span className="firstscreen-span"><FormattedMessage id='firstscreen_span_mult' /></span>
                    <span className="firstscreen-span"><FormattedMessage id='firstscreen_span_service' /></span>
                    <span className="firstscreen-span"><FormattedMessage id='firstscreen_span_for' /></span>
                    <span className="firstscreen-span"><FormattedMessage id='firstscreen_span_do' /></span>
                    <span className="firstscreen-span"><FormattedMessage id='firstscreen_span_testing' /></span>
                    <span className="firstscreen-span"><FormattedMessage id='firstscreen_span_and' /></span>
                    <span className="firstscreen-span"><FormattedMessage id='firstscreen_span_lessons' /></span>
                </p>
                <button id="firstscreen-button" onClick={handleScroll}><FormattedMessage id='firstscreen_why' /></button>
            </div>

        </div>
    );
};