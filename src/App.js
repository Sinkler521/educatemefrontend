import {useEffect, useState} from "react";
import React from 'react';
import './App.css';
import {LOCALES} from "./translations/locales";
import translationsConfig from "./translations/translationsConfig";
import {messages} from "./translations/languages/messages";
import {IntlProvider} from "react-intl";
import {Routes, Route} from "react-router";

export default function App(){
    const [host, setHost] = useState(process.env.host)
    const [currentMessages, setCurrentMessages] = useState('')

    useEffect(() => {
        const languageKey = Object.keys(LOCALES).find(key => LOCALES[key] === translationsConfig.CURRENTLANGUAGE);
        setCurrentMessages(messages[languageKey])
    }, [translationsConfig.CURRENTLANGUAGE]);

    const changeLanguage = (e) => {
        const newLanguage = translationsConfig.CURRENTLANGUAGE === 'en' ? 'ru' : 'en';
        translationsConfig.CURRENTLANGUAGE = newLanguage;
        setCurrentMessages(messages[newLanguage]);

        e.target.innerText = translationsConfig.CURRENTLANGUAGE

        localStorage.setItem('CURRENTLANGUAGE', newLanguage);
    }

    return (
        <>
            <div className="App">
                <IntlProvider locale={translationsConfig.CURRENTLANGUAGE} defaultLocale={translationsConfig.CURRENTLANGUAGE} messages={currentMessages}>
                    <Routes>
                        {/*<Route path="/" element={<Mainpage changeLanguage={changeLanguage} host={host}/>} />*/}
                        {/*<Route path="/login" element={<Login host={host}/>}/>*/}
                    </Routes>
                </IntlProvider>
            </div>
        </>
    )

}

