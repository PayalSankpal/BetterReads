import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const navigate = useNavigate()

    const [user, setUser]= useState({
        'username':"",
        'email':"",
        'password':"",
    })

    const handleChange = (e) => {
        setUser(prev=>({...prev, [e.target.name]: e.target.value}));
    }

    const handleClick = async e => {
        e.preventDefault(); // prevent default form submission
        try {
            // Make the registration request
            const response = await axios.post("http://localhost:8000/api/auth/register", user);
            
            // Capture the token from the response if it’s included
            const token = response.data.token;
            
            // Store the token in localStorage (or sessionStorage)
            localStorage.setItem("token", token);
    
            // Navigate to the home page or another route upon successful registration
            navigate("/");
        } catch (err) {
            console.log("Registration error:", err);
        }
    };
    
    return(
        <div>
            <h1>New User</h1>
            <div className="form">
                <input type="text" placeholder="Username" onChange={handleChange} name="username"/>
                <input type="text" placeholder="Email" onChange={handleChange}name="email"/>
                <input type="text" placeholder="password" onChange={handleChange}name="password"/>
            </div>
            <button className="formButton" onClick={handleClick}>Sign Up</button>
        </div>
    )
}

export default SignUp;