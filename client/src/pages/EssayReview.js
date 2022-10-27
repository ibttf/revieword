import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/EssayReview.css";
const EssayReview = () => {
  const [reviewableEssays, setReviewableEssays] = useState([]);

  useEffect(() => {
    fetch("/essays-reviewable")
      .then((r) => r.json())
      .then((data) => setReviewableEssays([...data]));
  }, []);
  function createEssayButton(s) {
    let color = "";
    let points = 0;
    if (s === "Short") {
      color = "green";
      points = 1;
    } else if (s === "Medium") {
      color = "orange";
      points = 2;
    } else {
      color = "red";
      points = 3;
    }

    return [color, points];
  }
  return (
    <div className="essay-review">
      <h1 className="essay-review-header">Review an Essay</h1>
      <div className="reviewable-essays">
        {reviewableEssays.map((essay) => {
          return (
            <>
              <div className="essay">
                <div className="essay-length-and-points">
                  <h5
                    className="essay-length"
                    style={{
                      backgroundColor: createEssayButton(essay.length)[0],
                    }}
                  >
                    {essay.length}
                  </h5>
                  <h6 className="essay-added-points">
                    + {createEssayButton(essay.length)[1]} points
                  </h6>
                </div>
                <div className="essay-prompt">{"Prompt: " + essay.prompt}</div>
                <div className="essay-content">
                  {'"' + essay.content.substring(0, 120) + "..." + '"'}
                </div>
                <Link to={`/review/${essay.id}`}>
                  <button className="review-this-essay-btn">
                    Review This Essay
                  </button>
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default EssayReview;
