import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({});
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        if (user && user[0]) {
          const fetchFollowData = async () => {
            try {
              const token = localStorage.getItem("token");
              const userId = user[0].users_id;
    
              // Fetch followers of the user
              const followersRes = await axios.get(`http://localhost:8000/api/follow/${userId}/followers`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
    
              // Fetch users the user is following
              const followingRes = await axios.get(`http://localhost:8000/api/follow/${userId}/following`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
    
              // Set state with the fetched data
              setFollowers(followersRes.data);
              setFollowing(followingRes.data);
            } catch (err) {
              console.log("Error fetching follow data:", err);
            }
          };
    
          fetchFollowData();
        }
      }, [user]);

    useEffect(() => {
        const fetchUser = async ()=>{
            try{
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:8000/api/users/specific",{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(res.data);
                setUser(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchUser();
    }, []);

    return (
        <div className="profile-container">
            <h2 className="profile-heading">User Profile</h2>

            {/* Check if user data is available */}
            {user && user[0] ? (
                <div className="profile-content">
                {/* Display profile picture if available */}
                {user[0].profilePicture && (
                    <img
                    src={user[0].profile_picture_url}
                    alt={`${user[0].username}'s profile`}
                    className="profile-picture"
                    />
                )}

                <div className="profile-details">
                    <p><strong>Username:</strong> {user[0].username}</p>
                    <p><strong>Email:</strong> {user[0].email}</p>
                    <p><strong>Bio:</strong> {user[0].bio}</p>
                    <button className="update-profile-btn">
                    <Link to={`/update_profile/${user[0].users_id}`} className="update-link">Update Profile</Link>
                    </button>
                </div>

                {/* Display Followers */}
                <div className="followers-section">
                    <h3>Followers</h3>
                    {followers.length > 0 ? (
                    <ul className="followers-list">
                        {followers.map(follower => (
                        <li key={follower.user_id} className="follower-item">
                            <img
                            src={follower.profile_picture_url}
                            alt={follower.username}
                            className="follower-picture"
                            />
                            <p className="follower-name">{follower.username}</p>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p>No followers yet.</p>
                    )}
                </div>

                {/* Display Following */}
                <div className="following-section">
                    <h3>Following</h3>
                    {following.length > 0 ? (
                    <ul className="following-list">
                        {following.map(followed => (
                        <li key={followed.user_id} className="following-item">
                            <img
                            src={followed.profile_picture_url}
                            alt={followed.username}
                            className="following-picture"
                            />
                            <p className="following-name">{followed.username}</p>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p>Not following anyone yet.</p>
                    )}
                </div>
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
            </div>

    );
    
};

export default Profile;
