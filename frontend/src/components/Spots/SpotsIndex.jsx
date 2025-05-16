import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton';
import CreateSpotModal from './CreateSpotModal';
import SpotCard from './SpotCard';
import './Spots.css';

function SpotsIndex() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const spots = useSelector(state => state.spots.allSpots);

  useEffect(() => {
    // We'll implement the fetchSpots action later
    dispatch(fetchSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="spots-container">
      <div className="spots-header">
        <h1>All Spots</h1>
        <OpenModalButton
          buttonText="Create New Spot"
          modalComponent={<CreateSpotModal />}
        />
      </div>
      <div className="spots-grid">
        {Object.values(spots).map(spot => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </div>
    </div>
  );
}

export default SpotsIndex;
