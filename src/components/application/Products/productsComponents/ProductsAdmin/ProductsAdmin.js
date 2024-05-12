import {useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import './ProductsAdmin.css';
import {Loader} from "../../../../Loader/Loader";
import {toast} from "react-toastify";
import axios from "axios";
import {cutVideoUrl, fileToBase64, normalizeDate} from "../../../../../helpers/apiHelpers";
import {FormattedMessage, useIntl} from "react-intl";

export const ProductsAdmin = (props) => {
    const intl = useIntl();
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
                    toast.warning(intl.formatMessage({ id: 'products_toast_no_info'}));
                    console.log(error, 'error');
                }
            } else{
                toast.error(intl.formatMessage({ id: 'request_goes_wrong'}));
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
                        toast.warning(intl.formatMessage({ id: 'products_incorrect_title'}));
                    } else {
                        toast.warning(intl.formatMessage({ id: 'products_toast_no_info'}));
                    }
                    console.log(error, 'error');
                }
            } else {
                toast.error(intl.formatMessage({ id: 'request_goes_wrong'}));
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
                toast.success(intl.formatMessage({ id: 'products_course_added'}));
                setAddingNew(false);
                await getTeacherInfo();
            }

        } catch(error){
            if(error.response){
                if(error.response.status === 400){
                    toast.warning(intl.formatMessage({ id: 'products_toast_no_info'}));
                    console.log(error, 'error');
                }
            } else{
                toast.error(intl.formatMessage({ id: 'request_goes_wrong'}));
                console.log(error, 'error');
            }
        }
    }

    const isFormEmpty = (form) => {
      const inputs = form.querySelectorAll('input, textarea');
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() !== '') {
          return false;
        }
      }
      return true;
    };

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
            const form = courseForms[i];
            if(isFormEmpty(form)){
                continue
            }
            const imageFile = courseForms[i].elements['image'].files ? courseForms[i].elements['image'].files[0] : null
            const imageBase64 = imageFile ? await fileToBase64(imageFile) : '';

            const stage = {
                title: courseForms[i].elements['title'].value || '',
                description: courseForms[i].elements['description'].value || '',
                image: imageBase64,
                video: cutVideoUrl(courseForms[i].elements['video'].value) || '',
                text: courseForms[i].elements['text'].value || '',
                order: i - 1,
            }

            newCourse.stages.push(stage);
        }
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
                                    <h3><FormattedMessage id="products_total"/></h3>
                                    <p>{teacherInfo.courses.length}</p>
                                </div>
                                <div>
                                    <h3><FormattedMessage id="products_most"/></h3>
                                    <p>{teacherInfo.mostPopular}</p>
                                </div>
                                <div>
                                    <h3><FormattedMessage id="products_topics"/></h3>
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
                                            <div className="productsadmin-back-message"><FormattedMessage id="back"/></div>
                                        </div>
                                        <div className="course-add-container" ref={addCourseContainer}>
                                            <h2><FormattedMessage id="products_new_course"/></h2>
                                            <form className="course-add-form">
                                                <input name="title" type="text" placeholder="title" required={true}/>
                                                <textarea name="description" placeholder="description" cols="30" rows="4"></textarea>
                                                <input type="file" placeholder="image"/>
                                                <input type="text" name="topic" placeholder="Topic"/>
                                                <select name="complexity">
                                                    <option value="easy"><FormattedMessage id="products_easy"/></option>
                                                    <option value="medium"><FormattedMessage id="products_medium"/></option>
                                                    <option value="hard"><FormattedMessage id="products_hard"/></option>
                                                </select>
                                            </form>

                                            <div className="course-add-button-group" ref={addCourseButtons}>
                                                <button onClick={createNewStage}><i className="fa-solid fa-plus"></i>
                                                </button>
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
                                                        <h2><FormattedMessage id="products_to_delete_before"/> {deleteCourseTitle}</h2>
                                                        <h2><FormattedMessage id="products_to_delete"/></h2>
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
                                                            <FormattedMessage id="delete"/>
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
                                        className="fa-solid fa-plus"></i> <FormattedMessage id="new"/>
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