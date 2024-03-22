import React, {useState, useEffect} from "react";
import {Route, Routes} from "react-router";

import {Profile} from "./Profile/Profile";
import {News} from "./News/News";
import {Courses} from "./courses/Courses";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

export const Application = (props) => {
    const navigate = useNavigate();
    const cookie = useCookies();

    useEffect(() => {
        if(!props.user.token && !cookie[0].token){
            navigate('/login')
        }
    }, []);


    return (
        <>
            <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/news" element={<News />}/>
                <Route path="/courses" element={<Courses />} />
            </Routes>
        </>
    )
}