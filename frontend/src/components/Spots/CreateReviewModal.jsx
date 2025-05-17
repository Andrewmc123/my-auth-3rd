import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview } from '../../store/reviews';
import './Spots.css';

function CreateReviewModal() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(5);
  const [errors, setErrors] = useState([]);
  const currentUser = useSelector(state => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const reviewData = {
      review,
      stars,
      userId: currentUser.id,
      spotId: parseInt(spotId)
    };

    try {
      await dispatch(createReview(reviewData));
      setReview('');
      setStars(5);
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      }
    }
  };

  return (
    <div className="review-modal">
      <h2>Write a Review</h2>
      {errors.length > 0 && (
        <div className="errors">
          {errors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="review-rating">
          {[...Array(5)].map((_, i) => (
            <label key={i} className="star-label">
              <input
                type="radio"
                name="stars"
                value={5 - i}
                checked={stars === 5 - i}
                onChange={(e) => setStars(parseInt(e.target.value))}
              />
              <span className="star" role="img" aria-label="star">★</span>
            </label>
          ))}
        </div>

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
          required
          minLength={10}
          maxLength={500}
        />

        <button type="submit" className="submit-review-btn">Submit Review</button>
      </form>
    </div>
  );
}

export default CreateReviewModal;
