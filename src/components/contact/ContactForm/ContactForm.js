import React, {useState, useRef} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {regexPatterns} from "../../../helpers/regex";
import {NotificationComponent} from "../../NotificationComponent/NotificationComponent";
import './ContactForm.css';
import {toast} from "react-toastify";
import axios from "axios";
import {FormattedMessage, useIntl} from "react-intl";

export const ContactForm = (props) => {
    const intl = useIntl();
    const [captchaValue, setCaptchaValue] = useState(null);

    const emailInput = useRef(null);
    const messageInput = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let email,
            message = messageInput.current.value;

        if(emailInput.current['data-valid']){
            email = emailInput.current.value;
        } else{
            toast.warning(intl.formatMessage({ id: 'contact_toast_email' }))
            return;
        }

        if(!captchaValue){
            toast.warning(intl.formatMessage({ id: 'contact_toast_captcha' }))
            return;
        }

        try {
            const response = await axios.post(`${props.host.api}/contactus/`,
                {
                email: email,
                message: message,
            }, {
            headers: {
              "Content-Type": "application/json",
            }})

            if(response.status === 200){
                toast.success(intl.formatMessage({ id: 'contact_toast_sent' }))
                console.log(response.data)
                clearInputs();
            } else{
                toast.warning(intl.formatMessage({ id: 'contact_toast_not_sent' }))
            }
        } catch (e) {
            toast.error(intl.formatMessage({ id: 'request_goes_wrong' }))
        }
    }

    const clearInputs = () => {
        if (emailInput.current) emailInput.current.value = "";
        if (messageInput.current) messageInput.current.value = "";
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    }

    const handleInputChange = (e) => {
        const { value, pattern } = e.target;
        if(!pattern){
            return
        }
        const isValid = new RegExp(pattern).test(value);
        e.target.classList.toggle('contact-input-correct', isValid);
        e.target.classList.toggle('contact-wrong-input-value', !isValid);
        e.target['data-valid'] = isValid

    }

    return (
        <>
            <div className="container">
                <NotificationComponent position="top-right"/>
                <form method="POST" id="contact-form" onSubmit={handleSubmit}>
                    <p><FormattedMessage id="contact_us_contact"/></p>
                    <input type="text"
                           placeholder={intl.formatMessage({ id: 'placeholder_email' })}
                           onChange={handleInputChange}
                           ref={emailInput}
                           required={true}
                           pattern={regexPatterns.email.source}
                           minLength={5}
                           maxLength={50}
                    />
                    <textarea name="contact-form-message"
                              cols="30"
                              rows="10"
                              ref={messageInput}
                              required={true}
                              placeholder={intl.formatMessage({ id: 'placeholder_message' })}
                              minLength={20}
                              maxLength={350}
                    />
                    <label>
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_CAPTCHA_KEY}
                            onChange={handleCaptchaChange}
                            className="contact-form-captcha"
                        />
                    </label>
                    <input type="submit" value={intl.formatMessage({ id: 'value_send' })} className="contact-form-submit"/>
                </form>
            </div>
        </>
    )
}