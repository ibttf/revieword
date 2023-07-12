import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "./Loading";
import "../styles/SubmitEssay.css";
import config from "../baseUrl"
function SubmitEssay({ user }) {
  const [content, setContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [errors, setErrors] = useState([]);
  const [isInvalidPoints, setIsInvalidPoints] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pointValue, setPointValue] = useState(1);
  const history=useHistory();

  function handleContentChange(e){
    setContent(e.target.value)
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
    }).then((r) => {
      if (r.ok){
        r.json()
        .then(data=>{
          localStorage.setItem('accessToken', data.accessToken);
          setIsLoading(false);
    
          history.push("/my-essays")
        })
      }else{
        r.json().then(data=>{
          setErrors([data.error]);
        })
      }
    })
    
    setIsLoading(false);
  }
  if (!user) return <Loading />

  return (
    <>
      <div className="submit-essay">
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
            onChange={(e) => handleContentChange(e)}
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

export default SubmitEssay;
