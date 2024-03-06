import React, {useState, useEffect} from "react";
import axios from "axios";
import {FirstScreen} from "./firstscreen/FirstScreen";
import {StatisticsLine} from "./statisticsLine/StatisticsLine";

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
            <StatisticsLine statisticsInfo={statisticsInfo}/>
        </>
    )
}