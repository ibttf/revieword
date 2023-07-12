import React, {useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "../styles/ReviewConfirmation.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPen
} from "@fortawesome/free-solid-svg-icons";

import config from "../baseUrl";

import Loading from '../pages/Loading';

const ReviewConfirmation = (props) => {
    const [isLoading,setIsLoading]=useState(false);
    const history=useHistory();

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
    

if (isLoading) return <Loading />
if (props.isShowing){
// IF SHOWING
    return( 
        <div className="review-confirmation">
            <div className="icon-container">
                <FontAwesomeIcon icon={faPen} />
            </div>

            <h2>Are you sure you want to review this essay?</h2>
            <h3>If you start reviewing an essay, you won't be able to access any other features until you complete your review.</h3>
            <div className="review-confirmation-button-container">
                <button className="review-confirmation-cancel-button" onClick={()=>{
                    props.setIsShowing(false);
                    props.setStopScroll(false);
                    }}>Cancel</button>
                <button className="review-confirmation-submit-button" onClick={()=>handleBeginReview(props.essayId)}>Yes, I'll review this essay</button>
            </div>
        </div>
    
    
    
        )
    }
    return (
        <></>
    );
}

export default ReviewConfirmation;
