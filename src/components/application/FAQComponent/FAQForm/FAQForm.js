import React, {useState} from "react";
import './FAQForm.css';
import classNames from "classnames";
import axios from "axios";
import {toast} from "react-toastify";

export const FAQForm = (props) => {
    const [isAccordionOpened, setIsAccordionOpened] = useState(false);
    const toggleOpenAccordion = () => setIsAccordionOpened(!isAccordionOpened);

    const sendMessage = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = {
            email: props.user.email,
            subject: form.elements['subject'].value,
            message: form.elements['message'].value
        }
        try{
            const response = await axios.post(
                `${props.host.api}/contactfaq/`,
                data,
            {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )

            if(response.status === 200){
                toast.success(`Ваше сообщение на тему "${form.elements['subject'].value}" было отправлено.`);
            }

        } catch (error) {
            if(error.response){
                if(error.response.status === 400){
                    toast.warning('Не удалось отправить сообщение')
                }
            } else{
                toast.error('Произошла ошибка. Попробуйте позже')
            }
        }
    }

    return (
        <>
            <div className={classNames("accordion", {'accordion-height': isAccordionOpened})}>
                <div className={classNames("accordion-header", {'accordion-header-active': isAccordionOpened})} onClick={toggleOpenAccordion}>
                    <i className={classNames("fa-solid fa-plus", {'accordion-icon-opened': isAccordionOpened})}></i>
                    <p className={classNames({'accordion-p-opened': isAccordionOpened})}>{props.headerText}</p>
                </div>
                <div className={classNames("accordion-body", {'accordion-opened': isAccordionOpened})}>
                    <h2 className="text-center">{props.bodyHeader}</h2>
                    <form className="faq-form" method="POST" onSubmit={sendMessage}>
                        <input type="text" name="subject" placeholder="Subject"/>
                        <textarea name="message" cols="30" rows="10" placeholder="Message"/>
                        <input type="submit" value="Send"/>
                    </form>
                </div>
            </div>
        </>
    )
}