import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import SpotTile from './SpotTile';
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.allSpots);
  const loading = useSelector(state => state.spots.loading);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  if (loading) {
    return <div className="loading">Loading spots...</div>;
  }

  return (
    <div className="landing-page">
      <h1>Places to stay</h1>
      <div className="spot-tile-grid">
        {spots.map(spot => (
          <SpotTile key={spot.id} spot={spot} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
