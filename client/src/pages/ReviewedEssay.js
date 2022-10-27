import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";
const ReviewedEssay = () => {
  const [essay, setEssay] = useState({});
  const id = useParams().essay;
  useEffect(() => {
    fetch(`/essays/${id}`)
      .then((r) => r.json())
      .then(setEssay);
  }, []);
  return (
    <div className="individual-review">
      <h1>See Review</h1>
      <h4>{essay.prompt}</h4>
      <h5>{essay.content}</h5>
      <h5>Overall Comments: {essay.overall_comments}</h5>
      <h5>Tone Comments: {essay.tone_comments}</h5>
      <h5>Flow Comments: {essay.flow_comments}</h5>
    </div>
  );
};

export default ReviewedEssay;
