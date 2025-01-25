import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Books = () => {
    const navigate = useNavigate();

    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                // Get token from localStorage
                const token = localStorage.getItem("token");

                if (!token) {
                    
                    navigate("/signin"); 
                }
    
                // Make the GET request with the Authorization header
                const res = await axios.get("http://localhost:8000/api/books/", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                console.log(res.data);
                setBooks(res.data);
            } catch (err) {
                console.log("Fetch books error:", err);
            }
        };
    
        fetchAllBooks();
    }, [navigate]);
    
    const handleDelete = async (id) => {
        try {
            // Get token from localStorage
            const token = localStorage.getItem("token");
    
            // Make the DELETE request with the Authorization header
            await axios.delete(`http://localhost:8000/api/books/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            // Reload the page after deletion (or alternatively, update state directly)
            window.location.reload();
        } catch (err) {
            console.log("Delete book error:", err);
        }
    };
    

    return(
        <div>
            <Navbar />
            {/* <h1>Payal's Book Shop</h1> */}
            <div className="books">
                {books.map(book=>(
                    <div className="book" key={book.book_id}>
                        {book.image && <img src={book.image} alt="" />}
                        <h1><Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/book/${book.book_id}`}>{book.title}</Link></h1>
                        <p>{book.context}</p>
                        <p>{book.genres[0]}</p>
                        <button onClick={()=>handleDelete(book.book_id)}  className="delete">Delete</button>
                        <button className="update"><Link to={`/update/${book.book_id}`} >Update</Link></button>
                        <button className="add-to-shelf"><Link to={`/add-to-shelf/${book.book_id}`} >Add To Shelf</Link></button>
                    </div>
                ))}
            </div>
            <button><Link to="/add">Add new Book</Link></button>
        </div>
    )
}

export default Books