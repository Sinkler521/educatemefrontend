import React, {useState, useEffect, useRef} from "react";
import './Advantages.css'
import reviewImg1 from '../../../assets/images/advantages/review-1.jpg';
import reviewImg2 from '../../../assets/images/advantages/review-2.jpg';

export const Advantages = (props) => {
    const [isFirstReviewVisible, setIsFirstReviewVisible] = useState(true);
    const animatedElements = useRef([])
    const reviews = useRef([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFirstReviewVisible(prevState => !prevState);
        }, 10000);

        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 2){
                let delay = 0;
                animatedElements.current.forEach((element) => {
                    setTimeout(() => {
                        element.classList.add('scroll-active');
                    }, delay);
                    delay += 400;
                });
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="advantages-container">
            <div className="advantages-content">
                <div className="advantages-info-block scroll-right" ref={(element) => animatedElements.current[0] = element}>
                    <h2>Что можно делать с нами?</h2>
                    <p>Мы хотим предложить Вам самые лучшие условия</p>
                </div>
                <div className="advantages-advantages-block">
                    <div className="scroll-left" ref={(element) => animatedElements.current[1] = element}>
                        <div className="advantages-advantages-content">
                            <span className="advantages-icon"><i className="fa-solid fa-book"></i></span>
                            <h2>Новые знания</h2>
                            <p>Расширяйте границы познания используя возможности EducateMe.</p>
                        </div>
                    </div>
                    <div className="scroll-left" ref={(element) => animatedElements.current[2] = element}>
                        <div className="advantages-advantages-content">
                            <span className="advantages-icon"><i className="fa-regular fa-clock"></i></span>
                            <h2>Идеальный график</h2>
                            <p>Выбирайте время для учебы самостоятельно. Пусть обучение будет для Вас максимально удобным.</p>
                        </div>
                    </div>
                    <div className="scroll-left" ref={(element) => animatedElements.current[3] = element}>
                        <div className="advantages-advantages-content">
                            <span className="advantages-icon"><i className="fa-solid fa-atom"></i></span>
                            <h2>Большой выбор</h2>
                            <p>На платформе представлено большое количество развивающих материалов. Подберите то, что идеально Вам подойдет.</p>
                        </div>
                    </div>
                </div>
                <div className="advantages-reviews">
                    <div className={`advantages-review ${isFirstReviewVisible ? '' : 'review-hide'}`}
                         ref={el => reviews.current[0] = el}>
                        <h2>"Давно решил для себя что саморазвитие важнее всего. EducateMe мне в этом хороший помощник."</h2>
                        <img src={reviewImg1} alt="no image" className="advantages-review-img" loading="lazy"/>
                        <span className="advantages-review-name"><strong>Ronald McGivern</strong></span>
                        <span className="advantages-review-position">developer</span>
                    </div>
                    <div className={`advantages-review ${isFirstReviewVisible ? 'review-hide' : ''}`} ref={el => reviews.current[1] = el}>
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