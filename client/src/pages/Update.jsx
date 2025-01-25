import React, { useState } from "react";
import axios from 'axios';
import {useLocation, useNavigate } from "react-router-dom";


const Update = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const bookId = location.pathname.split('/')[2];

    const [book, setBook]= useState({
        'title':"",
        'context':"",
        'image':"",
        'genre':"",
        'price':null,
    })

    const handleChange = (e) => {
        setBook(prev=>({...prev, [e.target.name]: e.target.value}));
    }

    const handleClick = async e => {
        try{
            const token = localStorage.getItem("token");
            await axios.put("http://localhost:8000/api/books/"+ bookId, book, {
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
            <h1 className="update-book-heading">Update the Book</h1>

            <div className="update-form">
                <div className="form-group">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    onChange={handleChange}
                    name="title"
                    className="update-input"
                />
                </div>

                <div className="form-group">
                <label htmlFor="context" className="form-label">Context</label>
                <input
                    type="text"
                    id="context"
                    placeholder="Context"
                    onChange={handleChange}
                    name="context"
                    className="update-input"
                />
                </div>

                <div className="form-group">
                <label htmlFor="image" className="form-label">Image URL</label>
                <input
                    type="text"
                    id="image"
                    placeholder="Image URL"
                    onChange={handleChange}
                    name="image"
                    className="update-input"
                />
                </div>

                <div className="form-group">
                <label htmlFor="genre" className="form-label">Genre</label>
                <input
                    type="text"
                    id="genre"
                    placeholder="Genre"
                    onChange={handleChange}
                    name="genre"
                    className="update-input"
                />
                </div>

                <div className="form-group">
                <label htmlFor="price" className="form-label">Price</label>
                <input
                    type="number"
                    id="price"
                    placeholder="Price"
                    onChange={handleChange}
                    name="price"
                    className="update-input"
                />
                </div>
            </div>

            <button className="update-button" onClick={handleClick}>
                Update Book
            </button>
            </div>


    )
}

export default Update;