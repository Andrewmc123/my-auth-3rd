import { Link } from 'react-router-dom';
import './Spots.css';

function SpotCard({ spot }) {
  const { id, name, previewImage, price } = spot;

  return (
    <Link to={`/spots/${id}`} className="spot-card-link">
      <div className="spot-card">
        <img src={previewImage} alt={name} className="spot-preview-image" />
        <div className="spot-card-info">
          <h3>{name}</h3>
          <p>${price} night</p>
        </div>
      </div>
    </Link>
  );
}

export default SpotCard;
