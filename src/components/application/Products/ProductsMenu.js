import React from "react";
import {NavLink} from "react-router-dom";
import {FormattedMessage} from "react-intl";

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
                            if(props.isSearchedContent) {
                                props.toggleIsSearchedContent();
                            }
                            handleNavLinkClick()
                        }}>
                            <i className="fa-solid fa-flag-checkered"></i> <FormattedMessage id="appmenu_products"/>
                        </NavLink>
                    </li>
                    <li></li>
                    <li><p>Info</p></li>
                    <li className="products-menu-info">
                        <NavLink to="/app/faq/" onClick={() => {
                            if(props.isSearchedContent) {
                                props.toggleIsSearchedContent();
                            }
                            handleNavLinkClick()
                        }}>
                            <i className="fa-solid fa-circle-info"></i> <FormattedMessage id="appmenu_contact"/>
                        </NavLink>
                    </li>
                    <li></li>
                    {props.user.isStaff &&
                        <>
                            <li><p>Staff controls</p></li>
                            <li className="products-menu-admin">
                                <NavLink to="/app/products/admin/" onClick={() => {
                                    if(props.isSearchedContent) {
                                        props.toggleIsSearchedContent();
                                    }
                                    handleNavLinkClick()
                                }}>
                                    <i className="fa-solid fa-user-tie"></i> <FormattedMessage id="appmenu_admin"/>
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