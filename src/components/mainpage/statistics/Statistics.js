import React, {useState, useEffect} from "react";
import './statistics.css';
import student from './student.png';
import teacher from './teacher.png';

export const Statistics = (props) => {

    // TODO пользователей, всего курсов, успешно пройдено
    return (
        <>
            <div className="statistics-container">
                <div className="statistics-content">
                    <div className="statistics-info-block">
                        <h2>Откройте Двери Знаний. Никогда не поздно начать учиться!</h2>
                        <p>Возможности обучения не имеют пределов, и с каждым новым шагом вы приближаетесь к своим целям
                            и мечтам. Начните сегодня - ведь обучение никогда не заканчивается, а лишь усиливает наше
                            понимание мира и нашу возможность влиять на него.</p>
                    </div>
                    <div className="statistics-data-block">
                        <div><h3>153</h3><h3>Пользователей</h3></div>
                        <div><h3>456</h3><h3>Курсов на сайте</h3></div>
                        <div><h3>288</h3><h3>Успешно пройдено</h3></div>
                    </div>
                    <div className="statistics-students-block">
                        <h3>Вы студент?</h3>
                        <p>С нашим разнообразным выбором курсов и обучающих материалов вы сможете изучать что угодно - от академических предметов до навыков саморазвития. Возьмите обучение в свои руки с EducateMe и погрузитесь в мир бесконечных возможностей!</p>
                        <img src={student} alt="no image" id="statistics-student"/>
                    </div>
                    <div className="statistics-teachers-block">
                        <h3>Вы учитель?</h3>
                        <p>Присоединяйтесь к нашему сообществу образования на EducateMe и делитесь своими знаниями с
                            миром.</p>
                        <img src={teacher} alt="no image" id="statistics-teacher"/>
                    </div>
                </div>
            </div>
        </>
    )
}