import React, {useEffect, useRef} from 'react';
import './settingsMenu.css';
import {toast} from "react-toastify";
import axios from "axios";
import {FormattedMessage, useIntl} from "react-intl";

export const GeneralMenu = (props) => {
    const intl = useIntl();
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
                toast.success(intl.formatMessage({ id: 'profile_toast_email_update' }))
            }
        } catch (error){
            if(error.response){
                if(error.response.status === 400){
                    toast.warning(intl.formatMessage({ id: 'profile_toast_email_not_update' }))
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
                    <form className="profile-settings-form" method="post" onSubmit={saveEmail}>
                        <h2><FormattedMessage id="placeholder_email"/></h2>
                        <input type="text" name="email" placeholder="email" ref={emailRef}/>
                        <input type="submit" value={intl.formatMessage({ id: 'save' })}/>
                    </form>
                </div>
            </div>
        </>
    )
}