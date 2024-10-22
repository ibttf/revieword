import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../styles/IndividualEssay.css";
import Highlight from "../components/Highlight";
import config from "../baseUrl"
const IndividualEssay = (props) => {
  const history = useHistory();
  let { id } = useParams();
  const [currentEssay, setCurrentEssay] = useState({});
  const [overallComments, setOverallComments] = useState("");
  const [toneComments, setToneComments] = useState("");
  const [flowComments, setFlowComments] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentHighlights, setCurrentHighlights] = useState([]);


  useEffect(() => {
    fetch(`${config.baseUrl}/essays/${id}`,{
      credentials: 'include',
      headers: { 'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setCurrentEssay(data);
      }).catch(err=>setErrors([err.error]));
  }, []);


  function handleReviewSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch(`${config.baseUrl}/users/${id}`, {
      method: "PUT",
      credentials: 'include',
      headers: { 'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}` }, 
      body: JSON.stringify({
        comments: overallComments,
        toneComments: toneComments,
        flowComments: flowComments
      }),
    }).then(r=>r.json())
    .then(data=>{
      localStorage.setItem('accessToken', data.accessToken);
      history.push("/")
      window.location.reload();
    }).catch(err=>{
      setErrors(err.error)
    })
      setIsLoading(false);
  
  }



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
