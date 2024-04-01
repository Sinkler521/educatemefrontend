import React, {useEffect, useRef, useState} from "react";
import {Loader} from "../../Loader/Loader";
import {RenderNews} from "./RenderNews";
import {useDispatch, useSelector} from "react-redux";

import './News.css';
import axios from "axios";
import {NotificationComponent} from "../../NotificationComponent/NotificationComponent";
import {toast} from "react-toastify";
import {normalizeDate, truncateString} from "../../../helpers/apiHelpers";
import {ArticleForm} from "./ArticleForm/ArticleForm";
import classNames from "classnames";

import {motion} from "framer-motion";
import {useCookies} from "react-cookie";
import {logoutUser} from "../../../helpers/authHelpers";

export const News = (props) => {
    const user = useSelector(state => state.user)
    const [newsLoaded, setNewsLoaded] = useState(false);
    const [currentFirstArticle, setCurrentFirstArticle] = useState(null);
    const [currentNews, setCurrentNews] = useState(null);

    const [addingArticle, setAddingArticle] = useState(false);

    const navLinks = useRef([]);

    useEffect(() => {
        getLatestNews().then(res => setNewsLoaded(true));
    }, []);

    const navLinkClick = (e) => {
        navLinks.current.forEach(el => {
            if(el){
                el.classList.remove('news-active')
            }
        });
        e.target.classList.add('news-active');
    }

    const searchNews = async (e) => {
        e.preventDefault();

        setAddingArticle(false);
        const form = e.currentTarget;
        const data = {
            value: form.elements['search'].value
        };
        try{
            const response = await axios.post(
                `${props.host.api}/searchnews/`,
                data,
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
            if(error.response){
                if(error.response.status === 400){
                    toast.warning('No results found');
                    console.log('No results found', error)
                }
            } else{
                console.log('Error trying to search news', error);
                toast.error('Error trying to search')
            }
        }
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
            {newsLoaded ?
                <div className="container news-container">
                    <NotificationComponent position="top-right"/>
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
                    <div className={classNames("news-content", {'short-height': !currentNews})}>
                        {addingArticle ?
                            <ArticleForm host={props.host} setAddingArticle={setAddingArticle}/>
                            :
                            <>
                                <div className="news-search-container">
                                    <form method="get" className="search-form" onSubmit={searchNews}>
                                        <input type="text" name="search"/>
                                        <input type="submit" value="Search"/>
                                    </form>
                                </div>
                                    {currentFirstArticle ?
                                        <>
                                            <div className="news-first-article-container">
                                                <motion.a className="news-first-image-wrap" href={`/app/news/${currentFirstArticle.id}/`} initial={{x: -200, opacity: 0}} transition={{duration: 0.6}} whileInView={{x: 0, opacity: 1}}>
                                                    <img src={`data:image/jpeg;base64,${currentFirstArticle.image}`}
                                                         alt="No image" loading="lazy"/>
                                                </motion.a>
                                                <motion.div initial={{y: 150, opacity: 0}} transition={{duration: 0.6, delay: 0.2}} whileInView={{y: 0, opacity: 1}}>
                                                    <a href={`/app/news/${currentFirstArticle.id}/`}><h1>{currentFirstArticle.title}</h1></a>
                                                </motion.div>
                                                <motion.div initial={{y: 150, opacity: 0}} transition={{duration: 0.6, delay: 0.6}} whileInView={{y: 0, opacity: 1}}><p>{truncateString(currentFirstArticle.description, 120)}</p></motion.div>
                                                <motion.div initial={{x: 150, opacity: 0}} transition={{duration: 0.6, delay: 1}} whileInView={{x: 0, opacity: 1}}><span>{normalizeDate(currentFirstArticle.publication_date)}</span></motion.div>
                                            </div>
                                        </>
                                        :
                                        <div className="news-empty">
                                            <h2>Здесь будут новости EducateMe</h2>
                                        </div>
                                    }
                                <div className="news-preview-container">
                                    {currentNews && <RenderNews news={currentNews}/>}
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