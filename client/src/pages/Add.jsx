import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Add = () => {
    const navigate = useNavigate()

    const [authors, setAuthors] = useState([]);

    const [book, setBook]= useState({
        'title':"",
        'context':"",
        'image':"",
        'genre':"",
        'price':null,
        'author':null,
    })

    useEffect(() => {
        const fetchAllAuthors = async () => {
          try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:8000/api/authors", {
              headers: {
                Authorization: `Bearer ${token}`, // Pass token in headers
              },
            });
            
            setAuthors(res.data); // Set the fetched authors data
          } catch (err) {
            console.log("Fetch authors error:", err);
          }
        };
    
        fetchAllAuthors();
      }, []);

    const handleChange = (e) => {
        setBook(prev=>({...prev, [e.target.name]: e.target.value}));
        console.log(book)
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
            const response = await axios.post("http://localhost:8000/api/books", book, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            console.log("Book posted successfully:", response);
            navigate("/");
        } catch (err) {
            console.error("Error posting book:", err);
        }
    };
    

    return(
        <div>
            <h1>Add new Book</h1>
            <div className="form">
                <input type="text" placeholder="title" onChange={handleChange} name="title"/>
                <input type="text" placeholder="context" onChange={handleChange}name="context"/>
                <input type="text" placeholder="genre" onChange={handleChange}name="genre"/>
                <input type="text" placeholder="image" onChange={handleChange}name="image"/>
                <input type="number" placeholder="price" onChange={handleChange} name="price"/>
                {/* Dropdown for Author */}
                <select name="author" onChange={handleChange} type="number">
                <option value="" disabled>
                    Select an Author
                </option>
                {authors && authors.map((author) => (
                    <option key={author.author_id} value={author.author_id}>
                    {author.penname}
                    </option>
                ))}
                </select>
            </div>
            <button className="formButton" onClick={handleClick}>Add</button>
        </div>
    )
}

export default Add