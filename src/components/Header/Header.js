import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import classNames from 'classnames'
import './Header.css'

export const Header = (props) => {
    const [lastScroll, setLastScroll] = useState(0)
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolledFar, setIsScrolledFar] = useState(false);
    const [useMobile, setUseMobile] = useState(false);

    useEffect(() => {
        const handleMobile = () => {
            if(window.innerWidth <= 1000){
                setUseMobile(true)
            } else{
                setUseMobile(false);
            }
        }
        handleMobile()
        window.addEventListener('DOMContentLoaded', handleMobile)
        window.addEventListener('resize', handleMobile);

        return () => {
            window.removeEventListener('DOMContentLoaded', handleMobile);
            window.removeEventListener('resize', handleMobile);
        };
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const actualScroll = window.pageYOffset;

            if(actualScroll > lastScroll){
                setIsScrolled(true)
            } else if(actualScroll < lastScroll){
                setIsScrolled(false)
            }
            setLastScroll(actualScroll)

            if(actualScroll >= window.innerHeight){
                setIsScrolledFar(true);
            }else if(actualScroll < window.innerHeight){
                setIsScrolledFar(false);
            }
            setIsMenuOpen(false);
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [window.pageYOffset]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }


    return (
        <>
            <div className="header-container">
                <header className={classNames({
                    'header-scrolled': isScrolled,
                    'header-scrolled-far': isScrolledFar,
                    'mobile-background': useMobile,
                })}>
                    <a href="/" id="logo"></a>
                    <input type="checkbox" id="menu-toggle"/>
                    {useMobile ? <nav className="mobile-icons">
                        <NavLink to="/login"><i className="fa-regular fa-user"></i></NavLink>
                    </nav> : null}
                    <label htmlFor="menu-toggle"><i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} onClick={toggleMenu}></i></label>
                    <nav className={classNames("navbar", {'navbar-scrolled-far': isScrolledFar, 'mobile-background': useMobile, 'is-open': isMenuOpen})}>
                        <NavLink to="/courses">Начать</NavLink>
                        <NavLink to="/about">О нас</NavLink>
                        <NavLink to="/contact">Связаться</NavLink>
                        {!useMobile ?
                            <>
                                <NavLink to="/login"><i className="fa-regular fa-user"></i></NavLink>
                                <a href=""><i className="fa-solid fa-magnifying-glass"></i></a>
                            </>
                            :
                            null}
                    </nav>
                </header>
            </div>
        </>
    )
}
