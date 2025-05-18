import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import '../../styles/Spots.css';

function Spots() {
  const dispatch = useDispatch();
  const { allSpots, loading, error } = useSelector(state => state.spots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  if (loading) return <div className="loading">Loading spots...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="spots-container">
      <h2>Available Spots</h2>
      <div className="spots-grid">
        {Object.values(allSpots).map(spot => (
          <div key={spot.id} className="spot-card">
            <img 
              src={spot.previewImage} 
              alt={spot.name} 
              className="spot-image"
            />
            <div className="spot-info">
              <h3>{spot.name}</h3>
              <p>{spot.city}, {spot.state}</p>
              <p>${spot.price} per night</p>
              <p>Rating: {spot.avgRating || 'No reviews'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Spots;
