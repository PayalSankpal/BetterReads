import express from "express";
import db from './db.js'
import authenticateToken from "./authMiddleware.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();


router.get("/:id", authenticateToken,(req, res)=> {
    const bookId = req.params.id;
    const q = "select * FROM reviews WHERE book_id=(?)"

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

router.post("/", authenticateToken, (req, res) => {
    const q = "INSERT INTO reviews (`rating`, `comment`, `date`, `book_id`, `user_id`) VALUES (?)";

    const authenticatedUserId = req.user.userId;
    // Get today's date in 'YYYY-MM-DD' format
    const today = new Date().toISOString().slice(0, 10);

    // Add today's date to the values array
    const values = [
        req.body.rating,
        req.body.comment,
        today,         // Use today's date here
        req.body.book_id,
        authenticatedUserId,
    ];

    console.log(req.body);
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Review added successfully!");
    });
});

router.delete("/:id",authenticateToken, (req, res)=> {
    const reviewId = req.params.id;
    const q = "DELETE FROM reviews WHERE review_id=(?)"

    db.query(q, [reviewId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Review deleted successfully!");
    });
})

router.put("/:id",authenticateToken, (req, res) => {
    const reviewId = req.params.id;

    // Query to fetch the existing review data
    const fetchQuery = "SELECT * FROM reviews WHERE review_id = ?";
    db.query(fetchQuery, [reviewId], (err, results) => {
        if (err) return res.json(err);
        
        // Check if the review exists
        if (results.length === 0) return res.json("Review not found!");

        // Merge existing values with provided values (if any)
        const existingReview = results[0];
        const updatedValues = {
            rating: req.body.rating || existingReview.rating,
            comment: req.body.comment || existingReview.comment,
            date: req.body.date || existingReview.date,
            book_id: req.body.book_id || existingReview.book_id,
            user_id: req.body.user_id || existingReview.user_id
        };

        // Query to update the review with the merged values
        const updateQuery = "UPDATE reviews SET `rating` = ?, `comment` = ?, `date` = ?, `book_id` = ?, `user_id` = ? WHERE review_id = ?";
        const values = [updatedValues.rating, updatedValues.comment, updatedValues.date, updatedValues.book_id, updatedValues.user_id, reviewId];

        db.query(updateQuery, values, (err, data) => {
            if (err) return res.json(err);
            return res.json("Review has been updated successfully!");
        });
    });
});

export default router;