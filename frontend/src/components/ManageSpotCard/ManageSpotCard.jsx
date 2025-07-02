import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ManageSpotDeleteModal from "../ManageSpotDeleteModal";
import ReviewForm from "../ReviewForm/ReviewForm";
import { FaStar } from "react-icons/fa";
import "./ManageSpotCard.css";

const ManageSpotCard = ({spot}) => {
    const navigate = useNavigate();
    const { setModalContent, setOnModalClose } = useModal();
    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = () => {
        navigate(`/spots/${spot.id}`);
    };

    const handleUpdateClick = (e) => {
        e.stopPropagation();
        navigate(`/spots/${spot.id}/edit`);
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
        setModalContent(<ManageSpotDeleteModal spotId={spot.id} />);
        setOnModalClose(() => {
            setModalContent(null);
        });
    };

    return (
        <div
            className="manage-spot-card"
            onClick={handleClick}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{ cursor: 'pointer' }}
        >
            <div className="image-wrapper">
              <img
                src={spot.previewImage}
                alt={spot.name}
                className="spot-image"
              />
              {showTooltip && <div className="tooltip">{spot.name}</div>}
            </div>

            <div className="spot-details">
<span className="top-line">

              <span>{spot.city}, {spot.state}</span>
              <span className="stars">
                    <FaStar />
                    {spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}
                </span>
</span>

              <p>${spot.price} / night</p>

            </div>
            <div className="spot-buttons">
                <div>
                    <button onClick={handleUpdateClick}>
                        Update
                    </button>
                </div>
                <div>
                  <OpenModalButton
                    buttonText="Review"
                    modalComponent={<ReviewForm spotId={spot.id} />}
                  />
                </div>
                <div onClick={handleModalClick}>
                    <OpenModalButton
                      buttonText="Delete"
                      modalComponent={<ManageSpotDeleteModal spotId={spot.id} />}
                    />
                </div>
            </div>
          </div>
        )
}
export default ManageSpotCard;