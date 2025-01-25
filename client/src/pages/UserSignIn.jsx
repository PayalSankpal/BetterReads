import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const SignIn = () => {
    const navigate = useNavigate()

    const [user, setUser]= useState({
        'email':"",
        'password':"",
    })

    const handleChange = (e) => {
        setUser(prev=>({...prev, [e.target.name]: e.target.value}));
    }

    const handleClick = async e => {
        e.preventDefault(); // prevent form submission default behavior
        try {
            // Make the login request
            const response = await axios.post("http://localhost:8000/api/auth/login", user);
            
            // Capture the token from the response
            const token = response.data.token;
            
            // Store the token in localStorage (or sessionStorage)
            localStorage.setItem("token", token);
    
            // Navigate to the home page or another protected route
            navigate("/");
        } catch (err) {
            console.log("Login error:", err);
        }
    };
    

    return(
        <div>
            <h1>New User</h1>
            <div className="form">
                <input type="text" placeholder="Email" onChange={handleChange}name="email"/>
                <input type="text" placeholder="password" onChange={handleChange}name="password"/>
            </div>
            <button className="formButton" onClick={handleClick}>Sign In</button>
        </div>
    )
}

export default SignIn;