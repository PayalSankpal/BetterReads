import express from "express";
import db from './db.js'
import authenticateToken from "./authMiddleware.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", authenticateToken, (req, res)=>{
    const q = "select * from users";
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


router.get("/specific",authenticateToken, (req, res)=> {
    const authenticatedUserId = req.user.userId;
    const q = "select * FROM users WHERE users_id=(?)"
    db.query(q, [authenticatedUserId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

router.put("/:id", (req, res) => {

    
    console.log(req.body)

    const userId = req.params.id;
    console.log(req.params)
    // Query to fetch the existing user data
    const fetchQuery = "SELECT * FROM users WHERE users_id = ?";
    db.query(fetchQuery, [userId], (err, results) => {
        if (err) return res.json(err);
        
        // Check if the user exists
        if (results.length === 0) return res.json("User not found!");

        // Merge existing values with provided values (if any)
        const existingUser = results[0];
        const updatedValues = {
            username: req.body.username !== undefined ? req.body.username : existingUser.username,
            email: req.body.email !== undefined ? req.body.email : existingUser.email,
            password_hash: req.body.password_hash !== undefined ? req.body.password_hash : existingUser.password_hash,
            profile_picture_url: req.body.profile_picture_url !== undefined ? req.body.profile_picture_url : existingUser.profile_picture_url,
            bio: req.body.bio !== undefined ? req.body.bio : existingUser.bio
        };

        console.log(updatedValues)
        
        // Query to update the user with the merged values
        const updateQuery = "UPDATE users SET `username` = ?, `email` = ?, `password_hash` = ?, `profile_picture_url` = ?, `bio` = ? WHERE users_id = ?";
        const values = [updatedValues.username, updatedValues.email, updatedValues.password_hash, updatedValues.profile_picture_url, updatedValues.bio, userId];

        db.query(updateQuery, values, (err, data) => {
            if (err) return res.json(err);
            return res.json("User profile has been updated successfully!");
        });
    });
});


export default router;