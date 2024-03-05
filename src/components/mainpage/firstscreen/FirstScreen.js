import React, {useState, useEffect, useRef} from "react";
import ReactDOM from 'react-dom';
import {Header} from '../../header/Header'
import './firstcreen.css'

export const FirstScreen = (props) => {

    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className="firstscreen-container">
            <Header/>
            <div id="firstscreen-content">
                <div id="firstscreen-header-container">
                    <h1 id="firstscreen-header">Some text</h1>
                </div>
                <p>
                    <span className="firstscreen-span">Бесплатный</span>
                    <span className="firstscreen-span">многофункциональный</span>
                    <span className="firstscreen-span">сервис</span>
                    <span className="firstscreen-span">для</span>
                    <span className="firstscreen-span">проведения</span>
                    <span className="firstscreen-span">тестирования</span>
                    <span className="firstscreen-span">и</span>
                    <span className="firstscreen-span">обучения</span>
                </p>
                <button id="firstscreen-button" onClick={handleScroll}>Ознакомиться</button>
            </div>

        </div>
    );
};