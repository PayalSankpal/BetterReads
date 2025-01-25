import React, { useState } from "react";
import axios from 'axios';
import {useLocation, useNavigate } from "react-router-dom";


const UpdateProfile = () => {
    const navigate = useNavigate()
    const location = useLocation()
    console.log("split="+location.pathname.split('/'))
    const userId = location.pathname.split('/')[2];

    const [user, setUser]= useState({
        'username':undefined,
        'email':undefined,
        'bio':undefined,
        'profile_picture_url':undefined,
        'password':undefined,
    })

    const handleChange = (e) => {
        setUser(prev=>({...prev, [e.target.name]: e.target.value}));
        console.log(user)
    }

    const handleClick = async e => {
        try{
            const token = localStorage.getItem("token");
            await axios.put("http://localhost:8000/api/users/"+ userId, user, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/profile")
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="update-book-container">
  <h1 className="update-book-heading">Update User</h1>
  <div className="update-form">
    <div className="form-group">

      <input
        type="text"
        id="username"
        placeholder="Username"
        name="username"
        onChange={handleChange}
        className="update-input"
      />
    </div>

    <div className="form-group">
      
      <input
        type="email"
        id="email"
        placeholder="Email"
        name="email"
        onChange={handleChange}
        className="update-input"
      />
    </div>

    <div className="form-group">
     
      <input
        type="text"
        id="profile_picture_url"
        placeholder="Profile Picture URL"
        name="profile_picture_url"
        onChange={handleChange}
        className="update-input"
      />
    </div>

    <div className="form-group">
      
      <input
        type="text"
        id="bio"
        placeholder="Bio"
        name="bio"
        onChange={handleChange}
        className="update-input"
      />
    </div>

    <div className="form-group">
     
      <input
        type="password"
        id="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        className="update-input"
      />
    </div>
  </div>
  <button className="update-button" onClick={handleClick}>
    Update
  </button>
</div>

    )
}

export default UpdateProfile;