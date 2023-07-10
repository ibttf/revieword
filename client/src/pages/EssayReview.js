import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
import "../styles/EssayReview.css";
import config from "../baseUrl"
const EssayReview = () => {
  const [reviewableEssays, setReviewableEssays] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const history=useHistory();

  useEffect(() => {
    fetch(`${config.baseUrl}/essays/reviewable`,{

      headers: { 'Content-Type': 'application/json', 
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setReviewableEssays([...data])
      });
  }, []);

  const handleBeginReview=async(id)=>{
    setIsLoading(true);

    fetch(`${config.baseUrl}/users/${id}`,{
      method: "POST",
      headers: { 'Content-Type': 'application/json', 
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    }).then(r=>r.json())
    .then(data=>{
      localStorage.setItem('accessToken', data.accessToken);
    })

    setIsLoading(false);
    history.push(`/review/${id}`)
  }

  function createEssayButton(s) {
    let color = "";
    let points = 0;
    if (s === "Short") {
      color = "green";
      points = 1;
    } else if (s === "Medium") {
      color = "orange";
      points = 2;
    } else {
      color = "red";
      points = 3;
    }

    return [color, points];
  }
  if (isLoading){
    return <Loading />
  }
  return (
    <div className="essay-review">
      <h1 className="essay-review-header">Review an Essay</h1>
      <div className="reviewable-essays">
        {reviewableEssays.map((essay) => {
          return (
            <>
              <div className="essay">
                <div className="essay-length-and-points">
                  <h5
                    className="essay-length"
                    style={{
                      backgroundColor: createEssayButton(essay.length)[0],
                    }}
                  >
                    {essay.length}
                  </h5>
                  <h6 className="essay-added-points">
                    + {createEssayButton(essay.length)[1]} points
                  </h6>
                </div>
                <div className="essay-prompt">{"Prompt: " + essay.prompt}</div>
                <div className="essay-content">
                  {'"' + essay.content.substring(0, 120) + "..." + '"'}
                </div>
                <button className="review-this-essay-btn" onClick={()=>handleBeginReview(essay._id)}>
                  Review This Essay
                </button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default EssayReview;
