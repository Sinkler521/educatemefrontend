import React, {useEffect, useState} from "react";
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

    useEffect(() => {
        getStatisticsInfo();
    }, []);

    useEffect(() => {
        console.log(statisticsInfo);
    }, [statisticsInfo]);

    const getStatisticsInfo = async () => {
        try{
            const response = await axios.get(
                `${props.host.api}/getstatistics/`
            )

            if(response.status === 200){
                setStatisticsInfo(response.data)
            }

        } catch (e) {
            console.log('Error receiving Statistics info', e)
        }
    }

    return (
        <>
            <div className="container">
                <Header changeLanguage={props.changeLanguage}/>
                <FirstScreen/>
                <Statistics statisticsInfo={statisticsInfo}/>
                <Advantages/>
                <Startnow/>
                <Footer/>
            </div>
        </>
    )
}