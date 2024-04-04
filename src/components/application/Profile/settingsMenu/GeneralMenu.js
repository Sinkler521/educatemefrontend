import React, {useEffect, useRef} from 'react';
import './settingsMenu.css';
import {toast} from "react-toastify";
import axios from "axios";

export const GeneralMenu = (props) => {
    const emailRef = useRef();

    useEffect(() => {
        emailRef.current.value = props.user.email;
    }, []);

    const saveEmail = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        const email = form.elements['email'].value;

        try {
            const response = await axios.post(
                `${props.host.auth}/changeuseremail/`,
                {
                    id: props.user.userId,
                    newEmail: email,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            if(response.status === 200){
                toast.success('Электронная почта успешно изменена')
            }
        } catch (error){
            if(error.response){
                if(error.response.status === 400){
                    toast.warning('Не удалось сменить электронную почту')
                }
            } else{
                toast.error('Произошла ошибка, попробуйте позже')
            }
        }
    }

    return (
        <>
            <div className="container profile-settings-container">
                <div className="profile-settings-content">
                    <form className="profile-settings-form" method="post" onSubmit={saveEmail}>
                        <h2>Email</h2>
                        <input type="text" name="email" placeholder="email" ref={emailRef}/>
                        <input type="submit" value="Save"/>
                    </form>
                </div>
            </div>
        </>
    )
}