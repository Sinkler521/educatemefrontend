import React, {useState} from "react";
import './Startnow.css';
import {NavLink} from "react-router-dom";

export const Startnow = () => {

    // с помощью Redux сделать так чтобы родителю (.mainpage-container:before) давался цвет фона
    return (
        <>
            <div className="startnow-container">
                <div className="startnow-content">
                    <h2>Дорога к знаниям лежит тут</h2>
                    <NavLink to='login'>Присоединиться</NavLink>
                </div>
                <div className="startnow-floating-squares-grid">

                </div>
            </div>
        </>
    )
}