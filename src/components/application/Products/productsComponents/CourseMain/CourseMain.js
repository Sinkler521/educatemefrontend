import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import axios from "axios";
import {useParams} from "react-router";
import {Loader} from "../../../../Loader/Loader";
import classNames from "classnames";
import './CourseMain.css';
import {truncateString} from "../../../../../helpers/apiHelpers";
import {VideoPlayer} from "./VideoPlayer";
import {useNavigate} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";

export const CourseMain = (props) => {
    const intl = useIntl();
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [stages, setStages] = useState(null);
    const [progress, setProgress] = useState(null);
    const user = useSelector(state => state.user);

    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [currentStage, setCurrentStage] = useState(0);

    useEffect(() => {
        getCourseInfo();
    }, []);

    useEffect(() => {
        if(course){
            props.changePageTitle(course.title);
        }
    }, [course]);

    const getCourseInfo = async () => {
        try{
            const response = await axios.get(
                `${props.host.api}/getcourseinfo/?id=${id}&user_id=${user.userId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )

            if (response.status === 200){
                const {course, stages, progress} = response.data;
                setCourse(course);
                setStages(stages);
                setProgress(progress)
                setCurrentStage(progress.current_stage)
            }
        } catch(error){
            if(error.response){
                if(error.response.status === 404){
                    toast.warning(intl.formatMessage({ id: 'products_toast_no_info'}))
                }
            } else{
                toast.error(intl.formatMessage({ id: 'request_goes_wrong'}));
                console.log('error trying to load info', error)
            }
        }
    }


    const completeStage = async () => {
        const data = {
                user_id: user.userId,
                course_id: course.id,
                new_stage_order: currentStage + 1,
        }

            try{
                const response = await axios.post(
                    `${props.host.api}/usercompletestage/`,
                    data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                if(response.status === 200){
                    await getCourseInfo();
                    nextStage();
                }

            } catch(error){
                if(error.response){
                    if(error.response.status === 400){
                        if (error.response.data.error === 'User has already completed all stages of the course') {
                            toast.success(`${intl.formatMessage({ id: 'products_toast_finished'})} ${course.title}"`);
                            navigate('/app/products/mycourses/');
                        } else {
                            toast.warning(intl.formatMessage({ id: 'products_toast_stage_fail'}));
                            console.log('error:', error);
                        }
                    } else if (error.response.status === 404){
                        toast.warning(intl.formatMessage({ id: 'products_toast_no_info'}));
                        console.log('error:', error);
                    }
                } else{
                    toast.error(intl.formatMessage({ id: 'request_goes_wrong'}));
                    console.log('error', error);
                }
            }
    }

    const nextStage = () => {
        if(currentStage < stages.length - 1){
            setCurrentStage(currentStage + 1);
        }
    }

    return (
        <>
            {course && stages ?
                <div className="coursemain-content">
                    <div className="coursemain-info">
                        {stages[currentStage] ?
                            <>
                                <h1>{stages[currentStage].title}</h1>
                                {stages[currentStage].image ?
                                    <div className="coursemain-image-wrap">
                                        <img src={`data:image/jpeg;base64,${stages[currentStage].image}`} alt=""/>
                                    </div>
                                    :
                                    null
                                }
                                <div
                                    className={classNames("coursemain-course", {'border-top': !stages[currentStage].image})}>
                                    <p>{stages[currentStage].description}</p>
                                    <p className="stage-text">{stages[currentStage].text}</p>
                                </div>
                                {stages[currentStage].video ?
                                    <div className="coursemain-video-wrap">
                                        <VideoPlayer videoId={stages[currentStage].video}/>
                                    </div>
                                    :
                                    null
                                }
                                <div className="coursemain-buttons">
                                    {currentStage !== stages.length - 1 ?
                                        <button onClick={nextStage}><FormattedMessage id="products_next"/><i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                        :
                                        null}
                                    {(currentStage === progress.current_stage && currentStage !== stages.length - 1) ?
                                        <button onClick={completeStage}><i className="fa-solid fa-square-check"></i>
                                            <FormattedMessage id="products_complete_next"/>
                                        </button>
                                        :
                                        null}
                                    {currentStage === stages.length - 1 && progress.current_stage === stages.length - 1 ?
                                        <button onClick={completeStage}>
                                            <i className="fa-solid fa-square-check"></i>
                                            <FormattedMessage id="products_complete"/>
                                        </button>
                                        :
                                        null}
                                </div>
                            </>
                            :
                            null}
                    </div>
                    <div className={classNames("coursemain-menu", {'menu-full': isMenuOpened})}
                         onMouseEnter={() => setIsMenuOpened(true)} onMouseLeave={() => setIsMenuOpened(false)}>
                        <ul>
                            {stages.map((stage, index) => (
                                <li
                                    className={classNames({
                                        'opened-menu-li': isMenuOpened,
                                        'li-active': currentStage === index,
                                        'li-visited': index < progress.current_stage,
                                    })}
                                    key={index}
                                    onClick={() => {
                                        if (currentStage !== index) {
                                            setCurrentStage(index);
                                        }
                                    }}
                                >
                                    {isMenuOpened ? (
                                        <>
                                            {index < progress.current_stage && <i className="fa-solid fa-check"></i>}
                                            {truncateString(stage.title, 20)}
                                        </>
                                    ) : (
                                        index + 1
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                :
                <Loader/>
            }
        </>
    )
}