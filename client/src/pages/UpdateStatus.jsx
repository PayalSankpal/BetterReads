import React, { useState } from "react";
import axios from 'axios';
import {useLocation, useNavigate } from "react-router-dom";


const UpdateStatus = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const bookId = location.pathname.split('/')[2];

    const [book, setBook]= useState({
        'status':"",
    })

    const handleChange = (e) => {
        setBook(prev=>({...prev, [e.target.name]: e.target.value}));
    }

    const handleClick = async e => {
        try{
            const token = localStorage.getItem("token");
            await axios.put("http://localhost:8000/api/shelves/"+ bookId, book, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="update-book-container">
            <h1 classNAme="update-book-heading">Update Book Status</h1>
            <div className="update-form">
                <input className="update-input" type="text" placeholder="status" onChange={handleChange} name="status"/>
            </div>
            <button className="update-button" onClick={handleClick}>Update</button>
        </div>
    )
}

export default UpdateStatus;