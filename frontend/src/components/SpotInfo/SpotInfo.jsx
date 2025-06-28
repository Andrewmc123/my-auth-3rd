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

  // I believe this finds the main preview image to show large
  const largeImage = SpotImages.find(img => img.preview);

  // This is doing a filter to grab the other four images for thumbnails
  const smallImages = SpotImages.filter(img => !img.preview).slice(0, 4);

  // I believe this triggers the 'Feature Coming Soon' alert on reserve
  const handleClick = () => {
    alert('Feature Coming Soon...');
  };

  return (
    <div className="spot-details-container">
      {/* This is showing the spot's title */}
      <h2 className="spot-title">{name}</h2>

      {/* This is showing the full location */}
      <p className="spot-location">
        {city}, {state}, {country}
      </p>

      {/* This is showing the main preview image and four smaller ones */}
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

      {/* This is doing the layout for description and callout box */}
      <div className="spot-details-content">
        <div className="spot-details-left">
          {/* This is showing who the host is */}
          <h2 className="spot-host">
            Hosted by {Owner.firstName} {Owner.lastName}
          </h2>

          {/* This is showing the description of the spot */}
          <p className="spot-description">{description}</p>
        </div>

        {/* This is the callout box with price and rating */}
        <div className="callout-container">
          <div className="callout-text">
            <span className="callout-price">${price} night</span>
            <p className="callout-rating">
              <FaStar />
              {avgStarRating ? avgStarRating.toFixed(1) : "New"}
              {/* This is doing the dot and review count formatting */}
              {numReviews > 0 ? ` · ${numReviews} ${numReviews === 1 ? "Review" : "Reviews"}` : ""}
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
