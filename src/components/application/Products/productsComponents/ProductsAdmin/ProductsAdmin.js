import {useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import './ProductsAdmin.css';
import {Loader} from "../../../../Loader/Loader";
import {toast} from "react-toastify";
import axios from "axios";
import {fileToBase64, normalizeDate} from "../../../../../helpers/apiHelpers";

export const ProductsAdmin = (props) => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [teacherInfo, setTeacherInfo] = useState(null);

    const [addingNew, setAddingNew] = useState(false);
    const [askingForDeletion, setAskingForDeletion] = useState(false);

    const [deleteCourseId, setDeleteCourseId] = useState(null);
    const [deleteCourseTitle, setDeleteCourseTitle] = useState(null);

    const addCourseContainer = useRef();
    const addCourseButtons = useRef();
    
    const newCourse = {
        user_id: user.userId,
        course: {},
        stages: [],
    }

    const toggleAddingNew = () => setAddingNew(!addingNew);
    const toggleAskingForDeletion = () => setAskingForDeletion(!askingForDeletion);

    useEffect(() => {
        props.changePageTitle('Admin');
        getTeacherInfo();
    }, []);

    const getTeacherInfo = async () => {
        try{
            const response = await axios.get(
                `${props.host.api}/admingetinfo/?user_id=${user.userId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

            if(response.status === 200){

                setTeacherInfo({
                    ...teacherInfo,
                    courses: response.data.courses,
                    mostPopular: response.data.most_popular,
                    differentTopics: response.data.different_topics,
                })
            }

        } catch(error){
            if(error.response){
                if(error.response.status === 400){
                    toast.warning('Some info missing');
                    console.log(error, 'error');
                }
            } else{
                toast.error('Something goes wrong');
                console.log(error, 'error');
            }
        }
    }

    const deleteCourseInit = (courseId, title) => {
        setDeleteCourseId(courseId);
        setDeleteCourseTitle(title)
        toggleAskingForDeletion();
    }

    const deleteCourse = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const courseTitle = form.elements['title'].value;
        try {
            const response = await axios.get(
                `${props.host.api}/admindeletecourse/?user_id=${user.userId}&course_id=${deleteCourseId}&coursetitle=${courseTitle}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

            if (response.status === 200) {
                toast.success('Course has been deleted');
                setDeleteCourseTitle(null);
                setDeleteCourseId(null);
                toggleAskingForDeletion();
                await getTeacherInfo();
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    const errorMessage = error.response.data.error;
                    if (errorMessage === 'Incorrect course title') {
                        toast.warning('Incorrect course title');
                    } else {
                        toast.warning('Some info missing');
                    }
                    console.log(error, 'error');
                }
            } else {
                toast.error('Something goes wrong');
                console.log(error, 'error');
            }
        }
    }

    const addNewCourse = async () => {

        await addCourseDataFromForms();

        try{
            const response = await axios.post(
                `${props.host.api}/adminaddcourse/`,
                newCourse,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

            if(response.status === 200 || response.status === 201){
                console.log('Course has been successfully added');
                toast.success('Course has been added!');
                setAddingNew(false);
                await getTeacherInfo();
            }

        } catch(error){
            if(error.response){
                if(error.response.status === 400){
                    toast.warning('Some info missing');
                    console.log(error, 'error');
                }
            } else{
                toast.error('Something goes wrong');
                console.log(error, 'error');
            }
        }
    }

    const addCourseDataFromForms = async () => {
        const courseForms = document.querySelectorAll('.course-add-form');

        // course part
        const mainForm = courseForms[0];

        const imageInput = mainForm.querySelector('input[type="file"]');
        const imageFile = imageInput.files.length > 0 ? imageInput.files[0] : null;
        const imageBase64 = imageFile ? await fileToBase64(imageFile) : '';

        newCourse.course = {
            title: mainForm.elements['title'].value || '',
            description: mainForm.elements['description'].value || '',
            image: imageBase64,
            topic: mainForm.elements['topic'].value || '',
            complexity: mainForm.elements['complexity'].value || 'Easy',
        };

        // stages part
        for(let i = 1; i < courseForms.length; i++){
            const imageFile = courseForms[i].files ? courseForms[i].files[0] : null
            const imageBase64 = imageFile ? await fileToBase64(imageFile) : '';

            const stage = {
                title: courseForms[i].elements['title'].value || '',
                description: courseForms[i].elements['description'].value || '',
                image: imageBase64,
                video: courseForms[i].elements['video'].value || '',
                text: courseForms[i].elements['text'].value || '',
                order: i - 1,
            }

            newCourse.stages.push(stage);
        }
        console.log(newCourse);
    };

    const createNewStage = () => {
        const newForm = document.createElement('form');
        newForm.classList.add('course-add-form');

        const titleInput = document.createElement('input');
        titleInput.placeholder = 'Title';
        titleInput.required = true;

        const descriptionInput = document.createElement('textarea');
        descriptionInput.placeholder = 'Description';

        const imageInput = document.createElement('input');
        imageInput.type = 'file';

        const videoInput = document.createElement('input');
        videoInput.placeholder = 'Video (youtube link)';

        const textInput = document.createElement('textarea');
        textInput.placeholder = 'Course text';

        titleInput.name = 'title';
        descriptionInput.name = 'description';
        imageInput.name = 'image';
        videoInput.name = 'video';
        textInput.name = 'text';

        newForm.appendChild(titleInput);
        newForm.appendChild(descriptionInput);
        newForm.appendChild(imageInput);
        newForm.appendChild(videoInput);
        newForm.appendChild(textInput);

        addCourseContainer.current.insertBefore(newForm, addCourseButtons.current);
    };

    return (
        <>
        {teacherInfo ?
                    <>
                        <section className="productsadmin-section-info">
                            <h2>My courses</h2>
                            <div className="productsadmin-info">
                                <div>
                                    <h3>Total courses</h3>
                                    <p>{teacherInfo.courses.length}</p>
                                </div>
                                <div>
                                    <h3>Most popular</h3>
                                    <p>{teacherInfo.mostPopular}</p>
                                </div>
                                <div>
                                    <h3>Different topics</h3>
                                    <p>{teacherInfo.differentTopics}</p>
                                </div>
                            </div>

                        </section>
                        <section className="productsadmin-section-main">
                            {addingNew ?
                                <>
                                    <div className="productsadmin-adding-block">
                                        <div className="productsadmin-back" onClick={toggleAddingNew}>
                                            <i className="fa-solid fa-arrow-left"></i>
                                            <div className="productsadmin-back-message">Back</div>
                                        </div>
                                        <div className="course-add-container" ref={addCourseContainer}>
                                            <h2>New course</h2>
                                            <form className="course-add-form">
                                                <input name="title" type="text" placeholder="title" required={true}/>
                                                <textarea name="description" placeholder="description" cols="30" rows="4"></textarea>
                                                <input type="file" placeholder="image"/>
                                                <input type="text" name="topic" placeholder="Topic"/>
                                                <select name="complexity">
                                                    <option value="easy">Easy</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="hard">Hard</option>
                                                </select>
                                            </form>

                                            <div className="course-add-button-group" ref={addCourseButtons}>
                                                <button onClick={createNewStage}><i className="fa-solid fa-plus"></i></button>
                                                <button onClick={addNewCourse}><i className="fa-solid fa-floppy-disk"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="productsadmin-courses">
                                        {askingForDeletion ?
                                            <>
                                                <div className="productsadmin-delete-block">
                                                    <div className="productsadmin-course-delete full" onClick={toggleAskingForDeletion}>
                                                        <i className="fa-solid fa-xmark"></i>
                                                    </div>
                                                    <form method="POST" onSubmit={deleteCourse}>
                                                        <h2>Курс: {deleteCourseTitle}</h2>
                                                        <h2>Чтобы подтвердить удаление напишите полностью название курса
                                                            и нажмите на кнопку ниже</h2>
                                                        <input type="text" name="title"/>
                                                        <button type="submit">
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </form>
                                                </div>
                                            </>
                                            :
                                            <>
                                                {teacherInfo.courses.map((course) => (
                                                <div key={course.id} className="productsadmin-course">
                                                    <div className="productsadmin-course-delete" onClick={() => deleteCourseInit(course.id, course.title)}>
                                                        <i className="fa-solid fa-trash"></i>
                                                        <div className="productsadmin-course-delete-tip">
                                                            Delete
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <NavLink to={`/app/products/courses/${course.id}`}>
                                                        <img src={`data:image/jpeg;base64,${course.image}`}
                                                                 alt="No image"/>
                                                        </NavLink>
                                                    </div>
                                                    <div>
                                                        <NavLink to={`/app/products/courses/${course.id}`}>
                                                            <h3>{course.title}</h3>
                                                        </NavLink>
                                                        <h4>{normalizeDate(course.publication_date)}</h4>
                                                    </div>
                                                </div>
                                            ))}
                                            </>
                                        }
                                    </div>
                                    <button onClick={toggleAddingNew} className="productsadmin-btn"><i
                                        className="fa-solid fa-plus"></i> new
                                    </button>
                                </>
                            }
                        </section>
                    </>
                    :
                    <>
                        <Loader/>
                    </>
                }
        </>
    )
}