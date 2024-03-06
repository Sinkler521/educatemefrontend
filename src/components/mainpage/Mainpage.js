import React, {useState, useEffect} from "react";
import axios from "axios";
import {FirstScreen} from "./firstscreen/FirstScreen";
import {Statistics} from "./statistics/Statistics";

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
            <FirstScreen/>
            <Statistics statisticsInfo={statisticsInfo}/>
        </>
    )
}