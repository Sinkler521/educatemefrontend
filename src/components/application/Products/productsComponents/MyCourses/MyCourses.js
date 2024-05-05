import React, {useEffect, useState} from "react";
import './MyCourses.css';
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import axios from "axios";
import {RenderCourses} from "./RenderCourses";
import ReactPaginate from "react-paginate";
import {Loader} from "../../../../Loader/Loader";
import {FormattedMessage, useIntl} from "react-intl";

export const MyCourses = (props) => {
    const intl = useIntl();
    const user = useSelector(state => state.user);
    const [courses, setCourses] = useState(null);
    const [firstTimeLoaded, setFirstTimeLoaded] = useState(false); // hack
    const [topics, setTopics] = useState(null);
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        props.changePageTitle('My courses');
        getCourseList();
    }, []);

    useEffect(() => {
        getTopics();
    }, [courses]);

    const getCourseList = async () => {
        try{
            const response = await axios.get(
                `${props.host.api}/getmycourses/?user_id=${user.userId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

            if(response.status === 200){
                setCourses(response.data);
            }

        } catch(error){
            if(error.response){
                if(error.response.status === 404){
                    toast.warning(intl.formatMessage({ id: 'products_toast_no_info'}));
                    console.log(error);
                }
            } else{
                toast.error(intl.formatMessage({ id: 'request_goes_wrong'}));
                console.log(error);
            }
        }
    }

    const handleFilterSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const complexity = formData.get('complexity') || '';
        const topic = formData.get('topic') || '';
        const sortby = formData.get('sortby') || '';

        try {
            const response = await axios.get(`${props.host.api}/searchmycourses/?topic=${topic}&complexity=${complexity}&sortby=${sortby}&user_id=${user.userId}`);
            if (response.status === 200) {
                setCourses(response.data);
            }
        } catch (error) {
            console.error('Error filtering courses:', error);
        }
    };

    const handleTitleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');

        try{
            const response = await axios.get(`${props.host.api}/searchmycourses/?title=${title}&user_id=${user.userId}`);
            if(response.status === 200){
                setCourses(response.data);
            }
        } catch(error){
            if(error.response){
                if(error.response.status === 400){
                    toast.warning(intl.formatMessage({ id: 'products_filter_error'}));
                }
            }
            console.log(error, 'error');
            toast.error(intl.formatMessage({ id: 'request_goes_wrong'}));
        }
    }

    const getTopics = () => {
        if(!firstTimeLoaded && courses){
            let topicArray = [];

            if(courses){
                courses.forEach(element => {
                    topicArray.push(element.course.topic);
                })
            }
            setTopics(topicArray)
            setFirstTimeLoaded(true);
        }
    }

    return (
        <>
            {courses ? (
                <>
                    <div className="courses-search-block">
                        <button onClick={getCourseList} className="courses-reset">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <form method="GET" className="products-search-form" onSubmit={handleFilterSubmit}>
                            <div className="products-search-select-block">
                                {topics ? (
                                    <label>
                                        <FormattedMessage id="products_search_topic"/>
                                        <select name="topic">
                                            <option key="empty"></option>
                                            {topics.map((topic, index) => (
                                                <option key={index} value={topic}>{topic}</option>
                                            ))}
                                        </select>
                                    </label>
                                ) : null}
                                <label>
                                    <FormattedMessage id="products_search_complexity"/>
                                    <select name="complexity">
                                        <option></option>
                                        <option value="Easy"><FormattedMessage id="products_easy"/></option>
                                        <option value="Medium"><FormattedMessage id="products_medium"/></option>
                                        <option value="Hard"><FormattedMessage id="products_hard"/></option>
                                    </select>
                                </label>
                                <label>
                                    <FormattedMessage id="products_search_orderby"/>
                                    <select name="sortby">
                                        <option></option>
                                        <option value="newest"><FormattedMessage id="products_newest"/></option>
                                        <option value="oldest"><FormattedMessage id="products_oldest"/></option>
                                    </select>
                                </label>
                            </div>
                            <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                        </form>
                        <form method="GET" className="products-filter-form" onSubmit={handleTitleSearch}>
                            <button type="submit"><i className="fa-solid fa-filter"></i></button>
                            <input type="text" name="title" required={true} placeholder="Filter by title"/>
                        </form>
                    </div>


                    <section className="courses-board">
                        <RenderCourses
                            courses={courses.map(item => ({
                                ...item.course,
                                completed: item.completed
                            }))}
                            page={page}
                            itemsPerPage={itemsPerPage}
                        />
                    </section>
                    <section className="paginator">
                        <ReactPaginate
                            previousLabel={"← Previous"}
                            nextLabel={"Next →"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(courses.length / itemsPerPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={({selected}) => {
                                setPage(selected);
                            }}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                        />
                    </section>


                </>
            ) : (
                <Loader/>
            )}
        </>
    )
}