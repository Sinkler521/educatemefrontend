import React, {useState, useEffect, useRef} from "react";
import './Statistics.css';
import student from '../../../assets/images/statistics/student.png';
import teacher from '../../../assets/images/statistics/teacher.png';
import { motion, useAnimation } from 'framer-motion';

export const Statistics = (props) => {
    const animatedElements = useRef([]);
    const controls = useAnimation();

    useEffect(() => {
        const handleScroll = () => {
            animatedElements.current.forEach((element, index) => {
                const elementTop = element.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;

                if (elementTop < viewportHeight) {
                    controls.start({ x: 0, opacity: 1, transition: { duration: 0.5, type: "Tween" } });
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [controls]);

    return (
        <div className="statistics-container">
            <div className="statistics-content">
                <motion.div className="statistics-info-block" ref={(element) => animatedElements.current[0] = element} initial={{ x: '100%', opacity: 0 }} animate={controls}>
                    <h2>Откройте Двери Знаний. Никогда не поздно начать учиться!</h2>
                    <p>Возможности обучения не имеют пределов, и с каждым новым шагом вы приближаетесь к своим целям
                        и мечтам. Начните сегодня - ведь обучение никогда не заканчивается.</p>
                </motion.div>
                <motion.div className="statistics-data-block" ref={(element) => animatedElements.current[1] = element} initial={{ x: '-100%', opacity: 0 }} animate={controls}>
                    <div><h3>153</h3><h3>Пользователей</h3></div>
                    <div><h3>456</h3><h3>Курсов на сайте</h3></div>
                    <div><h3>288</h3><h3>Успешно пройдено</h3></div>
                </motion.div>
                <div className="statistics-students-block">
                    <h3>Вы студент?</h3>
                    <p>С нашим разнообразным выбором курсов и обучающих материалов вы сможете изучать что угодно - от академических предметов до навыков саморазвития. Возьмите обучение в свои руки с EducateMe и погрузитесь в мир бесконечных возможностей!</p>
                    <img src={student} alt="no image" id="statistics-student" loading="lazy"/>
                </div>
                <div className="statistics-teachers-block">
                    <h3>Вы учитель?</h3>
                    <p>Присоединяйтесь к нашему сообществу образования на EducateMe и делитесь своими знаниями с
                        миром.</p>
                    <img src={teacher} alt="no image" id="statistics-teacher" loading="lazy"/>
                </div>
            </div>
        </div>
    );
}