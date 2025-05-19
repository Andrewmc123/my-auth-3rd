import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import './Spots.css';

function Reviews({ spotId }) {
  const reviews = useSelector(state => state.reviews.spotReviews[spotId] || []);
  const currentUser = useSelector(state => state.session.user);


  const calculateAverageRating = () => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, review) => sum + review.stars, 0);
    return (total / reviews.length).toFixed(1);
  };

  const handleDeleteReview = () => {
    // TODO: Implement review deletion logic
  };



  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h2>Reviews</h2>
        <div className="reviews-stats">
          <div className="average-rating">
            <span className="rating-number">{calculateAverageRating()}</span>
            <span className="rating-text">{reviews.length} Reviews</span>
          </div>
        </div>
      </div>

      <div className="review-list">
        {reviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <h3>{review.User.firstName}</h3>
              <div className="review-rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < review.stars ? 'filled' : ''}`}>
                    ★
                  </span>
                ))}
              </div>
              {currentUser?.id === review.userId && (
                <button
                  className="delete-review-button"
                  onClick={() => handleDeleteReview(review)}
                >
                  Delete
                </button>
              )}
            </div>
            <p className="review-text">{review.review}</p>
            <div className="review-date">
              {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {currentUser && (
        <div className="write-review">
          <OpenModalButton
            buttonText="Write a Review"
          />
        </div>
      )}
    </div>
  );
}

export default Reviews;
