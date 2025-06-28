import React from "react";
import { useDispatch } from "react-redux";
import { deleteSpotThunk } from "../store/spots";

// I believe this modal confirms spot deletion with yes/no buttons
const ManageSpotDeleteModal = ({ spotId, onClose, onDeleteSuccess }) => {
  const dispatch = useDispatch();

  // I believe this runs when user confirms delete
  const handleDelete = async () => {
    await dispatch(deleteSpotThunk(spotId));
    onDeleteSuccess(spotId);  // tell parent to remove spot from list
    onClose();                // close the modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot?</p>
        <div className="modal-buttons">
          {/* Red button to confirm deletion */}
          <button className="btn btn-danger" onClick={handleDelete}>
            Yes (Delete Spot)
          </button>
          {/* Dark grey button to cancel */}
          <button className="btn btn-secondary" onClick={onClose}>
            No (Keep Spot)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageSpotDeleteModal;
