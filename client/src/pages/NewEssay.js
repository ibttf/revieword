import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "../styles/NewEssay.css";
function NewEssay({ user }) {
  const [content, setContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [errors, setErrors] = useState([]);
  const [pointError, setPointError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [userPoints, setUserPoints] = useState(0);
  const [pointValue, setPointValue] = useState(1);
  useEffect(() => {
    fetch("/show_points")
      .then((r) => r.json())
      .then((points) => {
        setUserPoints(points);
      });
  }, []);

  function handleContentChange(cont) {
    setContent(cont);
    let contLength = cont.split(" ").length;
    if (contLength < 300) {
      setPointValue(1);
    } else if (contLength < 700) {
      setPointValue(2);
    } else {
      setPointValue(3);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const essayLength = content.split(" ").length;
    let essayPointValue = 0;
    let length = "";
    if (essayLength < 300) {
      length = "Short";
      essayPointValue = 1;
    } else if (essayLength < 700) {
      length = "Medium";
      essayPointValue = 2;
    } else {
      length = "Long";
      essayPointValue = 3;
    }

    setIsLoading(true);
    fetch(`/submit-essay/${essayPointValue}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      if (!r.ok) {
        r.json().then(setPointError);
        setIsLoading(false);
        return;
      } else {
        fetch("/essays", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
            prompt,
            length: length,
          }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            history.push("/my-essays");
          } else {
            r.json().then((err) => {
              setErrors(err.errors);
              fetch(`/submit-review/${essayPointValue}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
              });
            });
          }
        });
      }
    });
  }

  return (
    <>
      <div className="new-essay">
        <h2>
          Submit Essay <span>(You Have {userPoints} Points) </span>
        </h2>

        <form onSubmit={(e) => handleSubmit(e)}>
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
          {<div>{pointError.error}</div>}
          <button type="submit">
            {isLoading ? "Loading..." : `Submit Essay (${pointValue} Point)`}
          </button>
        </form>
      </div>
    </>
  );
}

export default NewEssay;
