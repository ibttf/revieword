import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/EssayList.css";

function EssayList() {
  const [unReviewedEssays, setUnReviewedEssays] = useState([]);
  const [reviewedEssays, setReviewedEssays] = useState([]);

  useEffect(() => {
    fetch("/essays-unreviewed")
      .then((r) => r.json())
      .then(setUnReviewedEssays);

    fetch("/essays-reviewed")
      .then((r) => r.json())
      .then(setReviewedEssays);
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
  return (
    <div className="essay-list">
      <h2>Essays Still Waiting for a Review</h2>
      <div className="essays-container">
        {unReviewedEssays.map((essay) => {
          return (
            <>
              <div className="single-essay">
                <h5
                  className="essay-length"
                  style={{
                    backgroundColor: createEssayButton(essay.length)[0],
                  }}
                >
                  {essay.length}
                </h5>
                <p className="single-essay-prompt">
                  {essay.prompt.substring(0, 50) + "..."}
                </p>
                <p className="single-essay-content">
                  {essay.content.substring(0, 100) + "..."}
                </p>
                <br></br>
                <Link to={`/unreviewed-essay/${essay.id}`}>
                  <div className="essay-list-select">See Essay</div>
                </Link>
              </div>
            </>
          );
        })}
      </div>
      <h2>Reviewed Essays</h2>
      <div className="essays-container">
        {reviewedEssays.map((essay) => {
          return (
            <>
              <div className="single-essay">
                <h5
                  className="essay-length"
                  style={{
                    backgroundColor: createEssayButton(essay.length)[0],
                  }}
                >
                  {essay.length}
                </h5>
                <p className="single-essay-prompt">
                  {essay.prompt.substring(0, 50) + "..."}
                </p>
                <p className="single-essay-content">
                  {essay.content.substring(0, 100) + "..."}
                </p>
                <br></br>
                <Link to={`/my-essay/${essay.id}`}>
                  <div className="essay-list-select">See Review</div>
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default EssayList;
