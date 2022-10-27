import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const EssayReview = () => {
  const [reviewableEssays, setReviewableEssays] = useState([]);

  useEffect(() => {
    fetch("/essays-reviewable")
      .then((r) => r.json())
      .then((data) => setReviewableEssays([...data]));
  }, []);

  return (
    <div className="essay-review">
      <h1 className="essay-review-header">Essays to Review</h1>
      <div className="reviewable-essays">
        {reviewableEssays.map((essay) => {
          return (
            <>
              <div>{essay.content.substring(0, 120) + "..."}</div>
              <Link to={`/review/${essay.id}`}>
                <button>Review This Essay</button>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default EssayReview;
