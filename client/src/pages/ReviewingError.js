import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "../styles/ReviewingError.css"
const ReviewingError = (props) => {
    const history=useHistory();
    return (
        <div className="reviewing-error-container">
            <h1>Hey, you're in the middle of a review!</h1>
            <h3 onClick={()=>history.push(`/review/${props.id}`)}>Go back</h3>

        </div>
    );
}

export default ReviewingError;
