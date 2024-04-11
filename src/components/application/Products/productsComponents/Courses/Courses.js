import React, {useEffect, useState} from "react";
import './Courses.css';

export const Courses = (props) => {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        props.changePageTitle('Courses')
    }, []);

    return (
        <>
            <div className="courses-search-block">
                <form method="GET" className="products-search-form">
                    <label>Topic
                        <select name="topic">
                            {/*<option value="1">Option 1</option>*/}
                            {/*<option value="2">Option 2</option>*/}
                            {/*<option value="3">Option 3</option>*/}
                        </select>
                    </label>

                    <label>Complexity
                        <select name="complexity">
                            <option value="1">Easy</option>
                            <option value="2">Medium</option>
                            <option value="3">Hard</option>
                        </select>
                    </label>
                    <label>Sort by
                        <select name="sortby">
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </label>
                    <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </div>
        </>
    )
}