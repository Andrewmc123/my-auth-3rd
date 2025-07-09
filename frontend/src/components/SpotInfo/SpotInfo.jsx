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

  const largeImage = SpotImages.find(img => img.preview);
  const smallImages = SpotImages.filter(img => !img.preview).slice(0, 4);
  const handleClick = () => alert('Feature Coming Soon...');

  const hasReviews = numReviews && numReviews > 0;

  return (
    <div className="spot-details-container">
      <h2 className="spot-title">{name}</h2>
      <p className="spot-location">{city}, {state}, {country}</p>

      <div className="spot-images-container">
        <img 
          src={new URL(largeImage?.url, import.meta.url).href} 
          alt="Front view" 
          className="large-image" 
        />
        <div className="small-images-grid">
          {smallImages.map((image, index) => (
            <img 
              key={image.id}
              src={new URL(image.url, import.meta.url).href}
              alt={
                index === 0 ? "Bedroom" :
                index === 1 ? "Bathroom" :
                index === 2 ? "Kitchen" :
                index === 3 ? "Backyard" : ""
              }
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
              {hasReviews ? (
                <>
                  {avgStarRating?.toFixed(1)} · {numReviews} {numReviews === 1 ? "Review" : "Reviews"}
                </>
              ) : (
                <>
                  <FaStar /> New
                </>
              )}
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
