import { useState, useEffect } from "react";
import Loading from "./Loading";
import "../styles/NewEssay.css";
import config from "../baseUrl"
function NewEssay({ user }) {
  const [content, setContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [errors, setErrors] = useState([]);
  const [isInvalidPoints, setIsInvalidPoints] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pointValue, setPointValue] = useState(1);

  function handleContentChange(e){
    let contentArr=content.split(" ")
    if (contentArr.length>700){
        setPointValue(3)
        if (user.points < 3){
          setIsInvalidPoints(true);
        }
    }else if (contentArr.length > 300 ){
      setPointValue(2)
      if (user.points < 2){
        setIsInvalidPoints(true);
      }
    }else{
      setPointValue(1)
      if (user.points < 1){
        setIsInvalidPoints(true);
      }
    }
    setContent(e)
  }
  function handleCreateEssay(e) {
    e.preventDefault();
    setIsLoading(true);

    fetch(`${config.baseUrl}/essays`, {
      method: "POST",
      credentials: 'include',
      headers: { 'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}` },  
      body: JSON.stringify({
        prompt,
        content
      })
    }).then((r) => r.json())
    .then(data=>{
      console.log(data)
      localStorage.setItem('accessToken', data.accessToken);
      setIsLoading(false);
    }).catch((err)=> {
      setErrors("Prompt or content field cannot be empty")
    })
    setIsLoading(false);
    window.location.reload();
  }
  if (!user) return <Loading />

  return (
    <>
      <div className="new-essay">
        <h2>
          Submit Essay <span>(You Have {user.points} Points) </span>
        </h2>

        <form onSubmit={(e) => handleCreateEssay(e)}>
          <label htmlFor="prompt">
            <span>Prompt: </span>
          </label>
          <input
            type="text"
            id="prompt"
            onChange={(e) => setPrompt(e.target.value)}
          />

          <label htmlFor="content">Your Essay: </label>
          <textarea
            id="content"
            rows="25"
            onChange={(e) => handleContentChange(e.target.value)}
          ></textarea>
          {errors.map((err) => (
            <div key={err} className="submit-essay-error">
              {err}
            </div> 
          ))}
          {isInvalidPoints ? <div className="invalid-points-error">Sorry! Looks like you don't have enough points to submit this essay</div>: <></>}
          <button type="submit">
            {isLoading ? "Loading..." : `Submit Essay (${pointValue} Point)`}
          </button>
        </form>
      </div>
    </>
  );
}

export default NewEssay;
