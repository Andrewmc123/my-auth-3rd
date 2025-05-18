import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots, deleteSpot } from '../../store/spots';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton';
import CreateSpotModal from './CreateSpotModal';
import UpdateSpotModal from './UpdateSpotModal';
import DeleteSpotModal from './DeleteSpotModal';
import './Spots.css';

function ManageSpots() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.allSpots);
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(fetchSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return <div>Loading...</div>;

  const userSpots = Object.values(spots).filter(spot => 
    spot.Owner?.id === sessionUser?.id
  );

  const handleDelete = async (spotId) => {
    await dispatch(deleteSpot(spotId));
    closeModal();
  };

  return (
    <div className="manage-spots">
      <h1>Manage Spots</h1>
      
      {userSpots.length === 0 ? (
        <div className="no-spots">
          <p>You haven't created any spots yet.</p>
          <OpenModalButton
            buttonText="Create New Spot"
            modalComponent={<CreateSpotModal />}
          />
        </div>
      ) : (
        <div className="spots-grid">
          {userSpots.map(spot => (
            <div key={spot.id} className="spot-card">
              <img src={spot.previewImage} alt={spot.name} className="spot-preview-image" />
              <div className="spot-card-info">
                <h3>{spot.name}</h3>
                <p>${spot.price} night</p>
                <div className="spot-actions">
                  <OpenModalButton
                    buttonText="Update"
                    modalComponent={<UpdateSpotModal spot={spot} />}
                  />
                  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteSpotModal spotId={spot.id} onDelete={handleDelete} />}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageSpots;
