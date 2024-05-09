import {useEffect, useState} from "react";
import React from 'react';
import './App.css';
import {LOCALES} from "./translations/locales";
import translationsConfig, {CURRENTLANGUAGE} from "./translations/translationsConfig";
import {messages} from "./translations/languages/messages";
import {IntlProvider} from "react-intl";
import {Routes, Route} from "react-router";
import {useNavigate} from "react-router-dom";

// Components
import {Mainpage} from "./components/mainpage/Mainpage";
import {About} from "./components/About/About";
import {Contact} from "./components/contact/Contact";
import {Login} from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {Application} from "./components/application/Application";
import {useCookies} from "react-cookie";
import {changeLang} from "./store/langSlice";


export default function App(){
    const [host, setHost] = useState({
        api: process.env.REACT_APP_BACKEND_API,
        auth: process.env.REACT_APP_BACKEND_AUTH,
    })
    const [currentMessages, setCurrentMessages] = useState('');

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()


    useEffect(() => {
        setCurrentMessages(messages[translationsConfig.CURRENTLANGUAGE])
    }, []);

    const changeLanguage = (newLanguage) => {
        translationsConfig.CURRENTLANGUAGE = newLanguage;
        setCurrentMessages(messages[newLanguage]);
        dispatch(changeLang(newLanguage))
        localStorage.setItem('CURRENTLANGUAGE', newLanguage);
    }

    return (
        <>
            <div className="App">
                <IntlProvider locale={translationsConfig.CURRENTLANGUAGE} defaultLocale={translationsConfig.DEFAULTLANGUAGE} messages={currentMessages}>
                    <Routes>
                        <Route path="/" element={<Mainpage changeLanguage={changeLanguage} host={host}/>} />
                        <Route path="about/" element={<About changeLanguage={changeLanguage}/>}/>
                        <Route path="contact/" element={<Contact host={host} changeLanguage={changeLanguage}/>}/>
                        <Route path="login/" element={<Login host={host} changeLanguage={changeLanguage}/>}/>
                        <Route path="/app/*" element={<Application user={user} changeLanguage={changeLanguage} host={host}/>}/>
                    </Routes>
                </IntlProvider>
            </div>
        </>
    )
}
