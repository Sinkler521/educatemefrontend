import React, {useState, useEffect} from "react";
import axios from "axios";
import './mainpage.css'

import {Header} from "../header/Header";
import {FirstScreen} from "./firstscreen/FirstScreen";
import {Statistics} from "./statistics/Statistics";
import {Advantages} from "./advantages/Advantages";
import {Footer} from "../footer/Footer";
import {Startnow} from "./startnow/Startnow";

export const Mainpage = (props) => {
    const [statisticsInfo, setStatisticsInfo] = useState({})

    const getStatisticsInfo = () => {
        try{
            return axios.get(`${props.host.api}/getstatistics`, {

            }).then(response => {
                setStatisticsInfo(response.data)
            }).catch(error => {
                console.log('Request error', error)
            })
        } catch (e) {
            console.log('Error receiving statistics info', e)
        }
    }

    return (
        <>
            <div className="mainpage-container">
                <Header/>
                <FirstScreen/>
                <Statistics statisticsInfo={statisticsInfo}/>
                <Advantages/>
                <Startnow/>
                <Footer/>
            </div>
        </>
    )
}