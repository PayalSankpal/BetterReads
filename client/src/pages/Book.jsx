import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const SingleBookView = () => {
    const location = useLocation();
    const book_id = location.pathname.split('/')[2];
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch the book details
        const fetchBookDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:8000/api/books/${book_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBook(res.data);
            } catch (err) {
                console.error("Error fetching book details:", err);
            }
        };
       
        // Fetch the reviews
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:8000/api/reviews/${book_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(res.data);
                setReviews(res.data);
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        };

        fetchBookDetails();
        fetchReviews();
    }, [book_id]);
    
    return (
        <div className="single-book-view">
            {book ? (
                <div className="book-details">
                    <div className="book-image">
                        {book.image && <img src={book.image} alt={book.title} />}
                    </div>
                    <div className="book-info">
                        <h1>{book.title}</h1>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Description:</strong> {book.context}</p>
                        <p><strong>Price:</strong> ${book.price}</p>
                        <button className="add-review-btn"><Link to={`/review/${book.book_id}`} >Add Review</Link></button>
                    </div>
                </div>
            ) : (
                <p>Loading book details...</p>
            )}

            <div className="book-reviews">
                <h2>Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.review_id} className="review">
                            <p><strong>{review.rating}</strong>: {review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to review!</p>
                )}
            </div>
        </div>
    );
};

export default SingleBookView;
