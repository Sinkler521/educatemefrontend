import React, {useState, useEffect, useRef} from "react";
import './Contact.css'
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {ContactForm} from "./ContactForm/ContactForm";
import {FormattedMessage} from "react-intl";

export const Contact = (props) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    return (
        <>
            <div className="container">
                <Header changeLanguage={props.changeLanguage}/>
                <div className="contact-content">
                    <div className="image-block"></div>
                    <section className="contact-section">
                        <h2><FormattedMessage id="contact_you_want"/></h2>
                        <ContactForm ref={scrollRef} host={props.host}/>
                    </section>
                </div>
                <Footer/>
            </div>
        </>
    )
}