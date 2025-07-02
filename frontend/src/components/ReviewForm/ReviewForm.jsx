import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewsThunk } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import './ReviewForm.css';

const ReviewForm = ({ spotId, onReviewCreated }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(5);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const reviewData = {
      review,
      stars
    };

    try {
      const response = await dispatch(createReviewsThunk(spotId, reviewData));
      if (response?.payload?.id) {
        // Refresh the reviews list
        if (onReviewCreated) {
          onReviewCreated();
        }
        closeModal();
      }
    } catch (err) {
      setError('Failed to create review. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h2>Post a Review</h2>
      {error && <p className="error">{error}</p>}
      <div className="form-group">
        <label>Rating:</label>
        <select 
          value={stars} 
          onChange={(e) => setStars(e.target.value)}
          required
        >
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
      </div>
      <div className="form-group">
        <label>Review:</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
          required
          minLength="10"
        />
      </div>
      <button type="submit" className="create-spot-btn">Post Review</button>
    </form>
  );
};

export default ReviewForm;
