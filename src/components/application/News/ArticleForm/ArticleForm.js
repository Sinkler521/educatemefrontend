import React from 'react';
import {fileToBase64} from "../../../../helpers/apiHelpers";
import './ArticleForm.css';
import axios from "axios";
import {toast} from "react-toastify";
import {FormattedMessage, useIntl} from "react-intl";

export const ArticleForm = (props) => {
    const intl = useIntl();

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
                props.setAddingArticle(false);
                props.getLatestNews();
            }

        } catch (error) {
            if(error.response){
                if(error.response.status === 400){
                    toast.warning(intl.formatMessage({ id: 'toast_try_again' }))
                }
            } else{
                toast.error(intl.formatMessage({ id: 'request_goes_wrong' }))
            }
        }
    }

    return (
        <>
            <div className="article-form-container">
                <h1><FormattedMessage id='news_adding_article' /></h1>

                <form method="post" className="article-form" onSubmit={addArticle}>
                    <input required type="text" name="title" placeholder={intl.formatMessage({ id: 'placeholder_title' })}/>
                    <textarea required name="description" cols="30" rows="6"></textarea>
                    <input required type="file" name="image"/>
                    <input type="submit" value="Add"/>
                </form>
            </div>
        </>
    )
}