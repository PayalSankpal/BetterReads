import express from "express";
import db from './db.js'
import authenticateToken from "./authMiddleware.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", authenticateToken,(req, res)=>{
    const q = "select * from authors";
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

router.get("/:id", authenticateToken,(req, res)=> {
    const authorId = req.params.id;
    const q = "select * FROM authors WHERE author_id=(?)"
    console.log(authorId)
    db.query(q, [authorId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})


router.post("/", authenticateToken, (req, res) => {
    const q = "INSERT INTO authors (`penname`, `nationality`, `date_of_birth`, `date_of_death`, `biography` ) VALUES (?)";
    const values = [req.body.penname, req.body.nationality, req.body.date_of_birth, req.body.date_of_death, req.body.biography];
    console.log(req.body)
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Author added successfully!");
    });
});

router.delete("/:id", authenticateToken,(req, res)=> {
    const authorId = req.params.id;
    const q = "DELETE FROM authors WHERE author_id=(?)"

    db.query(q, [authorId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Author deleted successfully!");
    });
})

router.put("/:id", authenticateToken,(req, res) => {
    const authorId = req.params.id;

    // Query to fetch the existing review data
    const fetchQuery = "SELECT * FROM authors WHERE author_id = ?";
    db.query(fetchQuery, [authorId], (err, results) => {
        if (err) return res.json(err);
        
        // Check if the review exists
        if (results.length === 0) return res.json("Author not found!");

        // Merge existing values with provided values (if any)
        const existingAuthor = results[0];
        const updatedValues = {
            penname: req.body.penname !== undefined ? req.body.penname : existingAuthor.penname,
            nationality: req.body.nationality !== undefined ? req.body.nationality : existingAuthor.nationality,
            date_of_birth: req.body.date_of_birth !== undefined ? req.body.date_of_birth : existingAuthor.date_of_birth,
            date_of_death: req.body.date_of_death !== undefined ? req.body.date_of_death : existingAuthor.date_of_death,
            biography: req.body.biography !== undefined ? req.body.biography : existingAuthor.biography,
            user_id: req.body.user_id !== undefined ? req.body.user_id : existingAuthor.user_id
        };

        // Query to update the Author with the merged values
        const updateQuery = "UPDATE authors SET `penname` = ?, `nationality` = ?, `date_of_birth` = ?, `date_of_death` = ?, `biography` = ?, `user_id` = ? WHERE author_id = ?";
        const values = [updatedValues.penname, updatedValues.nationality, updatedValues.date_of_birth, updatedValues.date_of_death, updatedValues.biography ,updatedValues.user_id,  authorId];

        db.query(updateQuery, values, (err, data) => {
            if (err) return res.json(err);
            return res.json("Author has been updated successfully!");
        });
    });
});


export default router;