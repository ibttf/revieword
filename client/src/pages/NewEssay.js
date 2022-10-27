import { useState } from "react";
import { useHistory } from "react-router";

function NewRecipe({ user }) {
  const [content, setContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/essays", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        prompt,
        reviewer_id: 1,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => {
          setErrors(err.errors);
        });
      }
    });
  }

  return (
    <>
      <div>
        <h2>Submit Essay</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="prompt">Prompt: </label>
          <input
            type="text"
            id="prompt"
            onChange={(e) => setPrompt(e.target.value)}
          />

          <label htmlFor="content">Content: </label>
          <textarea
            id="content"
            rows="10"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <button type="submit">
            {isLoading ? "Loading..." : "Submit Essay"}
          </button>

          {errors.map((err) => (
            <div key={err}>{err}</div>
          ))}
        </form>
      </div>
    </>
  );
}

export default NewRecipe;
