import React, { useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";


const AddReview = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const bookId = location.pathname.split('/')[2];

    const [review, setReview]= useState({
        'comment':"",
        'rating':null,
        'book_id':bookId,
    })

    const handleChange = (e) => {
        setReview(prev=>({...prev, [e.target.name]: e.target.value}));
    }

    const handleClick = async e => {
        e.preventDefault(); // Prevent form submission if this is inside a form
    
        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem("token");
            console.log("Token from localStorage:", token); // Log token to verify
    
            if (!token) {
                console.log("No token found.");
                return; // Exit if token is not found
            }
    
            // Send the request with Authorization header
            const response = await axios.post("http://localhost:8000/api/reviews", review, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            console.log("Review posted successfully:", response);
            navigate(`/book/${bookId}`);
        } catch (err) {
            console.error("Error posting review:", err);
        }
    };
    

    return(
        <div>
            <h1>Write Review</h1>
            <div className="form">
                <input type="text" placeholder="comment" onChange={handleChange} name="comment"/>
                <input type="number" placeholder="rating" onChange={handleChange} name="rating"/>
            </div>
            <button className="formButton" onClick={handleClick}>Add</button>
        </div>
    )
}

export default AddReview