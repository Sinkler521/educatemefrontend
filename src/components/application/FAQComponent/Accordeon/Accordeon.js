import React, {useRef, useState} from "react";
import './Accordeon.css';
import classNames from "classnames";

export const Accordeon = (props) => {
    const [isAccordeonOpened, setIsAccordeonOpened] = useState(false);
    const toggleOpenAccordeon = () => setIsAccordeonOpened(!isAccordeonOpened);

    return (
        <>
            <div className={classNames("accordeon", {'accordeon-height': isAccordeonOpened})}>
                <div className={classNames("accordeon-header", {'accordeon-header-active': isAccordeonOpened})} onClick={toggleOpenAccordeon}>
                    <i className={classNames("fa-solid fa-plus", {'accordeon-icon-opened': isAccordeonOpened})}></i>
                    <p className={classNames({'accordeon-p-opened': isAccordeonOpened})}>props.headerText</p>
                </div>
                <div className={classNames("accordeon-body", {'accordeon-opened': isAccordeonOpened})}>
                    <h2>Попробуйте</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, at commodi eos, fugiat ipsa maxime minima molestiae molestias, neque nostrum sed sequi sunt voluptatum. Accusantium fuga nostrum repellendus unde voluptates.</p>
                </div>
            </div>
        </>
    )
}