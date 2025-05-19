import { useModal } from '../../context/Modal';
import './Spots.css';

function DeleteSpotModal({ spotId, onDelete }) {
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await onDelete(spotId);
  };

  return (
    <div className="delete-modal">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot?</p>
      <div className="delete-buttons">
        <button className="delete-button" onClick={handleDelete}>
          Yes (Delete Spot)
        </button>
        <button className="cancel-button" onClick={() => closeModal()}>
          No (Keep Spot)
        </button>
      </div>
    </div>
  );
}

export default DeleteSpotModal;
