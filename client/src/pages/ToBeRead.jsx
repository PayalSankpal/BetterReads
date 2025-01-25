import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const ToBeRead = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooksRead = async () => {
            try {
                const token = localStorage.getItem("token");
    
                // Step 1: Fetch books based on status "to be read"
                const res = await axios.get("http://localhost:8000/api/shelves/status/to be read", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                // Assuming res.data contains a list of books
                const booksWithDetails = await Promise.all(
                    res.data.map(async (book) => {
                        // Step 2: Fetch detailed info about each book using the book_id
                        const bookRes = await axios.get(`http://localhost:8000/api/books/${book.book_id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
    
                        // Add the detailed book information to each book object
                        return { ...book, details: bookRes.data };
                    })
                );
    
                // Step 3: Set books with detailed info to state
                console.log(booksWithDetails);
                
                setBooks(booksWithDetails);
    
            } catch (err) {
                console.log(err);
            }
        };
    
        fetchAllBooksRead();
    }, []);

    const handleDelete = async (id) => {
        try {
            // Get token from localStorage
            const token = localStorage.getItem("token");
    
            // Make the DELETE request with the Authorization header
            await axios.delete(`http://localhost:8000/api/shelves/${id}`, {
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
    

    return (
        <div>
            <h2>To Be Read</h2>
            <div className="books">
                {books.map((book) => (
                <div className="book" key={book.book_id}>
                    {/* Check if book.details exists and is not empty before accessing image */}
                    {book.details  && book.details.image && (
                    <img src={book.details.image} alt={book.details.title} />
                    )}
                    <h1>{book.details  ? book.details.title : "No Title"}</h1>
                    <p>{book.details  ? book.details.context : "No Description"}</p>
                    <p>Price: {book.details ? book.details.price : "Not Available"}</p>
                    <p>Status: {book.status}</p>
                    <button onClick={() => handleDelete(book.book_id)} className="delete">Delete</button> 
                    <button className="update"><Link to={`/update-status/${book.book_id}`}>Update Status</Link></button> 
                </div>
                ))}
            </div>
            </div>

    );
};

export default ToBeRead;
