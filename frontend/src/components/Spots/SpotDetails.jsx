import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpot } from '../../store/spots';
import Reviews from './Reviews';
import './Spots.css';

function SpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.singleSpot);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchSpot(spotId)).then(() => setIsLoaded(true));
  }, [dispatch, spotId]);

  if (!isLoaded) return <div className="loading">Loading...</div>;

  if (!spot) return <div className="error">Spot not found</div>;

  return (
    <div className="spot-details">
      <div className="spot-header">
        <h1 className="spot-title">{spot.name}</h1>
        <div className="spot-price">${spot.price} per night</div>
      </div>

      <div className="spot-images">
        <img 
          src={spot.previewImage} 
          alt={spot.name} 
          className="spot-main-image"
        />
      </div>

      <div className="spot-info">
        <div className="spot-location">
          <h2 className="spot-subtitle">Location</h2>
          <p>{spot.address}</p>
          <p>{spot.city}, {spot.state}, {spot.country}</p>
        </div>

        <div className="spot-description">
          <h2 className="spot-subtitle">Description</h2>
          <p>{spot.description}</p>
        </div>

        <div className="spot-host">
          <h2 className="spot-subtitle">Hosted by {spot.Owner?.firstName}</h2>
          <p className="spot-host-info">{spot.Owner?.firstName} {spot.Owner?.lastName}</p>
        </div>
      </div>

      <div className="spot-reviews">
        <h2 className="spot-subtitle">Reviews</h2>
        <Reviews spotId={spotId} />
      </div>

      <div className="booking-section">
        <button className="btn-primary">Reserve Now</button>
      </div>
    </div>
  );
}

export default SpotDetails;
