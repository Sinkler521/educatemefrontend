import React, {useState, useEffect, useRef} from "react";
import './Advantages.css'
import reviewImg1 from '../../../assets/images/advantages/review-1.jpg';
import reviewImg2 from '../../../assets/images/advantages/review-2.jpg';
import { motion } from 'framer-motion';

export const Advantages = (props) => {
    const reviews = useRef([]);

    useEffect(() => {
        const interval = setInterval(() => {
            reviews.current[0].classList.toggle('review-hide');
            reviews.current[1].classList.toggle('review-hide');
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="advantages-container">
            <div className="advantages-content">
                <motion.div className="advantages-info-block" initial={{ x: '-100%', opacity: 0 }} whileInView={{x: 0, opacity: 1}} transition={{duration: 0.8}}>
                    <h2>Что можно делать с нами?</h2>
                    <p>Мы хотим предложить Вам самые лучшие условия</p>
                </motion.div>
                <div className="advantages-advantages-block">
                    <motion.div initial={{x: 100, opacity: 1}} whileInView={{x: 0, opacity: 1}} transition={{duration: 0.4, delay: 0.1}}>
                        <div className="advantages-advantages-content">
                            <span className="advantages-icon"><i className="fa-solid fa-book"></i></span>
                            <h2>Новые знания</h2>
                            <p>Расширяйте границы познания используя возможности EducateMe.</p>
                        </div>
                    </motion.div>
                    <motion.div initial={{x: 100, opacity: 0}} whileInView={{x: 0, opacity: 1}} transition={{duration: 0.4, delay: 0.5}}>
                        <div className="advantages-advantages-content">
                            <span className="advantages-icon"><i className="fa-regular fa-clock"></i></span>
                            <h2>Идеальный график</h2>
                            <p>Выбирайте время для учебы самостоятельно. Пусть обучение будет для Вас максимально
                                удобным.</p>
                        </div>
                    </motion.div>
                    <motion.div initial={{x: 100, opacity: 0}} whileInView={{x: 0, opacity: 1}} transition={{duration: 0.4, delay: 0.7}}>
                        <div className="advantages-advantages-content">
                            <span className="advantages-icon"><i className="fa-solid fa-atom"></i></span>
                            <h2>Большой выбор</h2>
                            <p>На платформе представлено большое количество развивающих материалов. Подберите то, что
                                идеально Вам подойдет.</p>
                        </div>
                    </motion.div>
                </div>
                <div className="advantages-reviews">
                    <div className={`advantages-review`}
                         ref={el => reviews.current[0] = el}>
                        <h2>"Здесь большой выбор материала, и сами уроки очень полезные."</h2>
                        <img src={reviewImg1} alt="no image" className="advantages-review-img" loading="lazy"/>
                        <span className="advantages-review-name"><strong>Ronald McGivern</strong></span>
                        <span className="advantages-review-position">developer</span>
                    </div>
                    <div className={`advantages-review review-hide`}
                         ref={el => reviews.current[1] = el}>
                        <h2>"Отлично составленные, понятные уроки. Теперь я знаю и умею намного больше."</h2>
                        <img src={reviewImg2} alt="no image" className="advantages-review-img" loading="lazy"/>
                        <span className="advantages-review-name"><strong>Claire Williams</strong></span>
                        <span className="advantages-review-position">Chemist</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

