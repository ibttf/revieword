import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../styles/ReviewedEssay.css";
import EssayList from "./EssayList";

const ReviewedEssay = () => {
  const history = useHistory();
  const [essay, setEssay] = useState({});
  const id = useParams().essay;
  useEffect(() => {
    fetch(`/essays/${id}`)
      .then((r) => r.json())
      .then(setEssay);
  }, []);
  function handleBackToReviewsClick() {
    history.push("/my-essays");
  }
  return (
    <div className="reviewed-essay">
      <div className="reviewed-essay-header">
        <p onClick={() => handleBackToReviewsClick()}>
          &lt; back to reviewed essays
        </p>
        <h1>See Review</h1>
      </div>
      <div className="reviewed-essay-contents">
        <div className="reviewed-essay-feedback">
          <h5>
            <span>Overall Comments: </span>
            <br></br>
            {essay.overall_comments}
          </h5>
          <h5>
            <span>Tone Comments: </span>
            <br></br>
            {essay.tone_comments}
          </h5>
          <h5>
            <span>Flow Comments: </span>
            <br></br> {essay.flow_comments}
          </h5>
        </div>
        <div className="reviewed-essay-content">
          <h4>
            <span>PROMPT: </span>
            {essay.prompt}
          </h4>
          <h5>{essay.content}</h5>
        </div>
      </div>
    </div>
  );
};

export default ReviewedEssay;
