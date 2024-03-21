import React, {useState, useRef} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {regexPatterns} from "../../../helpers/regex";
import {NotificationComponent} from "../../NotificationComponent/NotificationComponent";
import './ContactForm.css';
import {toast} from "react-toastify";
import axios from "axios";

export const ContactForm = (props) => {
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
            toast.warning('Неверный емейл')
            return;
        }

        if(!captchaValue){
            toast.warning('Пройдите капчу')
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
                toast.success('Сообщение успешно отправлено')
                console.log(response.data)
                clearInputs();
            } else{
                toast.warning('Сообщение не было доставлено')
            }
        } catch (e) {
            toast.error('Что-то пошло не так')
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
                    <p>Свяжитесь с нами</p>
                    <input type="text"
                           placeholder="Email"
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
                              placeholder="Ваше сообщение"
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
                    <input type="submit" value="Отправить" className="contact-form-submit"/>
                </form>
            </div>
        </>
    )
}