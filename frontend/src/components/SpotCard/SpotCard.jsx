import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './SpotCard.css';

function SpotCard({ spot }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/spots/${spot.id}`);
  };

  return (
    <div className="spot-card" onClick={handleCardClick}>
      <img 
        src={spot.previewImage} 
        alt={spot.name} 
        className="spot-card-image" 
      />
      <div className="spot-card-details">
        <div className="spot-card-header">
          <div className="spot-card-location">
            {spot.city}, {spot.state}
          </div>
          <div className="spot-card-rating">
            <FaStar color="#FFD700" />
            {spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}
          </div>
        </div>
        <div className="spot-card-price">
          ${spot.price} 
          <span className="spot-card-price-night"> night</span>
        </div>
      </div>
    </div>
  );
}

export default SpotCard;
