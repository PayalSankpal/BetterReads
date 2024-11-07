import express from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db.js';

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
    db.query(sql, [username, email, passwordHash], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

// User login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Create a JWT token
        const token = jwt.sign({ userId: user.users_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

export default router;
