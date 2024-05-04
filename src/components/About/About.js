import React, {useEffect, useRef, useState} from 'react';
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import education from "../../assets/images/about/education.jpg"
import quality from "../../assets/images/about/quality.jpg"
import {motion} from "framer-motion";
import styles from './About.css'
import {FormattedMessage} from "react-intl";

export const About = (props) => {
    const [initialLeft, setInitialLeft] = useState({x: -200, opacity: 0});
    const [initialRight, setInitialRight] = useState({x: 200, opacity: 0});
    const [inView, setInView] = useState({x: 0, opacity: 1});
    const [transition, setTransition] = useState({duration: 0.8})

    const scrollRef = useRef(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);


    return (
        <>
            <div className="container">
                <Header changeLanguage={props.changeLanguage}/>
                <div className="about-content">
                    <div className="image-block"></div>
                    <section className="about-section" ref={scrollRef}>
                        <div>
                            <h1><FormattedMessage id='about_whatis' /> Educate<span>Me</span>?</h1>
                        </div>
                        <motion.div initial={initialLeft} whileInView={inView} transition={transition}>
                            <h2><FormattedMessage id='about_more' /></h2>
                            <p><FormattedMessage id='about_we' /></p>
                            <p><FormattedMessage id='about_thank' /></p>
                        </motion.div>
                        <motion.div initial={initialRight} whileInView={inView} transition={transition}>
                            <img src={education} alt="no image" loading="lazy"/>
                        </motion.div>
                        <motion.div initial={initialLeft} whileInView={inView} transition={transition}>
                            <img src={quality} alt="no image" loading="lazy"/>
                        </motion.div>
                        <motion.div initial={initialRight} whileInView={inView} transition={transition}>
                            <h2><FormattedMessage id='about_quality' /></h2>
                            <p><FormattedMessage id='about_check' /></p>
                            <p><FormattedMessage id='about_main' /></p>
                        </motion.div>
                    </section>
                </div>
                <Footer/>
            </div>
        </>

    )
}