// React is not needed as we're using JSX
import { Link } from 'react-router-dom';

const SpotTile = ({ spot }) => {
  const { id, name, previewImage, city, state, price, avgRating } = spot;
  
  return (
    <Link to={`/spots/${id}`} className="spot-tile">
      <div className="spot-image-container">
        <img src={previewImage} alt={name} className="spot-preview-image" />
        <div className="spot-tooltip">{name}</div>
      </div>
      <div className="spot-info">
        <div className="spot-location">
          <span className="spot-city">{city}</span>
          <span className="spot-state">{state}</span>
        </div>
        <div className="spot-rating">
          <span className="spot-rating-star">★</span>
          <span className="spot-rating-value">{avgRating || 'New'}</span>
        </div>
        <div className="spot-price">
          <span className="spot-price-value">${price}</span>
          <span className="spot-price-label">night</span>
        </div>
      </div>
    </Link>
  );
};

export default SpotTile;
