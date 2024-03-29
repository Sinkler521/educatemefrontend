import React from 'react';
import {fileToBase64} from "../../../../helpers/apiHelpers";
import './ArticleForm.css';
import axios from "axios";
import {toast} from "react-toastify";

export const ArticleForm = (props) => {

    const addArticle = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        const file = form.elements['image'].files[0];
        const convertedFile = await fileToBase64(file);

        const data = {
            title: form.elements['title'].value,
            description: form.elements['description'].value,
            image: convertedFile,
        }

        try{
            const response = await axios.post(
                `${props.host.api}/articleadd/`,
                data,
            {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

            if(response.status === 200){
                toast.success('Новость была успешно добавлена');
                props.setAddingArticle(false);
            }

        } catch (error) {
            if(error.response){
                if(error.response.status === 400){
                    toast.warning('Что-то пошло не так, попробуйте еще раз')
                }
            } else{
                toast.error('Произошла ошибка. Повторите попытку позже')
            }
        }
    }

    return (
        <>
            <div className="article-form-container">
                <h1>Adding new article</h1>

                <form method="post" className="article-form" onSubmit={addArticle}>
                    <input required type="text" name="title" placeholder="Title"/>
                    <textarea required name="description" cols="30" rows="6"></textarea>
                    <input required type="file" name="image"/>
                    <input type="submit" value="Add"/>
                </form>
            </div>
        </>
    )
}