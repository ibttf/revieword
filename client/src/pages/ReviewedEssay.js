import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../styles/ReviewedEssay.css";
import EssayList from "./EssayList";
import config from "../baseUrl"
const ReviewedEssay = () => {
  const history = useHistory();
  const [essay, setEssay] = useState({});
  const id = useParams().essay;
  useEffect(() => {
    fetch(`${config.baseUrl}/essays/${id}`,{
      headers: { 'Content-Type': 'application/json', 
      Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    })
      .then((r) => r.json())
      .then(data=>setEssay(data));
  }, []);
  function handleBackToReviewsClick() {
    history.push("/my-essays");
  }
  return (
    <div className="reviewed-essay">
      <div className="reviewed-essay-header">
        <p onClick={() => handleBackToReviewsClick()}>
          &lt; back to my essays
        </p>
        <h1>See Review</h1>
      </div>
      <div className="reviewed-essay-contents">
        <div className="reviewed-essay-feedback">
          <h5>
            <span>Overall Comments: </span>
            <br></br>
            {essay.comments}
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
