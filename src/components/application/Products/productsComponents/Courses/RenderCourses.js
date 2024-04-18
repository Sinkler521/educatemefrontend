import React from "react";
import classNames from "classnames";
import {normalizeDate} from "../../../../../helpers/apiHelpers";
import {NavLink} from "react-router-dom";

export const RenderCourses = (props) => {

  const checkIfNew = (publicationDate) => {
    const currentDate = new Date();
    const weekAgoDate = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000));
    const publicationDateObject = new Date(publicationDate);

    return publicationDateObject >= weekAgoDate;
  };

    const calculateRows = (items) => {
        return Math.ceil(items / 2);
    };

  const rows = calculateRows(props.courses.length);

  const renderRows = () => {
    const rowsArray = [];
    for (let i = 0; i < rows; i++) {
      const startIndex = i * 2;
      const endIndex = Math.min(startIndex + 2, props.courses.length);
      const rowCourses = props.courses.slice(startIndex, endIndex);
      rowsArray.push(
        <div className="courses-row" key={i}>
          {rowCourses.map((course, index) => (
            <div className="course-preview" key={index}>
              <div className="course-example-badge">{checkIfNew(course.publication_date) ? "New" : ""}</div>
              <div className="course-example-card">
                <NavLink to={`/products/courses/${course.id}`}>
                  <img src={`data:image/jpeg;base64,${course.image}`} alt="no image" loading="lazy"/>
                </NavLink>

              </div>
              <div className="course-preview-body">
                <h2 className="course-example-h">{course.title}</h2>
                <div className="course-example-tags">
                  <div className="course-example-tag">{course.topic}</div>
                  <div
                    className={classNames("course-example-tag", {
                      "tag-easy": course.complexity === "Easy",
                      "tag-medium": course.complexity === "Medium",
                      "tag-hard": course.complexity === "Hard",
                    })}
                  >
                    {course.complexity}
                  </div>
                  <div className="course-example-tag tag-sections">{`${course.sections ? course.sections : 0} sections`}</div>
                </div>
                <span>{normalizeDate(course.publication_date)}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return rowsArray;
  };

  return <>{renderRows()}</>;
};