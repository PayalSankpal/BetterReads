import express from "express";
import db from './db.js'
import authenticateToken from "./authMiddleware.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Route to get all books with their genres
router.get("/", authenticateToken, (req, res) => {
    const q = `
        SELECT books.book_id, books.title, books.context, books.image, books.price, genres.genre_name
        FROM books
        LEFT JOIN book_genre ON books.book_id = book_genre.book_id
        LEFT JOIN genres ON book_genre.genre_id = genres.genre_id
    `;

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        // Group by book_id to organize multiple genres per book
        const books = data.reduce((acc, row) => {
            const { book_id, title, context, image, price, genre_name } = row;

            if (!acc[book_id]) {
                acc[book_id] = { book_id, title, context, image, price, genres: [] };
            }
            if (genre_name) acc[book_id].genres.push(genre_name);

            return acc;
        }, {});

        return res.json(Object.values(books));
    });
});

// Route to get a specific book with its genre(s)
router.get("/:id", authenticateToken, (req, res) => {
    const bookId = req.params.id;
    const q = `
        SELECT books.book_id, books.title, books.context, books.image, books.price, genres.genre_name
        FROM books
        LEFT JOIN book_genre ON books.book_id = book_genre.book_id
        LEFT JOIN genres ON book_genre.genre_id = genres.genre_id
        WHERE books.book_id = ?
    `;

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("Book not found");

        // Collect book details and list of genres
        const { book_id, title, context, image, price } = data[0];
        const genres = data.map(row => row.genre_name).filter(genre => genre); // Filter out null genres

        return res.json({ book_id, title, context, image, price, genres });
    });
});


router.post("/", authenticateToken, (req, res) => {

    const { title, context, image, price, genre, author } = req.body;

    const authorId = parseInt(author, 10); 

    // Step 1: Insert book into `books` table
    const insertBookQuery = "INSERT INTO books (`title`, `context`, `image`, `price`, `author_id`) VALUES (?)";
    const bookValues = [title, context, image, price, authorId];

    db.query(insertBookQuery, [bookValues], (err, bookResult) => {
        if (err) return res.json(err);

        const bookId = bookResult.insertId;

        // Step 2: Get `genre_id` from `genres` table based on `genre_name`
        const getGenreQuery = "SELECT genre_id FROM genres WHERE genre_name = ?";
        db.query(getGenreQuery, [genre], (err, genreResult) => {
            if (err) return res.json(err);
            if (genreResult.length === 0) return res.status(404).json("Genre not found");

            const genreId = genreResult[0].genre_id;

            // Step 3: Insert into `book_genre` table
            const insertGenreBookQuery = "INSERT INTO book_genre (`book_id`, `genre_id`) VALUES (?, ?)";
            db.query(insertGenreBookQuery, [bookId, genreId], (err, genreBookResult) => {
                if (err) return res.json(err);
                return res.json("Book and genre relationship added successfully!");
            });
        });
    });
});



router.delete("/:id", authenticateToken, (req, res)=> {
    const bookId = req.params.id;
    console.log(bookId);
    const q = "DELETE FROM books WHERE book_id=(?)"

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book deleted successfully!");
    });
})

router.put("/:id", authenticateToken, (req, res) => {
    const bookId = req.params.id;

    // Step 1: Query to fetch the existing book data
    const fetchBookQuery = `
        SELECT books.*, genres.genre_name 
        FROM books 
        LEFT JOIN book_genre ON books.book_id = book_genre.book_id
        LEFT JOIN genres ON book_genre.genre_id = genres.genre_id 
        WHERE books.book_id = ?
    `;

    db.query(fetchBookQuery, [bookId], (err, results) => {
        if (err) return res.json(err);

        // Check if the book exists
        if (results.length === 0) return res.json("Book not found!");

        // Merge existing values with provided values (if any)
        const existingBook = results[0];
        const updatedValues = {
            title: req.body.title || existingBook.title,
            context: req.body.context || existingBook.context,
            image: req.body.image || existingBook.image,
            price: req.body.price || existingBook.price
        };
        const newGenreName = req.body.genre;

        // Step 2: Update the book with the merged values
        const updateBookQuery = `
            UPDATE books 
            SET title = ?, context = ?, image = ?, price = ? 
            WHERE book_id = ?
        `;
        const bookValues = [
            updatedValues.title,
            updatedValues.context,
            updatedValues.image,
            updatedValues.price,
            bookId
        ];

        db.query(updateBookQuery, bookValues, (err) => {
            if (err) return res.json(err);

            // Step 3: If a new genre_name is provided, update the genre in book_genre
            if (newGenreName) {
                // Find the genre_id for the new genre_name
                const fetchGenreQuery = "SELECT genre_id FROM genres WHERE genre_name = ?";
                
                db.query(fetchGenreQuery, [newGenreName], (err, genreResults) => {
                    if (err) return res.json(err);
                    if (genreResults.length === 0) return res.status(404).json("Genre not found!");

                    const genreId = genreResults[0].genre_id;

                    // Update book_genre table with the new genre_id for the book
                    const updateGenreBookQuery = `
                        INSERT INTO book_genre (book_id, genre_id) 
                        VALUES (?, ?)
                        ON DUPLICATE KEY UPDATE genre_id = VALUES(genre_id)
                    `;
                    
                    db.query(updateGenreBookQuery, [bookId, genreId], (err) => {
                        if (err) return res.json(err);
                        return res.json("Book and genre updated successfully!");
                    });
                });
            } else {
                // If no genre update is needed
                return res.json("Book updated successfully without genre change.");
            }
        });
    });
});



export default router;