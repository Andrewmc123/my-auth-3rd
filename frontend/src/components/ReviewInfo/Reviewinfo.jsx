import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReviewFormModal from "./ReviewFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewDetails from "./ReviewDetails";
import "./ReviewInfo.css";

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
            <h3 className="spot-rating">
                <FaStar />
                {avgStarRating ? avgStarRating.toFixed(1) : "New"}{" "}
                {numReviews ? "・" + numReviews : ""}{" "}
                {numReviews === 0 ? "" : numReviews > 1 ? "reviews" : "review"}
            </h3>
            <div className="reviews-header">
                {currUser && currUser.id !== ownerId ? (
                    <div>
                        {noReviews ? (
                            <>
                                <OpenModalButton
                                    buttonText="Post Your Review"
                                    itemText="Post your review"
                                    modalComponent={<ReviewFormModal spotId={spotId} onReviewCreated={refreshReviews} />}
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
                {sortedSpotReviews.map((review, index) => (
                    <ReviewDetails 
                        key={review.id} 
                        currUser={currUser} 
                        review={review} 
                        spotId={spotId}
                        className={index % 2 === 0 ? "review-even" : "review-odd"}
                    />
                ))} 
            </div>
        </div>
    )
}

export default ReviewInfo;