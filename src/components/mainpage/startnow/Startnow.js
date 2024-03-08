import React, {useState} from "react";
import './startnow.css';
import {NavLink} from "react-router-dom";

export const Startnow = () => {

    // с помощью Redux сделать так чтобы родителю (.mainpage-container:before) давался цвет фона
    return (
        <>
            <div className="startnow-container">
                <div className="startnow-content">
                    <h2>Дорога к знаниям лежит тут</h2>
                    <button><NavLink to='login'>Присоединиться</NavLink></button>
                </div>
            </div>
        </>
    )
}