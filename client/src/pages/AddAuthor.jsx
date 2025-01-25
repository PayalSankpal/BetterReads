import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAuthor = () => {
  const navigate = useNavigate();

  const [author, setAuthor] = useState({
    penname: null,
    nationality: null,
    date_of_birth: null,
    date_of_death: null,
    biography: null,
  });

  const handleChange = (e) => {
    setAuthor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent form submission if this is inside a form

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
      const response = await axios.post("http://localhost:8000/api/authors", author, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Author added successfully:", response);
      navigate("/authors"); // Redirect to authors list page or another appropriate route
    } catch (err) {
      console.error("Error adding author:", err);
    }
  };

  return (
    <div>
      <h1>Add New Author</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Penname"
          onChange={handleChange}
          name="penname"
        />
        <input
          type="text"
          placeholder="Nationality"
          onChange={handleChange}
          name="nationality"
        />
        <input
          type="date"
          placeholder="Date of Birth"
          onChange={handleChange}
          name="date_of_birth"
        />
        <input
          type="date"
          placeholder="Date of Death"
          onChange={handleChange}
          name="date_of_death"
        />
        <input
          type="text"
          placeholder="Biography"
          onChange={handleChange}
          name="biography"
        />
      </div>
      <button className="formButton" onClick={handleClick}>
        Add Author
      </button>
    </div>
  );
};

export default AddAuthor;
