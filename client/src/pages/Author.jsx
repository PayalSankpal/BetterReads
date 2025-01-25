import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AuthorPage = () => {
    const location = useLocation();
    const authorId = location.pathname.split('/')[2];
  const [author, setAuthor] = useState(null); // State to store author details

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found.");
          return;
        }

        const response = await axios.get(`http://localhost:8000/api/authors/${authorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAuthor(response.data); // Set the author data
      } catch (err) {
        console.error("Error fetching author data:", err);
      }
    };

    fetchAuthor();
  }, [authorId]); // Only refetch when authorId changes

  if (!author) {
    return <div>Loading author details...</div>; // Show loading state while data is being fetched
  }
    console.log(author)
  return (
    <div className="author-page">
      <h1>Author Details</h1>
      <div className="author-details">
        <h2>{author[0].penname}</h2>
        <p><strong>Nationality:</strong> {author[0].nationality}</p>
        <p><strong>Born:</strong> {author[0].date_of_birth}</p>
        {author.date_of_death && <p><strong>Deceased:</strong> {author[0].date_of_death}</p>}
        <p><strong>Biography:</strong> {author[0].biography}</p>

        {/* Optionally, add links to update or delete the author */}
        <div className="author-actions">
          <button className="update">
            <a href={`/update-author/${author.author_id}`}>Update Author</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
