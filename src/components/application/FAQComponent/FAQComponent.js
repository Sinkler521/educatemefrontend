import React from "react";
import './FAQComponent.css'
import {Accordion} from "./Accordion/Accordion";
import {FAQForm} from "./FAQForm/FAQForm";
import {useSelector} from "react-redux";
import {NotificationComponent} from "../../NotificationComponent/NotificationComponent";
import {useIntl} from "react-intl";

export const FAQComponent = (props) => {
    const intl = useIntl();
    const user = useSelector(state => state.user)

    return (
        <>
            <div className="container faq-container">
                <NotificationComponent position="top-right"/>
                <div className="faq-content">
                    <h1>FAQ</h1>
                    <div className="faq-content-main">
                        <Accordion
                            headerText={intl.formatMessage({ id: 'acc_news_header' })}
                            bodyHeader={intl.formatMessage({ id: 'acc_news_body_header' })}
                            bodyText={intl.formatMessage({ id: 'acc_news_body' })}
                        />
                        <Accordion
                            headerText={intl.formatMessage({ id: 'acc_account_header' })}
                            bodyHeader={intl.formatMessage({ id: 'acc_account_body_header' })}
                            bodyText={intl.formatMessage({ id: 'acc_account_body' })}
                        />
                        <Accordion
                            headerText={intl.formatMessage({ id: 'acc_start_header' })}
                            bodyHeader={intl.formatMessage({ id: 'acc_start_body_header' })}
                            bodyText={intl.formatMessage({ id: 'acc_start_body' })}
                        />
                        <Accordion
                            headerText={intl.formatMessage({ id: 'acc_repeat_header' })}
                            bodyHeader={intl.formatMessage({ id: 'acc_repeat_body_header' })}
                            bodyText={intl.formatMessage({ id: 'acc_repeat_body' })}
                        />

                        <FAQForm
                            headerText={intl.formatMessage({ id: 'acc_form_header' })}
                            bodyHeader={intl.formatMessage({ id: 'contact_us_contact' })}
                            user={user}
                            host={props.host}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}