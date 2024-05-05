import React from 'react';
import './settingsMenu.css'
import {toast} from "react-toastify";
import axios from "axios";
import {FormattedMessage, useIntl} from "react-intl";

export const SecurityMenu = (props) => {
    const intl = useIntl();
    const changePassword = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const password = form.elements['password'].value,
              newPassword = form.elements['newpassword'].value,
              newPasswordRepeat = form.elements['newpasswordrepeat'].value;

        if(newPassword !== newPasswordRepeat){
            toast.warning(intl.formatMessage({ id: 'profile_toast_password_not_match' }));
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
                toast.success(intl.formatMessage({ id: 'profile_toast_password_update' }))
            }
        } catch (error){
            if(error.response){
                if(error.response.status === 400){
                    toast.warning(intl.formatMessage({ id: 'profile_toast_password_not_update' }))
                }
            } else{
                toast.error(intl.formatMessage({ id: 'request_goes_wrong' }))
            }
        }
    }

    return (
        <>
            <div className="container profile-settings-container">
                <div className="profile-settings-content">
                    <form className="profile-settings-form" method="post" onSubmit={changePassword}>
                        <h2><FormattedMessage id="placeholder_password"/></h2>
                        <input type="password" name="password" placeholder="Current password" />
                        <input type="password" name="newpassword" placeholder="New password"/>
                        <input type="password" name="newpasswordrepeat" placeholder="Repeat password"/>
                        <input type="submit" value={intl.formatMessage({ id: 'save' })}/>
                    </form>
                </div>
            </div>
        </>
    )
}