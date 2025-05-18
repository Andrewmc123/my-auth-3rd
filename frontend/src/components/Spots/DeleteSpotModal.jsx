import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './Spots.css';

function DeleteSpotModal({ spotId, onDelete }) {
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);

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
        <button className="cancel-button" onClick={() => setShowConfirmation(false)}>
          No (Keep Spot)
        </button>
      </div>
    </div>
  );
}

export default DeleteSpotModal;
