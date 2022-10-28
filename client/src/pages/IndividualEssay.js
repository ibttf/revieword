import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../styles/IndividualEssay.css";
import Highlight from "../components/Highlight";

const IndividualEssay = () => {
  const history = useHistory();
  let { id } = useParams();
  const [currentEssay, setCurrentEssay] = useState({});
  const [overallComments, setOverallComments] = useState("");
  const [toneComments, setToneComments] = useState("");
  const [flowComments, setFlowComments] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentHighlights, setCurrentHighlights] = useState([]);
  useEffect(() => {
    fetch(`/current-essay/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setCurrentEssay(data);
      });
    fetch(`/current-essay-highlights/${id}`)
      .then((r) => r.json())
      .then(setCurrentHighlights);
  }, []);
  function getEssayDetails(essay) {
    let essayLength = essay.length;
    if (essayLength === "Short") {
      return ["green", 1];
    } else if (essayLength === "Medium") {
      return ["yellow", 2];
    } else {
      return ["red", 3];
    }
  }
  function handleReviewSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch(`/submit-review/${getEssayDetails(currentEssay)[1]}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
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
      <div className="individual-essay-content">
        <p className="individual-essay-content-prompt">
          <span>PROMPT:</span> {currentEssay.prompt}
        </p>
        <p className="individual-essay-content-content">
          <span>ESSAY:</span>
          <br></br>
          <Highlight
            content={currentEssay.content}
            highlights={currentHighlights}
          ></Highlight>
        </p>
      </div>
      <form
        className="individual-essay-form"
        onSubmit={(e) => {
          handleReviewSubmit(e);
          getEssayDetails(currentEssay);
        }}
      >
        <label htmlFor="overallComments">Overall Feedback: </label>
        <textarea
          id="overallComments"
          rows="5"
          onChange={(e) => setOverallComments(e.target.value)}
        />
        <label htmlFor="toneComments">Tone Feedback: </label>
        <textarea
          id="toneComments"
          rows="5"
          onChange={(e) => setToneComments(e.target.value)}
        />
        <label htmlFor="flowComments">Flow Feedback: </label>
        <textarea
          id="flowComments"
          rows="5"
          onChange={(e) => setFlowComments(e.target.value)}
        />

        <button type="submit">{isLoading ? "Loading..." : "Submit"}</button>
      </form>
      <div>
        {errors ? errors.map((err) => <div key={err}>{err}</div>) : <></>}
      </div>
    </div>
  );
};

export default IndividualEssay;
