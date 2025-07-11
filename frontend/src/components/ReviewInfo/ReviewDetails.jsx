import DeleteReviewModal from "./DeleteReviewModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./ReviewDetails.css";
import { useDispatch } from "react-redux";
import * as reviewActions from "../../store/reviews";
import { readSpotThunk } from "../../store/spots";

const ReviewDetails = ({ review, currUser, spotId, className }) => {
	const dispatch = useDispatch();

	const timestamp = review.createdAt;
	const date = new Date(timestamp);
	const options = { year: "numeric", month: "long" };
	const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

	const handleReviewDeleted = async () => {
		// Refresh reviews for the spot
		await dispatch(reviewActions.readReviewsThunk(spotId));
		// Refresh spot details to get updated review count and average rating
		await dispatch(readSpotThunk(spotId));
	};

	return (
		<>
			{review && (
				<div className={`review-container ${className}`}>
					<h4 className="review-user">
						{review.User?.firstName || currUser.firstName}
					</h4>
					<p className="review-date">{formattedDate}</p>
					<p className="review">{review.review}</p>
					{currUser?.id === review.userId ? (
						<span>
							<OpenModalButton
								buttonClassName="delete-review-modal-button"
								buttonText="Delete"
								modalComponent={DeleteReviewModal}
								modalProps={{
									reviewId: review.id,
									spotId: spotId,
									onReviewDeleted: handleReviewDeleted,
								}}
							/>{" "}
						</span>
					) : (
						<></>
					)}
				</div>
			)}
		</>
	);
};

export default ReviewDetails;