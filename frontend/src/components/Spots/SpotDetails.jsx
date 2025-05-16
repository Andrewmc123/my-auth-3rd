import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Reviews from './Reviews';
import './Spots.css';

function SpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.singleSpot);
  const reviews = useSelector(state => state.reviews.spotReviews[spotId]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchSpot(spotId)).then(() => setIsLoaded(true));
  }, [dispatch, spotId]);

  if (!isLoaded) return <div>Loading...</div>;

  if (!spot) return <div>Spot not found</div>;

  return (
    <div className="spot-details">
      <div className="spot-header">
        <h1>{spot.name}</h1>
        <p>${spot.price} night</p>
      </div>

      <div className="spot-images">
        <img src={spot.previewImage} alt={spot.name} className="spot-main-image" />
      </div>

      <div className="spot-info">
        <div className="spot-location">
          <h2>Location</h2>
          <p>{spot.address}</p>
          <p>{spot.city}, {spot.state}, {spot.country}</p>
        </div>

        <div className="spot-description">
          <h2>Description</h2>
          <p>{spot.description}</p>
        </div>

        <div className="spot-host">
          <h2>Hosted by {spot.Owner?.firstName}</h2>
        </div>
      </div>

      <div className="spot-reviews">
        <Reviews spotId={spotId} />
      </div>
    </div>
  );
}

export default SpotDetails;
