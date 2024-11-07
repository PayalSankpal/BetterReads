const express = require("express");
const router = express.Router();
const db = require("../db"); // Adjust this path to your DB connection setup
const authenticateToken = require("../middleware/authenticateToken");

// Route to get genre_id by genre_name
router.get("/id/:genreName", authenticateToken, (req, res) => {
    const q = "SELECT genre_id FROM genres WHERE genre_name = ?";
    db.query(q, [req.params.genreName], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("Genre not found");
        return res.json({ genre_id: data[0].genre_id });
    });
});

// Route to get genre_name by genre_id
router.get("/name/:genreId", authenticateToken, (req, res) => {
    const q = "SELECT genre_name FROM genres WHERE genre_id = ?";
    db.query(q, [req.params.genreId], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("Genre not found");
        return res.json({ genre_name: data[0].genre_name });
    });
});

module.exports = router;
