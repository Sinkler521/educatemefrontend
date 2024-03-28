import React, {useEffect, useRef, useState} from "react";
import {Loader} from "../../Loader/Loader";
import {Article} from "./Article/Article";
import {useSelector} from "react-redux";

import './News.css';
import bgExample from "../../../assets/images/application/news/example.jpg";
import axios from "axios";

export const News = (props) => {
    const user = useSelector(state => state.user)
    const [newsLoaded, setNewsLoaded] = useState(false);
    const [currentFirstArticle, setCurrentFirstArticle] = useState(null);
    const [currentNews, setCurrentNews] = useState(null);

    const [addingArticle, setAddingArticle] = useState(false);

    const navLinks = useRef([]);

    useEffect(() => {
        getLatestNews();
        setNewsLoaded(true);
    }, []);

    const navLinkClick = (e) => {
        navLinks.current.forEach(el => {
            if(el){
                el.classList.remove('news-active')
            }
        });
        e.target.classList.add('news-active');
    }

    const getLatestNews = async (e) => {
        if(e){
            navLinkClick(e)
        }
        setAddingArticle(false);
        try{
            const response = await axios.get(
                `${props.host.api}/getlatestnews/`,
            {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

            if(response.status === 200){
                const responseData = response.data;
                if (Array.isArray(responseData) && responseData.length > 0) {
                    setCurrentFirstArticle(responseData[0]);
                    setCurrentNews(responseData.slice(1));
                }
            }
        }
        catch (error) {
            console.log('Error trying loading news', error);
        }
    }

    const getAllNews = async (e) => {
        if(e){
            navLinkClick(e)
        }
        setAddingArticle(false);
        try{
            const response = await axios.get(
                `${props.host.api}/getallnews/`,
            {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

             if(response.status === 200){
                const responseData = response.data;
                if (Array.isArray(responseData) && responseData.length > 0) {
                    setCurrentFirstArticle(responseData[0]);
                    setCurrentNews(responseData.slice(1));
                }
            }
        }
        catch (error) {
            console.log('Error trying loading news', error);
        }
    }

    const addArticle = (e) => {
        if(e){
            navLinkClick(e)
        }
        setAddingArticle(true);
    }

    return (
        <>
            {newsLoaded ?  // TODO change this to newsLoaded
                <div className="container news-container">
                    <div className="news-header">
                        <ul className="news-menu-all">
                            <li onClick={getLatestNews} className="news-active" ref={el => navLinks.current[0] = el}>Latest</li>
                            <li onClick={getAllNews} ref={el => navLinks.current[1] = el}>All</li>
                        </ul>
                        {user.isStaff ?
                            <ul className="news-menu-staff">
                                <li onClick={addArticle} ref={el => navLinks.current[2] = el}>Add</li>
                            </ul>
                            :
                            null
                        }
                    </div>
                    <div className="news-content">
                        {addingArticle ?
                            null
                            :
                            <>
                                <div className="news-first-article-container">
                                    <a className="news-first-image-wrap" href="#">
                                        <img src={bgExample} alt="No image"/>
                                    </a>
                                    <div><h1>Горожане коллективно вышли на субботник</h1></div>
                                    <div><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad
                                        aliquid
                                        at corporis cumque deserunt dolores dolorum eos ex facere fugiat incidunt
                                        laborum
                                        minima modi mollitia nihil nobis, nostrum numquam, odio quasi quisquam rem sed
                                        sequi! Explicabo hic omnis quo.</p></div>
                                    <div><span>16/03/2024</span></div>
                                </div>
                            </>
                        }
                    </div>
                </div>
                :
                <Loader/>
            }
        </>
    )
}