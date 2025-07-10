import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import "./DeleteSpotModal.css";

function DeleteSpotModal({ spotId }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();

	const handleDelete = async () => {
		try {
			await dispatch(deleteSpotThunk(spotId));
			closeModal();
		} catch (error) {
			console.error("Error deleting spot:", error);
		}
	};

	return (
		<div className="delete-modal">
			<h2>Confirm Delete</h2>
			<p>Are you sure you want to delete this spot?</p>
			<div className="delete-modal-buttons">
				<button type="button" className="delete-button" onClick={handleDelete}>
					Yes (Delete Spot)
				</button>
				<button type="button" className="cancel-button" onClick={closeModal}>
					No (Keep Spot)
				</button>
			</div>
		</div>
	);
}

export default DeleteSpotModal;
