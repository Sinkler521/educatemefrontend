import React from "react";
import './FAQComponent.css'
import {Accordeon} from "./Accordeon/Accordeon";

export const FAQComponent = (props) => {

    return (
        <>
            <div className="container faq-container">
                <div className="faq-content">
                    <h1>FAQ</h1>
                    <div className="faq-content-main">
                        <Accordeon/>
                        <Accordeon/>
                        <Accordeon/>
                        <Accordeon/>
                    </div>
                </div>
            </div>
        </>
    )
}