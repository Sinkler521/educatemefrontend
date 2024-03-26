import React, {useEffect, useState} from "react";
import {Loader} from "../../Loader/Loader";
import {Article} from "./Article/Article";
import {useSelector} from "react-redux";

import './News.css';
import axios from "axios";

export const News = (props) => {
    const user = useSelector(state => state.user)
    const [newsLoaded, setNewsLoaded] = useState(false);
    const [currentNews, setCurrentNews] = useState(null);

    useEffect(() => {
        getLatestNews();
    }, []);

    const getLatestNews = async () => {
        try{
            const response = await axios.get(
                `${props.host.api}/getlatestnews/`,
            {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

            if(response.status === 200){
                setCurrentNews(response.data)
                setNewsLoaded(true);
            }
        }
        catch (error) {
            console.log('Error trying loading news', error)
        }
    }

    return (
        <>
            {newsLoaded ?  // TODO change this to newsLoaded
                <div className="container news-container">
                    <div className="news-header">
                        <ul className="news-menu-all">
                            <li className="news-active">Latest</li>
                            <li>All</li>
                        </ul>
                        <ul className="news-menu-staff">
                            <li>Add</li>
                        </ul>
                    </div>
                    <div className="news-content">

                    </div>
                </div>
                :
                <Loader/>
            }
        </>
    )
}