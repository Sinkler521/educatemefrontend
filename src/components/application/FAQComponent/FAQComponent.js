import React from "react";
import './FAQComponent.css'
import {Accordion} from "./Accordion/Accordion";
import {FAQForm} from "./FAQForm/FAQForm";
import {useSelector} from "react-redux";
import {NotificationComponent} from "../../NotificationComponent/NotificationComponent";

export const FAQComponent = (props) => {
    const user = useSelector(state => state.user)

    return (
        <>
            <div className="container faq-container">
                <NotificationComponent position="top-right"/>
                <div className="faq-content">
                    <h1>FAQ</h1>
                    <div className="faq-content-main">
                        <Accordion
                            headerText="Как я могу узнать о новостях?"
                            bodyHeader="Используйте вкладку Новости на панели меню"
                            bodyText="Перейдя на страницу с новостями Вы можете воспользоваться поиском либо отсортировать новости оставив только последние статьи."
                        />
                        <Accordion
                            headerText="Могу ли я создать два аккаунта?"
                            bodyHeader="Да, Вы можете использовать разные аккаунты в зависимости от нужд"
                            bodyText="На данный момент ресурс не ограничивает Вас по количеству аккаунтов и Вы можете создать несколько для себя. Однако передача аккаунта третьим лицам либо подозрительная активность (как, например, спам) может привести к блокировке текущего либо всех аккаунтов."
                        />
                        <Accordion
                            headerText="Хочу начать обучение"
                            bodyHeader="Отлично, тогда перейдите во вкладку Курсы на панели меню, и выберите подходящий материал."
                            bodyText="Для прохождения курса Вы можете добавить их в Избранное. Отслеживайте прогресс зайдя в данное меню (вторая вкладка на панели) и продолжайте обучение"
                        />
                        <Accordion
                            headerText="Хочу повторить курс"
                            bodyHeader="Вы имеете доступ ко всем этапам курса с момента добавления его в избранное"
                            bodyText="Просто нажмите start на странице курса для того чтобы перейти в него. Даже если Вы прошли курс до конца, Вы можете открыть каждый его этап отдельно в любой удобный момент."
                        />

                        <FAQForm
                            headerText="Не нашли ответ на свой вопрос?"
                            bodyHeader="Напишите нам!"
                            user={user}
                            host={props.host}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}