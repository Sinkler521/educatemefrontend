import React, {useState} from "react";
import './Accordion.css';
import classNames from "classnames";

export const Accordion = (props) => {
    const [isAccordionOpened, setIsAccordionOpened] = useState(false);
    const toggleOpenAccordion = () => setIsAccordionOpened(!isAccordionOpened);

    return (
        <>
            <div className={classNames("accordion", {'accordion-height': isAccordionOpened})}>
                <div className={classNames("accordion-header", {'accordion-header-active': isAccordionOpened})} onClick={toggleOpenAccordion}>
                    <i className={classNames("fa-solid fa-plus", {'accordion-icon-opened': isAccordionOpened})}></i>
                    <p className={classNames({'accordion-p-opened': isAccordionOpened})}>{props.headerText}</p>
                </div>
                <div className={classNames("accordion-body", {'accordion-opened': isAccordionOpened})}>
                    <h2>{props.bodyHeader}</h2>
                    <p>{props.bodyText}</p>
                </div>
            </div>
        </>
    )
}