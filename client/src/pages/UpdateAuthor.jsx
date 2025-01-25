import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateAuthor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authorId = location.pathname.split('/')[2];

  const [author, setAuthor] = useState({
    penname: "",
    nationality: "",
    date_of_birth: "",
    date_of_death: "",
    biography: "",
  });

  useEffect(() => {
    // Fetch the current author's details when the component mounts
    const fetchAuthorDetails = async () => {
      try {
        // Retrieve the token from localStorage
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

        setAuthor(response.data);
      } catch (err) {
        console.error("Error fetching author details:", err);
      }
    };

    fetchAuthorDetails();
  }, [authorId]);

  const handleChange = (e) => {
    setAuthor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token); // Log token to verify

      if (!token) {
        console.log("No token found.");
        return; // Exit if token is not found
      }

      // Assuming the user_id is stored in localStorage (or you can retrieve it from elsewhere)
      const userId = localStorage.getItem("userId");
      if (userId) {
        setAuthor((prev) => ({ ...prev, user_id: userId }));
      }

      // Send the request with Authorization header
      const response = await axios.put(`http://localhost:8000/api/authors/${authorId}`, author, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Author updated successfully:", response);
      navigate(`/authors`); // Redirect to the author's detail page or another route
    } catch (err) {
      console.error("Error updating author:", err);
    }
  };

  return (
    <div className="update-book-container">
  <h1 className="update-book-heading">Update Author</h1>
  <div className="update-form">
    <div className="form-group">
      <label className="form-label" htmlFor="penname">Penname</label>
      <input
        type="text"
        id="penname"
        placeholder="Penname"
        name="penname"
        value={author.penname}
        className="update-input"
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label className="form-label" htmlFor="nationality">Nationality</label>
      <input
        type="text"
        id="nationality"
        placeholder="Nationality"
        name="nationality"
        value={author.nationality}
        className="update-input"
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label className="form-label" htmlFor="date_of_birth">Date of Birth</label>
      <input
        type="date"
        id="date_of_birth"
        placeholder="Date of Birth"
        name="date_of_birth"
        value={author.date_of_birth}
        className="update-input"
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label className="form-label" htmlFor="date_of_death">Date of Death</label>
      <input
        type="date"
        id="date_of_death"
        placeholder="Date of Death"
        name="date_of_death"
        value={author.date_of_death}
        className="update-input"
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label className="form-label" htmlFor="biography">Biography</label>
      <input
        type="text"
        id="biography"
        placeholder="Biography"
        name="biography"
        value={author.biography}
        className="update-input"
        onChange={handleChange}
      />
    </div>
  </div>
  <button className="update-button" onClick={handleClick}>
    Update Author
  </button>
</div>

  );
};

export default UpdateAuthor;
