import React, {useState, useEffect, useRef} from "react";
import './Statistics.css';
import student from '../../../assets/images/statistics/student.png';
import teacher from '../../../assets/images/statistics/teacher.png';
import { motion } from 'framer-motion';

export const Statistics = (props) => { // SHOULD BE DATA HERE FROM BACKEND

    return (
        <div className="statistics-container">
            <div className="statistics-content">
                <motion.div className="statistics-info-block" initial={{ x: '100%', opacity: 0 }} whileInView={{ x: 0, opacity: 1}} transition={{duration: 0.4}}>
                    <h2>Откройте Двери Знаний. Никогда не поздно начать учиться!</h2>
                    <p>Возможности обучения не имеют пределов, и с каждым новым шагом вы приближаетесь к своим целям
                        и мечтам. Начните сегодня - ведь обучение никогда не заканчивается.</p>
                </motion.div>
                <motion.div className="statistics-data-block" initial={{ x: '-100%', opacity: 0 }} whileInView={{ x: 0, opacity: 1}} transition={{duration: 0.4, delay: 0.2}}>
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