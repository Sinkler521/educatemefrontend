import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {Loader} from "../../../Loader/Loader";
import {useParams} from "react-router";
import {NavLink, useNavigate} from "react-router-dom";
import "./Article.css";
import {fileToBase64, normalizeDate} from "../../../../helpers/apiHelpers";
import {motion} from "framer-motion";
import {useSelector} from "react-redux";
import classNames from "classnames";
import {NotificationComponent} from "../../../NotificationComponent/NotificationComponent";


export const Article = (props) => {
    const { id } = useParams();
    const [articleData, setArticleData] = useState(null);
    const [changeMode, setChangeMode] = useState(false);
    const changeModeImage = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const [newImage, setNewImage] = useState(null);
    const user = useSelector(state => state.user)

    const navigate = useNavigate();

    const [deletionRequest, setDeletionRequest] = useState(false);
    const toggleDeletionRequest = () => setDeletionRequest(!deletionRequest);
    //
    const toggleChangeMode = () => setChangeMode(!changeMode)

    useEffect(() => {
        getArticleData();
    }, []);

    useEffect(() => {
        if(changeMode) {
            titleRef.current.value = articleData.title;
            descriptionRef.current.value = articleData.description;
        }
    }, [changeMode]);

    const getArticleData = async () => {
        try {
            const response = await axios.get(
                `${props.host.api}/articleget/${id}/`,
            {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

            if(response.status === 200){
                setArticleData(response.data)
            }
        } catch (error) {
            if(error.response){
                if(error.response.status === 404){
                    toast.warning('Такой записи не существует');
                } else if(error.response.status === 400){
                    toast.warning('Попробуйте еще раз')
                }
            } else{
                toast.error('Произошла ошибка. Попробуйте позже')
            }
        }
    }

    const saveArticleChanges = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        const title = form.elements['title'].value;
        const description = form.elements['description'].value;

        const data = {
            id: id,
            title: title,
            description: description,
            image: newImage ? newImage : articleData.image,
        }

        try {
            const response = await axios.post(
                `${props.host.api}/articlechange/`,
                data,
            {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

            if(response.status === 200){
                toast.success('Данные успешно обновлены')
                toggleChangeMode();
                await getArticleData();
            }
        } catch (error) {
            if(error.response){
                if(error.response.status === 400){
                    toast.warning('Такая статья не найдена');
                }
            } else{
                toast.error('Произошла ошибка при попытке изменить данные')
            }
        }
    }

    const deleteArticle = async () => {
        const data = {id: id}

        try{
            const response = await axios.post(
                `${props.host.api}/articledelete/`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )

            if(response.status === 200){
                toast.success('Новость успешно удалена');
                toggleDeletionRequest();
                navigate('/app/news');
            }

        } catch(error){
            if(error.response){
                if(error.response.status === 404){
                    toast.warning('Не удалось удалить новость');
                }
            } else{
                toast.error('Произошла ошибка. Попробуйте позже')
            }
        }
    }

    const showImagePreview = async (e) => {
        const newImage = await fileToBase64(e.target.files[0]);
        changeModeImage.current.src = `data:image/jpeg;base64,${newImage}`;
        setNewImage(newImage);
    }

    return (
        <>
            {articleData ?
                <div className="container article-container">
                    <NotificationComponent position="top-right"/>
                    <div className="article-content">

                        <div className="article-image-wrap">
                            <div className="back-button" id="article-back">
                                <NavLink to={`/app/news/`} className="back-arrow"><i
                                    className="fa-solid fa-arrow-left"></i></NavLink>
                            </div>
                            <motion.img
                                src={`data:image/jpeg;base64,${articleData.image}`}
                                alt="No image" loading="lazy"
                                initial={{filter: 'grayscale(80%)'}}
                                transition={{duration: 3}}
                                whileInView={{filter: 'grayscale(0)'}}
                            />
                            <span>{normalizeDate(articleData.publication_date)}</span>
                            {user.isStaff ?
                                <div className="article-change-button" onClick={toggleChangeMode}><i
                                    className="fa-solid fa-pencil"></i>
                                </div>
                                :
                                null
                            }
                            {user.isStaff ?
                                <div className="article-delete-button" onClick={toggleDeletionRequest}>
                                    <i className="fa-solid fa-trash"></i>
                                </div>
                                :
                                null
                            }
                            {deletionRequest ?
                                <div className="deletion-block">
                                    <h3>Вы уверены что хотите удалить эту новость?</h3>
                                    <div className="deletion-buttons">
                                        <button className="deletion-btn-yes" onClick={deleteArticle}><i className="fa-solid fa-check"></i>
                                        </button>
                                        <button className="deletion-btn-no" onClick={toggleDeletionRequest}><i
                                            className="fa-solid fa-xmark"></i></button>
                                    </div>
                                </div>
                                :
                                null
                            }
                        </div>
                        <img src={`data:image/jpeg;base64,${articleData.image}`}
                             className={classNames("article-preview-image", {'d-none': !changeMode})}
                             alt="No image"
                             ref={changeModeImage}/>
                        <form method="post" onSubmit={saveArticleChanges} className={classNames("article-form", {'d-none': !changeMode})}>
                            <input type="file" name="file" onChange={showImagePreview}/>
                            <input type="text"
                                   name="title"
                                   ref={titleRef}
                            />
                            <textarea name="description" cols="30" rows="10" ref={descriptionRef}/>
                            <input type="submit" value="Save"/>
                            <button onClick={toggleChangeMode} className="article-back">Отменить</button>
                        </form>
                        <motion.div className={classNames("article-header-block", {'d-none': changeMode})}
                                    initial={{opacity: 0}}
                                    transition={{duration: 1.2}}
                                    whileInView={{opacity: 1}}>
                            <h1>{articleData.title}</h1>
                        </motion.div>
                        <div className={classNames("article-description-block", {'d-none': changeMode})}>
                            <p>{articleData.description}</p>
                        </div>
                    </div>
                </div>
                :
                <Loader/>
            }
        </>
    )
}