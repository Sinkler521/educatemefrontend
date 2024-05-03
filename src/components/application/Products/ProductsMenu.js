import React from "react";
import {NavLink} from "react-router-dom";

export const ProductsMenu = (props) => {

    const handleNavLinkClick = () => {
        if (props.toggleMobileMenu) {
            props.toggleMobileMenu();
        }
    };

    return (
        <>
            <section className="products-menu">
                <div className="products-menu-user-block">
                    <img src={`data:image/jpeg;base64,${props.user.avatar}`} alt=""/>
                    <p>{props.user.username}</p>
                </div>
                <ul>
                    <li><p>Main</p></li>
                    <li className="products-menu-main">
                        <NavLink to="/app/products/courses/" onClick={() => {
                            props.toggleIsSearchedContent();
                            handleNavLinkClick()
                        }}>
                            <i className="fa-solid fa-flag-checkered"></i> Courses
                        </NavLink>
                    </li>
                    <li></li>
                    <li><p>Info</p></li>
                    <li className="products-menu-info">
                        <NavLink to="/app/faq/" onClick={() => {
                            props.toggleIsSearchedContent();
                            handleNavLinkClick()
                        }}>
                            <i className="fa-solid fa-circle-info"></i> Help
                        </NavLink>
                    </li>
                    <li></li>
                    {props.user.isStaff &&
                        <>
                            <li><p>Staff controls</p></li>
                            <li className="products-menu-admin" onClick={props.toggleIsSearchedContent}>
                                <NavLink to="/app/products/admin/" onClick={() => {
                                    props.toggleIsSearchedContent();
                                    handleNavLinkClick()
                                }}>
                                    <i className="fa-solid fa-user-tie"></i> Admin panel
                                </NavLink>
                            </li>
                            <li></li>
                        </>
                    }
                </ul>
            </section>
        </>
    );
}