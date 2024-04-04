import React from 'react';
import './settingsMenu.css'
import {toast} from "react-toastify";
import axios from "axios";

export const SecurityMenu = (props) => {

    const changePassword = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const password = form.elements['password'].value,
              newPassword = form.elements['newpassword'].value,
              newPasswordRepeat = form.elements['newpasswordrepeat'].value;

        if(newPassword !== newPasswordRepeat){
            toast.warning('Пароли не совпадают');
            return;
        }

        try {
            const response = await axios.post(
                `${props.host.auth}/changeuserpassword/`,
                {
                    id: props.user.userId,
                    password: password,
                    newPassword: newPassword
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            if(response.status === 200){
                toast.success('Пароль успешно изменен')
            }
        } catch (error){
            if(error.response){
                if(error.response.status === 400){
                    toast.warning('Неверный пароль')
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
                    <form className="profile-settings-form" method="post" onSubmit={changePassword}>
                        <h2>Password</h2>
                        <input type="password" name="password" placeholder="Current password" />
                        <input type="password" name="newpassword" placeholder="New password"/>
                        <input type="password" name="newpasswordrepeat" placeholder="Repeat password"/>
                        <input type="submit" value="Save"/>
                    </form>

                </div>
            </div>
        </>
    )
}