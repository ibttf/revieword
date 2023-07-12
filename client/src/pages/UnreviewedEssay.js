import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import "../styles/UnreviewedEssay.css";
import config from "../baseUrl"
const UnreviewedEssay = () => {
  const id = useParams().essay;
  const history = useHistory();
  const [currentEssay, setCurrentEssay] = useState({});
  const [errors,setErrors]=useState([])
  function handleDeleteClick(id) {
    fetch(`${config.baseUrl}/essays/${id}`, { 
      method: "DELETE",
      credentials: 'include',
      headers: { 'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}` },  
    })
    .catch(err=>setErrors([err.error]))
    ;
    history.push("/my-essays");
  }
  useEffect(() => {
    fetch(`${config.baseUrl}/essays/${id}`,{
      credentials: 'include',
      headers: { 'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}` },  
    })
      .then((r) => r.json())
      .then(essay=>setCurrentEssay({...essay}));
  }, []);
  return (
    <div className="unreviewed-essay">
      <div className="reviewed-essay-header">
        <p onClick={() =>history.push("/my-essays")}>
          &lt; back to my essays
        </p>
      </div>
      <h1>Essay</h1>
      <div className="unreviewed-essay-block">
        <span>PROMPT: </span>
        <br></br>
        {currentEssay.prompt}
      </div>
      <div className="unreviewed-essay-block">
        <span>ESSAY: </span>
        <br></br>
        {currentEssay.content}
      </div>
      <div className="errors">
          {errors ? (
            errors.map((err) => <div key={err}>Oops! {err}</div>)
          ) : (
            <></>
          )}
        </div>
      <p
        className="delete-unreviewed-essay"
        onClick={() => handleDeleteClick(id)}
      >
        Delete This Essay
      </p>
    </div>
  );
};

export default UnreviewedEssay;
