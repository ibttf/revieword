import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
const IndividualEssay = (props) => {
  const history = useHistory();
  let { id } = useParams();
  const [currentEssay, setCurrentEssay] = useState({});

  const [overallComments, setOverallComments] = useState("");
  const [toneComments, setToneComments] = useState("");
  const [flowComments, setFlowComments] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`/current-essay/${id}`)
      .then((r) => r.json())
      .then(setCurrentEssay);
  }, []);

  function handleReviewSubmit(e) {
    e.preventDefault();
    fetch(`/finish-review/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        overall_comments: overallComments,
        tone_comments: toneComments,
        flow_comments: flowComments,
        is_reviewed: true,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => {
          console.log(err.errors);
          setErrors(err.errors);
        });
      }
    });
  }
  return (
    <div className="individual-essay">
      <h1>Review this Essay</h1>
      <h2>{currentEssay.content}</h2>
      <form className="individual-essay-form" onSubmit={handleReviewSubmit}>
        <label htmlFor="overallComments">Overall Feedback: </label>
        <textarea
          id="overallComments"
          rows="10"
          onChange={(e) => setOverallComments(e.target.value)}
        />
        <label htmlFor="toneComments">Tone Feedback: </label>
        <textarea
          id="toneComments"
          rows="10"
          onChange={(e) => setToneComments(e.target.value)}
        />
        <label htmlFor="flowComments">Flow Feedback: </label>
        <textarea
          id="flowComments"
          rows="10"
          onChange={(e) => setFlowComments(e.target.value)}
        />

        <button type="Submit">Submit Feedback</button>
      </form>
      <div>
        {errors ? errors.map((err) => <div key={err}>{err}</div>) : <></>}
      </div>
    </div>
  );
};

export default IndividualEssay;
