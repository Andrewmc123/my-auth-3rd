import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readCurrentUserReviewsThunk, deleteReviewsThunk } from '../../store/reviews';
import { useNavigate } from 'react-router-dom';
import './ManageReviewsPage.css';

const ManageReviewsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reviews = Object.values(useSelector(state => state.reviews));
  const currUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (currUser) {
      dispatch(readCurrentUserReviewsThunk());
    }
  }, [dispatch, currUser]);

  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await dispatch(deleteReviewsThunk(reviewId));
    }
  };

  return (
    <div className="manage-reviews-container">
      <h2>Manage Your Reviews</h2>
      {reviews.length === 0 ? (
        <p>You haven&apos;t posted any reviews yet.</p>
      ) : (
        <ul className="reviews-list">
          {reviews.map(review => (
            <li key={review.id} className="review-card">
              <h3>{review.Spot?.name || "Unnamed Spot"}</h3>
              <p><strong>Review:</strong> {review.review}</p>
              <p><strong>Stars:</strong> {review.stars}</p>
              <p><strong>Date:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>
              <div className="review-buttons">
                <button onClick={() => handleDelete(review.id)}>Delete</button>
                <button onClick={() => navigate(`/spots/${review.spotId}`)}>View Spot</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageReviewsPage;
