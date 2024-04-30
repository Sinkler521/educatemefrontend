import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import axios from "axios";
import {useParams} from "react-router";
import {Loader} from "../../../../Loader/Loader";
import classNames from "classnames";
import './CourseMain.css';
import {truncateString} from "../../../../../helpers/apiHelpers";
import {current} from "@reduxjs/toolkit";
import {VideoPlayer} from "./VideoPlayer";

export const CourseMain = (props) => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [stages, setStages] = useState(null);
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
                setCurrentStage(progress.current_stage)
            }
        } catch(error){
            if(error.response){
                if(error.response.status === 404){
                    toast.warning('No info')
                }
            } else{
                toast.error("Something goes wrong");
                console.log('error trying to load info', error)
            }
        }
    }


    const completeStage = async () => {
        nextStage();
        if(currentStage === stages.length - 1){
            // TODO some actions to let user out of course and tell that he has passed
        } else{
            const data = {
                user_id: user.userId,
                course_id: course.id,
                stage: currentStage,
            }
            try{
                const response = await axios.post(
                    `${props.host.api}/getcourseinfo/?id=${id}`,
                    data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                if(response.status === 200){
                    await getCourseInfo();
                }

            } catch(error){
                if(error.response){
                    if(error.response.status === 400){
                        toast.warning('Error trying to complete stage');
                        console.log('error:', error);
                    } else if (error.response.status === 404){
                        toast.warning('Some data missing. Try again later');
                        console.log('error:', error);
                    }
                } else{
                    toast.error("Something goes wrong");
                    console.log('error', error);
                }
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
                                    <button onClick={nextStage}>Next<i className="fa-solid fa-arrow-right"></i></button>
                                    <button onClick={completeStage}><i className="fa-solid fa-square-check"></i>Mark as
                                        complete & next
                                    </button>
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
                                        'li-visited': index < currentStage,
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
                                            {index < currentStage && <i className="fa-solid fa-check"></i>}
                                            {truncateString(stage.title, 24)}
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