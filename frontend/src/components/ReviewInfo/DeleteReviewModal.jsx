import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewsThunk } from "../../store/reviews";
import { readSpotThunk } from "../../store/spots";
import "./DeleteReviewModal.css";

function DeleteReviewModal({ reviewId, spotId, onReviewDeleted }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();

	const handleDelete = async () => {
		try {
			await dispatch(deleteReviewsThunk(reviewId));
			// Refresh spot details to get updated review count and average rating
			if (spotId) {
				await dispatch(readSpotThunk(spotId));
			}
			if (typeof onReviewDeleted === "function") onReviewDeleted();
			closeModal();
		} catch (error) {
			console.error("Error deleting review:", error);
		}
	};

	return (
		<div className="delete-modal">
			<h2>Confirm Delete</h2>
			<p>Are you sure you want to delete this review?</p>
			<div className="delete-modal-buttons">
				<button type="button" className="delete-button" onClick={handleDelete}>
					Yes (Delete Review)
				</button>
				<button type="button" className="cancel-button" onClick={closeModal}>
					No (Keep Review)
				</button>
			</div>
		</div>
	);
}

export default DeleteReviewModal;