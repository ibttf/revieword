import { useRef, useState } from "react";
import HighlightPop from "react-highlight-pop";
import { useParams } from "react-router-dom";
import "../styles/Highlight.css";
export default function Highlight({ content, highlights }) {
  const essayId = useParams().id;

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [startNode, setStartNode] = useState("");
  const [endNode, setEndNode] = useState("");

  const ref = useRef();

  const onMouseUp = () => {
    let selection = document.getSelection();

    const { anchorNode, anchorOffset, focusNode, focusOffset } = selection;
    if (anchorOffset > focusOffset) {
      setEnd(anchorOffset);
      setStart(focusOffset);
      setStartNode(focusNode);
      setEndNode(anchorNode);
    } else {
      setStart(anchorOffset);
      setEnd(focusOffset);
      setStartNode(anchorNode);
      setEndNode(focusNode);
    }
  };

  const addComment = () => {
    const range = new Range();
    range.setStart(startNode, start);
    range.setEnd(endNode, end);
    let newEl = document.createElement("mark");
    range.surroundContents(newEl);
    fetch(`/highlight/${essayId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: parseInt(start),
        end: parseInt(end),
      }),
    })
      .then((r) => r.json())
      .then(console.log);
  };

  return (
    <div>
      <HighlightPop
        popoverItems={() => (
          <div>
            <button
              className="highlight-button"
              onClick={() => {
                addComment();
              }}
            >
              Highlight
            </button>
          </div>
        )}
        onHighlightPop={() => {
          onMouseUp();
        }}
        ref={ref}
      >
        <div>{content}</div>
      </HighlightPop>
    </div>
  );
}
