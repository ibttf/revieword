import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../styles/UnreviewedEssay.css";
import config from "../baseUrl"
const UnreviewedEssay = () => {
  const id = useParams().essay;
  const history = useHistory();
  const [currentEssay, setCurrentEssay] = useState({});
  function handleDeleteClick(id) {
    fetch(`${config.baseUrl}/essays/${id}`, { method: "DELETE",mode: "no-cors"  });
    history.push("/my-essays");
  }
  useEffect(() => {
    fetch(`/essays/${id}`)
      .then((r) => r.json())
      .then(setCurrentEssay);
  }, []);
  return (
    <div className="unreviewed-essay">
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
