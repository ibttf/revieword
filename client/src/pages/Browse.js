import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import ReviewConfirmation from "../components/ReviewConfirmation";
import "../styles/Browse.css";
import config from "../baseUrl"


const Browse = (props) => {
  const [reviewableEssays, setReviewableEssays] = useState([]);
  const [essayId,setEssayId]=useState("");
  const [isLoading,setIsLoading]=useState(false);
  const [showReviewConfirmation,setShowReviewConfirmation]=useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${config.baseUrl}/essays/reviewable`,{

      headers: { 'Content-Type': 'application/json', 
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setReviewableEssays([...data])
      });
    setIsLoading(false);
  }, []);


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
    <>
    <div className={`browse ${showReviewConfirmation ? "grayed" : ""}`} onClick={()=>
    {setShowReviewConfirmation(false)
    props.setStopScroll(false)}
    }
    >
      <h1 className="browse-header">Review an Essay</h1>
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
                <button className="review-this-essay-btn" onClick={(e)=>{
                    e.stopPropagation();
                    setShowReviewConfirmation(true);
                    props.setStopScroll(true);
                    setEssayId(essay._id)
                  }}>
                  Review This Essay
                </button>

              </div>
            </>
          );
        })}

      </div>
      
    </div>
    <ReviewConfirmation isShowing={showReviewConfirmation} setIsShowing={setShowReviewConfirmation} essayId={essayId} setStopScroll={props.setStopScroll}/>
    </>
  );
};

export default Browse;
