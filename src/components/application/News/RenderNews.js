import React from "react";
import classNames from "classnames";
import {normalizeDate} from "../../../helpers/apiHelpers";

export const RenderNews = ({ news }) => {
  const calculateRows = (newsCount) => {
    return Math.ceil(newsCount / 4);
  };

  return (
    <>
      {[...Array(calculateRows(news.length))].map((_, rowIndex) => (
        <div key={rowIndex} className="news-row">
          {[...Array(4)].map((_, colIndex) => {
            const newsIndex = rowIndex * 4 + colIndex;
            const newsItem = news[newsIndex];
            return (
              <div key={colIndex} className={classNames({"article-exists": newsItem})}>
                {newsItem && (
                  <>
                    <a href={`/app/news/${newsItem.id}/`}>
                      <img className="news-image" src={`data:image/jpeg;base64,${newsItem.image}`} alt="no image" loading="lazy"/>
                    </a>
                    <h4>{newsItem.title}</h4>
                    <span>{normalizeDate(newsItem.publication_date)}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};
