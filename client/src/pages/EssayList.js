import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  function handleDeleteEssay(id) {
    fetch(`/essays/${id}`, { method: "DELETE" });
  }
  return (
    <>
      <h2>Essays Still Waiting for a Review</h2>
      {unReviewedEssays.map((essay) => {
        return (
          <>
            <div>{essay.content.substring(0, 120) + "..."}</div>
            <button onClick={handleDeleteEssay(essay.id)}>Delete Essay</button>
          </>
        );
      })}
      <h2>Reviewed Essays</h2>
      {reviewedEssays.map((essay) => {
        return (
          <>
            <div>{essay.content.substring(0, 120) + "..."}</div>

            <Link to={`/my-essay/${essay.id}`}>
              <button>See Review</button>
            </Link>
          </>
        );
      })}
    </>
  );
}

export default EssayList;
