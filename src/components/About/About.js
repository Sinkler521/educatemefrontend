import React, {useEffect, useRef, useState} from 'react';
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import education from "../../assets/images/about/education.jpg"
import quality from "../../assets/images/about/quality.jpg"
import {motion} from "framer-motion";
import styles from './About.css'

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
                <Header/>
                <div className="about-content">
                    <div className="image-block"></div>
                    <section className="about-section" ref={scrollRef}>
                        <div>
                            <h1>Что такое Educate<span>Me</span>?</h1>
                        </div>
                        <motion.div initial={initialLeft} whileInView={inView} transition={transition}>
                            <h2>Больше чем платформа для обучения</h2>
                            <p>Мы всегда стараемся давать нашим пользователям обновленные, современные материалы для обучения.</p>
                            <p>Благодаря большому количеству преподавателей в разных областях, Вы получаете всестороннее, углубленное изучение интересующих тем.</p>
                        </motion.div>
                        <motion.div initial={initialRight} whileInView={inView} transition={transition}>
                            <img src={education} alt="no image" loading="lazy"/>
                        </motion.div>
                        <motion.div initial={initialLeft} whileInView={inView} transition={transition}>
                            <img src={quality} alt="no image" loading="lazy"/>
                        </motion.div>
                        <motion.div initial={initialRight} whileInView={inView} transition={transition}>
                            <h2>Качество которое Вы заслуживаете</h2>
                            <p>Благодаря постоянным проверкам качества курсов и уроков, мы оставляем на платформе только то, что действительно стоит Вашего времени и внимания.</p>
                            <p>Главная цель для нас - сделать Ваше пребывание максимально комфортным, полезным и продуктивным.</p>
                        </motion.div>
                    </section>
                </div>
                <Footer/>
            </div>
        </>

    )
}