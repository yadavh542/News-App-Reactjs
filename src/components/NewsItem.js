import React from "react";
import { useGlobalContext } from "../context";

const NewsItem = (props)  => {
    const {dark} = useGlobalContext();
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    
    return (
      <div className="my-3">
        
        <div className={dark?"bg-dark card":"card"}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span
              className="badge rounded-pill bg-danger"
              style={{ left: "90%", zIndex: "1" }}
            >
              {source}
            </span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://cdn.sanity.io/images/0vv8moc6/ophtalmology/d198c3b708a35d9adcfa0435ee12fe454db49662-640x400.png"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className={dark?"card-body text-white": "card-body"}>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text"> {description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
        
      </div>
    );
 
}

export default NewsItem;
