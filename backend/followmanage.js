import express from "express";
import db from './db.js'
import authenticateToken from "./authMiddleware.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();


// Route to get all followers of a specific user (with user details)
router.get("/:userId/followers", authenticateToken, (req, res) => {
    const userId = req.params.userId;
    const q = `
        SELECT u.users_id, u.username, u.profile_picture_url, u.bio
        FROM followers f
        JOIN users u ON f.follower_id = u.users_id
        WHERE f.follows_id = ?
    `;
    db.query(q, [userId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data); // Return full details of followers
    });
});

// Route to get all users that a specific user is following (with user details)
router.get("/:userId/following", authenticateToken, (req, res) => {
    const userId = req.params.userId;
    const q = `
        SELECT u.users_id, u.username, u.profile_picture_url, u.bio
        FROM followers f
        JOIN users u ON f.follows_id = u.users_id
        WHERE f.follower_id = ?
    `;
    db.query(q, [userId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data); // Return full details of following users
    });
});


// Route to add a follower
router.post("/", authenticateToken, (req, res) => {
    console.log(req.body)
    const {user_id} = req.body
    const follower_id = req.user.userId;
    const followDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    
    const q = "INSERT INTO followers (follower_id, follows_id, follow_date) VALUES (?, ?, ?)";
    db.query(q, [follower_id, user_id, followDate], (err, data) => {
        if (err) return res.json(err);
        return res.json("Followed successfully!");
    });
});

export default router;
