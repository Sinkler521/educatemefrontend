import React, {useState, useEffect, useRef} from "react";
import ReactDOM from 'react-dom';
import {Header} from '../../header/Header'
import './firstcreen.css'

export const FirstScreen = (props) => {

    // useEffect(() => {
    //     const newHeader = document.createElement('h1');
    //     const container = document.getElementById('header-container')
    //     newHeader.id = 'firstscreen-header';
    //     container.appendChild(newHeader);
    //
    //     animateHeader(['Курсы различной сложности', 'Отслеживание прогресса', 'Контроль качества обучения'])
    // }, []);
    //
    // const animateHeader = (stringsArray) => {
    //     let currentStringIndex = 0;
    //     let currentLetterIndex = 0;
    //     let header = document.getElementById('firstscreen-header')
    //
    //     const type = () => {
    //         if (currentLetterIndex <= stringsArray[currentStringIndex].length) {
    //             header.innerText = `${stringsArray[currentStringIndex].slice(0, currentLetterIndex)}|`;
    //             currentLetterIndex++;
    //             setTimeout(type, 120);
    //         } else {
    //             setTimeout(erase, 2300);
    //         }
    //     };
    //
    //     const erase = () => {
    //         if (currentLetterIndex >= 1) {
    //             header.innerText = `${stringsArray[currentStringIndex].slice(0, currentLetterIndex)}|`;
    //             currentLetterIndex--;
    //             setTimeout(erase, 60);
    //         } else {
    //             currentStringIndex = (currentStringIndex + 1) % stringsArray.length;
    //             setTimeout(type, 200);
    //         }
    //     };
    //
    //     type();
    // };

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