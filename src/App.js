import {useEffect, useState} from "react";
import React from 'react';
import './App.css';
import {LOCALES} from "./translations/locales";
import translationsConfig from "./translations/translationsConfig";
import {messages} from "./translations/languages/messages";
import {IntlProvider} from "react-intl";
import {Routes, Route} from "react-router";

// Components
import {Mainpage} from "./components/mainpage/Mainpage";
import {About} from "./components/About/About";
import {Contact} from "./components/contact/Contact";
import {Login} from "./components/Login/Login";


export default function App(){
    const [host, setHost] = useState({
        api: process.env.REACT_APP_BACKEND_API,
        auth: process.env.REACT_APP_BACKEND_AUTH,
    })
    const [currentMessages, setCurrentMessages] = useState('')


    useEffect(() => {
        const languageKey = Object.keys(LOCALES).find(key => LOCALES[key] === translationsConfig.CURRENTLANGUAGE);
        setCurrentMessages(messages[languageKey])
    }, [translationsConfig.CURRENTLANGUAGE]);

    const changeLanguage = (e) => {
        const newLanguage = e.target.value;
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
                        <Route path="/" element={<Mainpage changeLanguage={changeLanguage} host={host}/>} />
                        <Route path="about/" element={<About/>}/>
                        <Route path="contact/" element={<Contact host={host}/>}/>
                        <Route path="/login" element={<Login host={host}/>}/>
                    </Routes>
                </IntlProvider>
            </div>
        </>
    )

}

