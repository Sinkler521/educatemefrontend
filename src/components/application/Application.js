import React, {useState, useEffect} from "react";
import {Route, Routes} from "react-router";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import classNames from "classnames";

import './Application.css';

import {Profile} from "./Profile/Profile";
import {News} from "./News/News";
import {Courses} from "./courses/Courses";
import {AppMenu} from "./AppMenu/AppMenu";

export const Application = (props) => {
    const navigate = useNavigate();
    const cookie = useCookies();

    const [menuMinimized, setMenuMinimized] = useState(false);

    useEffect(() => {
        if(!props.user.token && !cookie[0].token){
            navigate('/login')
        }
    }, []);

    const toggleMenu = () => setMenuMinimized(!menuMinimized)


    return (
        <>
            <div className={classNames("container application-container", {'minimize-menu': menuMinimized})}>
                <section className="application-menu">
                    <AppMenu menuMinimized={menuMinimized} toggleMenu={toggleMenu}/>
                </section>
                <section className="application-content">
                    <div className="some-content">
                        <Routes>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/news" element={<News />}/>
                            <Route path="/mycourses" element={<Courses />} />
                        </Routes>
                    </div>
                </section>
                <div className="pointer-none"></div>
            </div>
        </>
    )
}