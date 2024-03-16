import React, {useState, useEffect, useRef} from "react";
import Typed from "typed.js";
import './Firstscreen.css'

export const FirstScreen = (props) => {
    const [typed, setTyped] = useState(null)

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
                    <span>Курсы, уроки</span>
                    <span>Повышение квалификации</span>
                    <span>Новые знания</span>
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
                <button id="firstscreen-button" onClick={handleScroll}>Почему мы?</button>
            </div>

        </div>
    );
};