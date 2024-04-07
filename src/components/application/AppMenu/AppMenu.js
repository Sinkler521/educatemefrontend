import React from "react";
import './AppMenu.css'
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import {logoutUser} from "../../../helpers/authHelpers";

export const AppMenu = (props) => {

    const closeAfterUsingLink = () => {
        if(!props.menuMinimized){
            props.toggleMenu();
        }
    }

    return (
        <>
            <div className="container">
                <div className="app-menu-content">
                    <ul className={classNames("app-menu-list", {"menu-minimized": props.menuMinimized})}>
                        <li onClick={closeAfterUsingLink}>
                            <NavLink to='products/'>
                                {props.menuMinimized ?
                                    <i className="fa-solid fa-magnifying-glass menu-minimized-icon"></i>
                                    :
                                    "Курсы"
                                }
                            </NavLink>
                        </li>
                        <li onClick={closeAfterUsingLink}>
                            <NavLink to='mycourses/'>
                                {props.menuMinimized ?
                                    <i className="fa-solid fa-star"></i>
                                    :
                                    "Избранное"
                                }
                            </NavLink>
                        </li>
                        <li onClick={closeAfterUsingLink}>
                            <NavLink to="news/">
                                {props.menuMinimized ?
                                    <i className="fa-solid fa-newspaper"></i>
                                    :
                                    "Новости"
                                }
                            </NavLink>
                        </li>
                        <li onClick={closeAfterUsingLink}>
                            <NavLink to='profile/'>
                                {props.menuMinimized ?
                                    <i className="fa-solid fa-address-card"></i>
                                    :
                                    "Профиль"
                                }
                            </NavLink>
                        </li>
                        <li onClick={closeAfterUsingLink}>
                            <NavLink to='faq/'>
                                {props.menuMinimized ?
                                    <i className="fa-solid fa-question"></i>
                                    :
                                    "Написать нам"
                                }
                            </NavLink>
                        </li>
                        <li className="minimize-toggle" onClick={props.toggleMenu}>
                            <i className={classNames('fa-solid fa-forward', {'menu-icon-rotate': !props.menuMinimized})}></i>
                        </li>
                    </ul>
                    <ul className="app-menu-mobile">
                        <li>
                            <NavLink to='products/'>
                                <i className="fa-solid fa-magnifying-glass menu-minimized-icon"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='mycourses/'>
                                <i className="fa-solid fa-star"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="news/">
                                <i className="fa-solid fa-newspaper"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='profile/'>
                                <i className="fa-solid fa-address-card"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='faq/'>
                                <i className="fa-solid fa-question"></i>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}