import React, {useEffect, useState} from "react";
import axios from "axios";
import './Mainpage.css'

import {Header} from "../Header/Header";
import {FirstScreen} from "./Firstscreen/FirstScreen";
import {Statistics} from "./Statistics/Statistics";
import {Advantages} from "./Advantages/Advantages";
import {Footer} from "../Footer/Footer";
import {Startnow} from "./Startnow/Startnow";
import {useIntl} from "react-intl";

export const Mainpage = (props) => {
    const [statisticsInfo, setStatisticsInfo] = useState({})
    const intl = useIntl();

    useEffect(() => {
        getStatisticsInfo();
    }, []);

    const getStatisticsInfo = async () => {
        try{
            const response = await axios.get(
                `${props.host.api}/getstatistics/`
            )
            if(response.status === 200){
                setStatisticsInfo(response.data)
            }

        } catch (e) {
            console.log(intl.formatMessage({ id: 'request_goes_wrong' }), e)
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