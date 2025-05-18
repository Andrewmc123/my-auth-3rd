import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReview } from '../../store/reviews';
import './Spots.css';

function DeleteReviewModal({ reviewId, spotId, onDelete }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(deleteReview(reviewId));
    onDelete();
    closeModal();
  };

  return (
    <div className="delete-modal">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <div className="delete-buttons">
        <button className="delete-button" onClick={handleDelete}>
          Yes (Delete Review)
        </button>
        <button className="cancel-button" onClick={closeModal}>
          No (Keep Review)
        </button>
      </div>
    </div>
  );
}

export default DeleteReviewModal;
