import React, {useState} from "react";
import axios from "axios";
import './Mainpage.css'

import {Header} from "../Header/Header";
import {FirstScreen} from "./Firstscreen/FirstScreen";
import {Statistics} from "./Statistics/Statistics";
import {Advantages} from "./Advantages/Advantages";
import {Footer} from "../Footer/Footer";
import {Startnow} from "./Startnow/Startnow";

export const Mainpage = (props) => {
    const [statisticsInfo, setStatisticsInfo] = useState({})

    const getStatisticsInfo = () => {
        try{
            return axios.get(`${props.host.api}/getstatistics`, {

            }).then(response => {
                setStatisticsInfo(response.data.result)
            }).catch(error => {
                console.log('Request error', error)
            })
        } catch (e) {
            console.log('Error receiving Statistics info', e)
        }
    }

    return (
        <>
            <div className="container">
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