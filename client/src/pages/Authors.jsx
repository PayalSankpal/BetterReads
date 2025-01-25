import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);

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
  }, []); // Empty dependency array ensures it runs once when the component mounts

  const handleDelete = async (id) => {
    try {
        // Get token from localStorage
        const token = localStorage.getItem("token");

        // Make the DELETE request with the Authorization header
        await axios.delete(`http://localhost:8000/api/authors/${id}`, {
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
      <h2>Authors</h2>
      <div className="authors">
        {authors.length === 0 ? (
          <p>No authors found.</p>
        ) : (
          authors.map((author) => (
            <div className="author" key={author.author_id}>
              <h3><Link style={{ textDecoration: 'none', color: "black"}} to={`/author/${author.author_id}`}>{author.penname}</Link></h3>
              <p>Biography : {author.biography}</p>
              <p>Nationality: {author.nationality}</p>
              <p>Date of Birth: {author.date_of_birth}</p>
              <button onClick={()=>handleDelete(author.author_id)}  className="delete">Delete</button>
              <button className="update"><Link to={`/update-author/${author.author_id}`}>Update</Link></button>
            </div>
          ))
        )}
      </div>
      <button><Link to="/add-author">Add new Author</Link></button>
    </div>
  );
};

export default AuthorsPage;
