import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaHome } from 'react-icons/fa';
import { fetchSpotDetails } from '../../store/spots';
import './Spotinfo.css';

function Spotinfo() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.currentSpot);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    if (spot && spot.SpotImages && spot.SpotImages.length > 0) {
      setMainImage(spot.SpotImages.find(img => img.preview) || spot.SpotImages[0]);
    }
  }, [spot]);

  if (!spot) return <div>Loading...</div>;

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className="spot-details-container">
      <div className="spot-header">
        <div>
          <h1 className="spot-title">{spot.name}</h1>
          <p className="spot-location">
            {spot.city}, {spot.state}, {spot.country}
          </p>
        </div>
        <div className="spot-rating">
          <FaStar color="#FFD700" />
          <span>{spot.avgStarRating ? spot.avgStarRating.toFixed(1) : 'New'}</span>
        </div>
      </div>

      <div className="spot-images-grid">
        {mainImage && (
          <img 
            src={mainImage.url} 
            alt={spot.name} 
            className="spot-main-image" 
          />
        )}
        <div className="spot-secondary-images">
          {spot.SpotImages && spot.SpotImages.filter(img => img.id !== mainImage?.id).slice(0, 4).map(image => (
            <img
              key={image.id}
              src={image.url}
              alt={`${spot.name} view`}
              className="spot-secondary-image"
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      </div>

      <div className="spot-description">
        <h2>Description</h2>
        <p>{spot.description}</p>
      </div>

      <div className="spot-details">
        <div className="spot-host">
          <h3>Hosted by {spot.Owner?.firstName}</h3>
          <FaHome /> Private room
        </div>
        <div className="spot-price">
          ${spot.price} / night
        </div>
      </div>
    </div>
  );
}

export default Spotinfo;
