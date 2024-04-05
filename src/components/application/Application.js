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
import {Loader} from "../Loader/Loader";
import {Article} from "./News/Article/Article";
import {FAQComponent} from "./FAQComponent/FAQComponent";

export const Application = (props) => {
    const navigate = useNavigate();
    const cookie = useCookies(['user']);

    const [menuMinimized, setMenuMinimized] = useState(false);
    const [allowSurf, setAllowSurf] = useState(false);

    useEffect(() => {
        if(!props.user.token && !cookie.token){
            navigate('/login')
        }
        toggleMenu();
        setAllowSurf(true);
    }, []);

    const toggleMenu = () => setMenuMinimized(!menuMinimized)


    return (
        <>
            <div className={classNames("container application-container", {'minimize-menu': menuMinimized, 'close-page': !allowSurf})}>
                <section className="application-menu">
                    {allowSurf ?
                        <AppMenu menuMinimized={menuMinimized} toggleMenu={toggleMenu}/>
                        :
                        null
                    }
                </section>
                <section className={classNames("application-content", {'close-page': !allowSurf})}>
                    <div className="some-content">
                        {allowSurf ?
                            <Routes>
                                <Route path="/profile" element={<Profile host={props.host}/>} />
                                <Route path="/news" element={<News host={props.host}/>}/>
                                <Route path="/news/:id" element={<Article host={props.host} />} />
                                <Route path="/mycourses" element={<Courses host={props.host}/>} />
                                <Route path="/faq" element={<FAQComponent host={props.host}/>} />
                            </Routes>
                            :
                            <Loader/>
                        }
                    </div>
                </section>
                <div className="pointer-none"></div>
            </div>
        </>
    )
}