import express from "express";
import db from './db.js'
import authenticateToken from "./authMiddleware.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/status/:status", authenticateToken, (req, res) => {
    const status = req.params.status;

    const authenticatedUserId = req.user.userId;
    // Validate the status
    const validStatuses = ["to be read", "read", "reading"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json("Invalid status provided.");
    }
    const q = "SELECT * FROM shelves WHERE status = ? and user_id = ?";
    db.query(q, [status, authenticatedUserId], (err, data) => {
        if (err) return res.json(err);

        // If no data is found, send a more descriptive message
        if (data.length === 0) {
            return res.status(404).json({ message: "No books found with this status for the user." });
        }

        return res.json(data); // Return the data (books/shelves)
    });
});



router.post("/:book_id",authenticateToken, (req, res) => {
    const { book_id } = req.params;
    const { status } = req.body;
    const user_id  = req.user.userId;

    // Validate the status
    const validStatuses = ["to be read", "read", "reading"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json("Invalid status provided.");
    }

    const addedDate = new Date().toISOString().split('T')[0];  // Get today's date in 'YYYY-MM-DD' format

    const q = "INSERT INTO shelves (`status`, `added_date`, `book_id`, `user_id`) VALUES (?, ?, ?, ?)";
    const values = [status, addedDate, book_id, user_id];

    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("Book added to shelf successfully!");
    });
});

router.delete("/:book_id", authenticateToken, (req, res) => {
    const { book_id } = req.params;
    const user_id  = req.user.userId;

    const q = "DELETE FROM shelves WHERE book_id = ? AND user_id = ?";
    db.query(q, [book_id, user_id], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) {
            return res.status(404).json("No book found with the specified id and user.");
        }
        return res.json("Book deleted from shelf successfully!");
    });
});

router.put("/:book_id", authenticateToken, (req, res) => {
    const { book_id } = req.params;
    const { status } = req.body;
    const user_id  = req.user.userId;

    // Validate the status
    const validStatuses = ["to be read", "read", "reading"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json("Invalid status provided.");
    }

    const q = "UPDATE shelves SET status = ? WHERE book_id = ? AND user_id = ?";
    const values = [status, book_id, user_id];

    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) {
            return res.status(404).json("No book found with the specified id and user.");
        }
        return res.json("Book status updated successfully!");
    });
});



export default router;