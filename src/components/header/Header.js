import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import classNames from 'classnames'
import './header.css'

export const Header = (props) => {
    const [lastScroll, setLastScroll] = useState(0)
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const actualScroll = window.pageYOffset;

            if(actualScroll > lastScroll){
                setIsScrolled(true)
            } else if(actualScroll < lastScroll){
                setIsScrolled(false)
            }

            setLastScroll(actualScroll)
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [window.pageYOffset]);


    return (
        <>
            <header className={classNames("", {'header-scrolled': isScrolled})}>
                <div className="header-logo-container">
                    <img src="logo.jpg" id="logo" alt="No logo"/>
                </div>
                <div className="header-navbar-item">
                    <NavLink to="mycourses">Мои курсы</NavLink>
                </div>
                <div className="header-navbar-item">
                    <NavLink to="allcourses">Все курсы</NavLink>
                </div>
                <div></div>
                <div className="header-navbar-item">
                    <NavLink to="login"><i className="fa-regular fa-user"></i></NavLink>
                </div>
                <div className="header-navbar-item">
                    <a href=""><i className="fa-solid fa-magnifying-glass"></i></a>
                </div>
            </header>
        </>
    )
}

// TODO: add header for mobile devices