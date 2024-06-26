import React from "react";
import './AppMenu.css'
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import {logoutUser} from "../../../helpers/authHelpers";
import {LangSwitch} from "../../LangSwitch/LangSwitch";
import {FormattedMessage} from "react-intl";

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
                            <NavLink to='/app/products/courses/'>
                                {props.menuMinimized ?
                                    <i className="fa-solid fa-magnifying-glass menu-minimized-icon"></i>
                                    :
                                    <FormattedMessage id='appmenu_products' />
                                }
                            </NavLink>
                        </li>
                        <li onClick={closeAfterUsingLink}>
                            <NavLink to='/app/products/mycourses/'>
                                {props.menuMinimized ?
                                    <i className="fa-solid fa-star"></i>
                                    :
                                    <FormattedMessage id='appmenu_favorites' />
                                }
                            </NavLink>
                        </li>
                        <li onClick={closeAfterUsingLink}>
                            <NavLink to="news/">
                                {props.menuMinimized ?
                                    <i className="fa-solid fa-newspaper"></i>
                                    :
                                    <FormattedMessage id='appmenu_news' />
                                }
                            </NavLink>
                        </li>
                        <li onClick={closeAfterUsingLink}>
                            <NavLink to='profile/'>
                                {props.menuMinimized ?
                                    <i className="fa-solid fa-address-card"></i>
                                    :
                                    <FormattedMessage id='appmenu_profile' />
                                }
                            </NavLink>
                        </li>
                        <li onClick={closeAfterUsingLink}>
                            <NavLink to='faq/'>
                                {props.menuMinimized ?
                                    <i className="fa-solid fa-question"></i>
                                    :
                                    <FormattedMessage id='appmenu_contact' />
                                }
                            </NavLink>
                        </li>
                        <div className="langswitch">
                            <LangSwitch changeLanguage={props.changeLanguage}/>
                        </div>
                        <li className="minimize-toggle" onClick={props.toggleMenu}>
                            <i className={classNames('fa-solid fa-forward', {'menu-icon-rotate': !props.menuMinimized})}></i>
                        </li>
                    </ul>
                    <ul className="app-menu-mobile">
                        <li>
                            <NavLink to='/app/products/courses/'>
                                <i className="fa-solid fa-magnifying-glass menu-minimized-icon"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/app/products/mycourses'>
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
                        <li>
                            <LangSwitch changeLanguage={props.changeLanguage}/>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}