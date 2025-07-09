import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ReviewFormModal from "./ReviewFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewDetails from "./ReviewDetails";
import "./ReviewInfo.css";

const seedNames = [
  'John Smith',
  'Sarah Johnson',
  'Michael Brown',
  'Emily Davis',
  'David Wilson',
  'Jessica Thompson'
];

const ReviewInfo = ({ spotDetails, currUser, spotId }) => {
    const {   
        ownerId, 
        avgStarRating,
        numReviews,
    } = spotDetails
    
    const [noReviews, setNoReviews] = useState(false);
    const reviews = Object.values(useSelector((state) => state.reviews))
    const userReviews = reviews.filter(
        (reviews) => reviews.userId === currUser?.id
    );  
    
    // Sort reviews with newest first
    const sortedSpotReviews = reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    useEffect(() => {
        if (sortedSpotReviews.length === 0) {
            setNoReviews(true);
        } else {
            setNoReviews(false);
        }
    }, [sortedSpotReviews]);

    // Function to refresh reviews after new review is created
    const refreshReviews = () => {
        // Force a re-render to update the reviews list
        setNoReviews(prev => !prev);
    };

    return(
        <div>
            <div className="review-summary">
              <h3 className="spot-rating">
                {typeof avgStarRating === "number" && numReviews > 0 ? (
                  <>
                    {avgStarRating.toFixed(2)} ・ <FaStar /> {numReviews} {numReviews === 1 ? "review" : "reviews"}
                  </>
                ) : (
                  <>
                    <FaStar /> {numReviews} {numReviews === 1 ? "review" : "reviews"}
                  </>
                )}
              </h3>
            </div>
            <div className="reviews-header">
              <div className="review-summary-header">
                {typeof avgStarRating === "number" && numReviews > 0 ? (
                  <>
                    {avgStarRating.toFixed(2)} ・ <FaStar /> {numReviews} {numReviews === 1 ? "review" : "reviews"}
                  </>
                ) : (
                  <>
                    <FaStar /> {numReviews} {numReviews === 1 ? "review" : "reviews"}
                  </>
                )}
              </div>
                {currUser && currUser.id !== ownerId ? (
                    <div>
                        {noReviews ? (
                            <>
                                <OpenModalButton
                                    buttonText="Post Your Review"
                                    modalComponent={() => <ReviewFormModal spotId={spotId} onReviewCreated={refreshReviews} />}
                                />
                                <p>Be the first to post a review!</p>
                            </>
                        ) : userReviews.length === 0 ? (
                            <OpenModalButton
                                buttonText="Post Your Review!"
                                modalComponent={<ReviewFormModal spotId={spotId} onReviewCreated={refreshReviews} />}
                            />
                        ) : null}
                    </div>
                ) : null}
            </div>
            <div className="reviews">
                {sortedSpotReviews.map((review, index) => {
                    // Get a random name from the seed names array
                    const reviewerName = seedNames[Math.floor(Math.random() * seedNames.length)];
                    
                    // Ensure we only show up to 2 reviews
                    if (index >= 2) return null;

                    return (
                        <ReviewDetails 
                            key={review.id} 
                            currUser={currUser} 
                            review={{ ...review, User: { firstName: reviewerName } }} 
                            spotId={spotId}
                            className={index % 2 === 0 ? "review-even" : "review-odd"}
                        />
                    );
                })} 
            </div>
        </div>
    )
}

export default ReviewInfo;