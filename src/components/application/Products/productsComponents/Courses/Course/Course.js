import React, {useEffect, useState} from "react";
import './Course.css';
import {Loader} from "../../../../../Loader/Loader";
import axios from "axios";
import {useParams} from "react-router";
import {toast} from "react-toastify";
import {NavLink, useNavigate} from "react-router-dom";
import {truncateString} from "../../../../../../helpers/apiHelpers";
import classNames from "classnames";
import {useSelector} from "react-redux";

export const Course = (props) => {
    const [courseInfo, setCourseInfo] = useState(null);
    const [stagesInfo, setStagesInfo] = useState(null);
    const [courseAdded, setCourseAdded] = useState(false);
    const user = useSelector(state => state.user);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getCourseInfo();
        checkUserAddedCourse();
    }, []);

    useEffect(() => {
        props.changePageTitle(`Course page`)
    }, [courseInfo]);

    const checkUserAddedCourse = async () => {
        try{
            const response = await axios.get(
                `${props.host.api}/checkcourseadded/?course_id=${id}&user_id=${user.userId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

        if (response.data === true) {
            setCourseAdded(true);
        }

        } catch(error){
            console.log('error', error)
        }
    }

    const getCourseInfo = async () => {
        try{
            const response = await axios.get(
                `${props.host.api}/getcourseinfo/?id=${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

            if(response.status === 200){
                const {course, stages} = response.data;
                setCourseInfo(course);
                setStagesInfo(stages)
            }

        } catch(error){
            if(error.response){
                if(error.response.status === 404){
                    toast.warning('Info not found');
                    navigate('/app/products/courses/');
                }
            } else{
                toast.error('Something goes wrong');
                navigate('/app/products/courses/');
            }
        }
    }

    const userAddCourse = async () => {
        try{
            const data = {
                user_id: user.userId,
                course_id: courseInfo.id,
            }

            const response = await axios.post(
                `${props.host.api}/useraddcourse/`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

            if(response.status === 200){
                setCourseAdded(true);
                toast.success('Course added')
            }

        } catch(error) {
            if(error.response){
                if(error.response.status === 409){
                    console.log(error, 'error');
                    toast.warning('User has already added this course');
                } else if(error.response.status === 404){
                    console.log(error.response.message, 'error');
                    toast.warning('Some data missing');
                }
            } else{
                console.log(error, 'error');
                toast.error('Something goes wrong');
            }
        }
    }

    return(
        <>
            {courseInfo ?
                <>
                    <div className="course-container container">
                        <div className="course-content">
                            <section className="course-section-preview">
                                <div>
                                    <img src={`data:image/jpeg;base64,${courseInfo.image}`} alt="No image"/>
                                </div>
                                <div>
                                    <h2>{courseInfo.title}</h2>
                                    {courseAdded ?
                                        <NavLink to={`/app/products/mycourses/${courseInfo.id}`}>Start</NavLink>
                                        :
                                        <button className="course-btn-square" onClick={userAddCourse}><i className="fa-solid fa-plus"></i>  Add</button>
                                    }

                                </div>
                            </section>
                            <section className="course-section-main">
                                <div className="course-section-h-wrap">
                                    <h1>
                                        {courseInfo.title}
                                        <span>{courseInfo.topic}</span>
                                        <span className={classNames({
                                          "course-tag-easy": courseInfo.complexity === "easy" || courseInfo.complexity === "Easy",
                                          "course-tag-medium": courseInfo.complexity === "medium" || courseInfo.complexity === "Medium",
                                          "course-tag-hard": courseInfo.complexity === "hard" || courseInfo.complexity === "Hard",
                                        })}>{courseInfo.complexity}</span>
                                    </h1>
                                </div>
                                <div className="course-section-description-wrap">
                                    <p>{courseInfo.description}</p>
                                </div>
                            </section>
                            <section className="course-section-stages">
                                <ul>
                                    {stagesInfo.map((stage, index) => (
                                        <li key={index}>{stage.title}</li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>
                </>
                :
                <Loader/>
            }

        </>
    )
}