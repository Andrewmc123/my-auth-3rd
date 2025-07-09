import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReviewsThunk } from '../../store/reviews';
import './DeleteReviewModal.css';

function DeleteReviewModal({ reviewId, onReviewDeleted }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    try {
      await dispatch(deleteReviewsThunk(reviewId));
      if (typeof onReviewDeleted === 'function') onReviewDeleted();
      closeModal();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="delete-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <div className="delete-modal-buttons">
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
