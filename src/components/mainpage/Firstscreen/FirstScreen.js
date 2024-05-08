import React, {useState, useEffect, useRef} from "react";
import Typed from "typed.js";
import './Firstscreen.css'
import {FormattedMessage, useIntl} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import translationsConfig from "../../../translations/translationsConfig";
import axios from "axios";

export const FirstScreen = (props) => {
    const [typed, setTyped] = useState(null);
    const [topics, setTopics] = useState(null);

    const intl = useIntl();

    useEffect(() => {
        getTopics()
    }, [])

    useEffect(() => {
        if(topics){
            setTyped(new Typed('#typed', {
                stringsElement: '#typed-strings',
                typeSpeed: 100,
                startDelay: 500,
                backSpeed: 50,
                loop: true
            }));
        }
    }, [topics]);

    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    const getTopics = async () => {
        try{
            const response = await axios.get(
                `${props.host.api}/gettopics/`,
            {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

            if(response.status === 200){
                console.log(response.data, 'TOPICS')
                setTopics(response.data)
            }

        } catch(error){
            console.log('error', error)
        }
    }


    return (
        <div className="firstscreen-container">
            <div id="firstscreen-content">
                 <div id="text-typing">
                            <div id="typed"></div>
                        </div>

                        <div id="typed-strings">
                            {topics ?
                                topics.map((topic, index) => (
                                    <span key={index}>{topic.topic.charAt(0).toUpperCase() + topic.topic.slice(1)}</span>
                                ))
                                :
                                <span></span>
                            }
                        </div>

                <p>
                    <span className="firstscreen-span"><FormattedMessage id='firstscreen_span_free'/></span>
                    <span className="firstscreen-span"><FormattedMessage id='firstscreen_span_mult'/></span>
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