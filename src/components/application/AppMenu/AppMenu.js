import React from "react";
import './AppMenu.css'
import {NavLink} from "react-router-dom";
import classNames from "classnames";
export const AppMenu = (props) => {

    const closeAfterUsingLink = () => {
        if(!props.menuMinimized){
            props.toggleMenu();
        }
    }

    return (
        <>
            <div className="container">
                <div className="app-menu-content" onClick={props.menuMinimized ? props.toggleMenu : null}>
                    <ul className={classNames("app-menu-list", {"menu-minimized": props.menuMinimized})}>
                        <li onClick={closeAfterUsingLink}><NavLink
                            to='products/'>Курсы</NavLink></li>
                        <li onClick={closeAfterUsingLink}><NavLink
                            to='mycourses/'>Избранное</NavLink></li>
                        <li onClick={closeAfterUsingLink}><NavLink
                            to="news/">Новости</NavLink></li>
                        <li onClick={closeAfterUsingLink}><NavLink
                            to='profile/'>Профиль</NavLink></li>
                        <li onClick={closeAfterUsingLink}><NavLink
                            to='contact/'>Написать нам</NavLink></li>
                        <li className="minimize-toggle" onClick={props.toggleMenu}>
                            <i className={`fa-solid fa-${props.menuMinimized ? 'forward' : 'backward'}`}></i>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}