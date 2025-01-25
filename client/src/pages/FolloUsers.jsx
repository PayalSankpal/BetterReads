import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

const FollowUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");

        // Make the GET request with the Authorization header
        const res = await axios.get("http://localhost:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Log the response data and set it to the state
        console.log(res.data);
        setUsers(res.data);
      } catch (err) {
        console.log("Fetch users error:", err);
      }
    };

    fetchAllUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
    console.log(userId)
      // Get token from localStorage
      const token = localStorage.getItem("token");

      // Make the POST request to follow the user
      const res = await axios.post(
        "http://localhost:8000/api/follow", 
        { user_id: userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` // Pass token in headers
          }
        }
      );

      console.log("Followed successfully:", res.data);
    } catch (err) {
      console.log("Error following user:", err);
    }
  };

  return (
    <div>
      <h1 className="text-center my-4">Follow Users</h1>
          {users.map((user) => (
              <Card className="h-100 shadow-sm border-0 m-2">
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title className="mb-2 ">{user.username}</Card.Title>
                  <Button 
                    variant="primary" 
                    className="mt-auto" 
                    onClick={() => handleFollow(user.users_id)}
                  >
                    Follow
                  </Button>
                </Card.Body>
              </Card>
          ))}

    </div>
  );
};

export default FollowUsersPage;
