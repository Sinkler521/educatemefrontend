import React, {useEffect, useRef, useState} from "react";
import './LangSwitch.css';
import {messages} from "../../translations/languages/messages";
import {CURRENTLANGUAGE} from "../../translations/translationsConfig";
import {useSelector} from "react-redux";

export const LangSwitch = (props) => {
    const [languages, setLanguages] = useState(null);
    const langRef = useRef();

    useEffect(() => {
        const langArray = Object.entries(messages).map(([lang, dict]) => ({
            lang: lang,
            dict: dict
        }));
        setLanguages(langArray);
    }, []);

    const setNewLanguage = () => {
        props.changeLanguage(langRef.current.value);
    }

    return (
        <>
            <div className="langSwitch">
                <select ref={langRef} onChange={setNewLanguage}>
                     {languages && languages.map((langObj, index)=> (
                        <option key={index} value={langObj.lang}>{langObj.dict.flag}</option>
                    ))}
                </select>
            </div>
        </>
    )
}