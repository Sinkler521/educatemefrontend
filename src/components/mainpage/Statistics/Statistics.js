import React from "react";
import './Statistics.css';
import student from '../../../assets/images/statistics/student.png';
import teacher from '../../../assets/images/statistics/teacher.png';
import { motion } from 'framer-motion';
import {FormattedMessage} from "react-intl";

export const Statistics = (props) => {

    return (
        <div className="statistics-container">
            <div className="statistics-content">
                <motion.div className="statistics-info-block" initial={{ x: '100%', opacity: 0 }} whileInView={{ x: 0, opacity: 1}} transition={{duration: 0.4}}>
                    <h2><FormattedMessage id='statistics_open' /></h2>
                    <p><FormattedMessage id='statistics_possibility' /></p>
                </motion.div>
                <motion.div className="statistics-data-block" initial={{ x: '-100%', opacity: 0 }} whileInView={{ x: 0, opacity: 1}} transition={{duration: 0.4, delay: 0.2}}>
                    <div><h3>{props.statisticsInfo ? props.statisticsInfo['custom_user_data'] : null}</h3><h3><FormattedMessage id='statistics_users' /></h3></div>
                    <div><h3>{props.statisticsInfo ? props.statisticsInfo['courses_data'] : null}</h3><h3><FormattedMessage id='statistics_courses' /></h3></div>
                    <div><h3>{props.statisticsInfo ? props.statisticsInfo['completed_courses_data'] : null}</h3><h3><FormattedMessage id='statistics_success' /></h3></div>
                </motion.div>
                <div className="statistics-students-block">
                    <h3><FormattedMessage id='statistics_student' /></h3>
                    <p><FormattedMessage id='statistics_student_text' /></p>
                    <img src={student} alt="no image" id="statistics-student" loading="lazy"/>
                </div>
                <div className="statistics-teachers-block">
                    <h3><FormattedMessage id='statistics_teacher' /></h3>
                    <p><FormattedMessage id='statistics_teacher_text' /></p>
                    <img src={teacher} alt="no image" id="statistics-teacher" loading="lazy"/>
                </div>
            </div>
        </div>
    );
}