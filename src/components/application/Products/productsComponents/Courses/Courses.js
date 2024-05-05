import React, {useEffect, useState} from "react";
import './Courses.css';
import axios from "axios";
import {toast} from "react-toastify";
import ReactPaginate from "react-paginate";
import {Loader} from "../../../../Loader/Loader";
import {RenderCourses} from "./RenderCourses";
import {FormattedMessage, useIntl} from "react-intl";

export const Courses = (props) => {
    const intl = useIntl();
    const [courses, setCourses] = useState(null);
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [topics, setTopics] = useState(null);

    useEffect(() => {
        props.changePageTitle('Courses')
        getCourses();
    }, []);

    const getCourses = async () => {
        try{
            const response = await axios.get(
                `${props.host.api}/getcourses/`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

            if(response.status === 200){
                setCourses(response.data.courses);
                setTopics(response.data.topics);
            }

        } catch(error){
            if(error.response){
                if(error.response.status === 400){
                    toast.warning(intl.formatMessage({ id: 'products_receive_error'}));
                    console.log('error', error)
                }
            } else{
                toast.error(intl.formatMessage({ id: 'request_goes_wrong'}))
                console.log('error:', error)
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
            const response = await axios.get(`${props.host.api}/getcourses/?topic=${topic}&complexity=${complexity}&sortby=${sortby}`);
            if (response.status === 200) {
                setCourses(response.data.courses);
                setTopics(response.data.topics)
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
            const response = await axios.get(`${props.host.api}/getcourses/?title=${title}`);
            if(response.status === 200){
                setCourses(response.data.courses);
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

    return (
    <>
        {courses ? (
            <>
                <div className="courses-search-block">
                    <button onClick={getCourses} className="courses-reset">
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
                        <input type="text" name="title" required={true} placeholder={intl.formatMessage({ id: 'placeholder_filter_title'})}/>
                    </form>
                </div>
                <section className="courses-board">
                    <RenderCourses
                        courses={courses.slice(page * itemsPerPage, (page + 1) * itemsPerPage)}
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
                        onPageChange={({ selected }) => {
                            setPage(selected);
                        }}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />
                </section>
            </>
        ) : (
            <Loader />
        )}
    </>);
}