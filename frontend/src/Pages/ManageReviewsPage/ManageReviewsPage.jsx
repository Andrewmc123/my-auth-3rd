import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readCurrentUserReviewsThunk, deleteReviewsThunk } from '../../store/reviews';
import { useNavigate } from 'react-router-dom';
import './ManageReviewsPage.css';

// I believe this is setting up the page that lets the user manage their own reviews
const ManageReviewsPage = () => {

  // This is getting the dispatch function so we can run Redux actions
  const dispatch = useDispatch();

  // I believe this helps us move to other pages like spot detail pages
  const navigate = useNavigate();

  // This is getting all the user's reviews from the Redux store and turning them into an array
  const reviews = Object.values(useSelector(state => state.reviews));

  // I believe this is getting the current logged-in user from the store
  const currUser = useSelector(state => state.session.user);

  // This is doing the work of loading the current user's reviews when the page runs
  useEffect(() => {
    if (currUser) {
      dispatch(readCurrentUserReviewsThunk());
    }
  }, [dispatch, currUser]);

  // I believe this function deletes a review when the user confirms the action
  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await dispatch(deleteReviewsThunk(reviewId));
    }
  };

  // This is doing the rendering of the reviews list or a message if there are none
  return (
    <div className="manage-reviews-container">
      <h2>Manage Your Reviews</h2>
      
      {/* I believe this shows a message if the user has no reviews */}
      {reviews.length === 0 ? (
        <p>You haven&apos;t posted any reviews yet.</p>
      ) : (
        <>
          {/* This is doing the loop to show each review in a styled card */}
          <ul className="reviews-list">
            {reviews.map(review => (
              <li key={review.id} className="review-card">
                <h3>{review.Spot?.name || "Unnamed Spot"}</h3>
                <p><strong>Review:</strong> {review.review}</p>
                <p><strong>Stars:</strong> {review.stars}</p>
                <p><strong>Date:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>

                {/* I believe this shows the delete and view buttons for each review */}
                <div className="review-buttons">
                  <button onClick={() => handleDelete(review.id)}>Delete</button>
                  <button onClick={() => navigate(`/spots/${review.spotId}`)}>View Spot</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

// I believe this lets other files use the ManageReviewsPage component
export default ManageReviewsPage;
