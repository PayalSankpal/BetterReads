import React, { useState } from "react";
import axios from 'axios';
import {useLocation, useNavigate } from "react-router-dom";


const AddToShelf = () => {
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
            await axios.post("http://localhost:8000/api/shelves/"+ bookId, book, {
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
        <div>
            <h1>Update Book Status</h1>
            <div className="form">
                <input type="text" placeholder="status" onChange={handleChange} name="status"/>
            </div>
            <button classname="formButton" onClick={handleClick}>Update</button>
        </div>
    )
}

export default AddToShelf;