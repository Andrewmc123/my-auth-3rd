//import React from "react"
import { FaStar } from "react-icons/fa";
import "./SpotInfo.css";

const SpotInfo = ({ spotDetails }) => {
  const {
    Owner,
    SpotImages,
    avgStarRating,
    city,
    country,
    description,
    name,
    numReviews,
    price,
    state
  } = spotDetails;

  // Get the first preview image as the large image
  const largeImage = SpotImages.find(img => img.preview);
  // Get the remaining 4 non-preview images as small images
  const smallImages = SpotImages.filter(img => !img.preview).slice(0, 4);

  const handleClick = () => {
    alert('Feature Coming Soon...');
  };

  return (
    <div className="spot-details-container">
      <h2 className="spot-title">{name}</h2>
      <p className="spot-location">
        {city}, {state}, {country}
      </p>
      
      <div className="spot-images-container">
        <img 
          src={largeImage?.url} 
          alt="Front view" 
          className="large-image" 
        />
        <div className="small-images-grid">
          {smallImages.map((image, index) => (
            <img 
              key={image.id}
              src={image.url}
              alt={index === 0 ? 'Bedroom' : 
                    index === 1 ? 'Bathroom' : 
                    index === 2 ? 'Kitchen' : 
                    index === 3 ? 'Backyard' : ''}
              className="small-image"
            />
          ))}
        </div>
      </div>

      <div className="spot-details-content">
        <div className="spot-details-left">
          <h2 className="spot-host">
            Hosted by {Owner.firstName} {Owner.lastName}
          </h2>
          <p className="spot-description">{description}</p>
        </div>

        <div className="callout-container">
          <div className="callout-text">
            <span className="callout-price">${price} night</span>
            <p className="callout-rating">
              <FaStar />
              {avgStarRating
                ? avgStarRating.toFixed(1)
                : "New"}
              {numReviews ? "・" + numReviews : ""}
              {numReviews === 0 ? "" : numReviews > 1 ? "reviews" : "review"}
            </p>
          </div>
          <div className="button-container">
            <button className="button" onClick={handleClick}>
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotInfo;
