import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { FaStar } from "react-icons/fa";
import "./ReviewFormModal.css";
import * as spotActions from "../../store/spots";

function ReviewFormModal({ spotId, onReviewCreated }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const [review, setReview] = useState("");
	const [stars, setStars] = useState(0);
	const [hover] = useState(0);
	const [errors, setErrors] = useState({});
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [serverError, setServerError] = useState("");
	const starsArr = [1, 2, 3, 4, 5];

	const sessionUser = useSelector((state) => state.session.user);
	const spotReviews = Object.values(useSelector((state) => state.reviews));

	// Filter reviews to only include reviews for the current spot
	// Convert both to strings to ensure proper comparison
	const currentSpotReviews = spotReviews.filter(
		(review) => String(review.spotId) === String(spotId),
	);

	const reviewExists = currentSpotReviews.find(
		(review) => review.userId === sessionUser?.id,
	);

	// Load reviews for the current spot when modal opens to ensure fresh data
	useEffect(() => {
		dispatch(reviewActions.readReviewsThunk(spotId));
	}, [dispatch, spotId]);

	useEffect(() => {
		const errors = {};

		// Show review length error if user has started typing or submitted
		if (review.length < 10 && (review.length > 0 || hasSubmitted)) {
			errors.review = "Must be at least 10 characters";
		}

		// Show star rating error if submitted without selecting stars
		if (hasSubmitted && !stars) {
			errors.stars = "Must select star rating";
		}

		// Show existing review error
		if (reviewExists) {
			errors.review = "Review already exists for this spot";
		}

		setErrors(errors);
	}, [review, stars, reviewExists, hasSubmitted]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});
		setHasSubmitted(true);
		setServerError("");

		if (Object.keys(errors).length > 0) return;

		const payload = {
			review,
			stars,
		};
		try {
			await dispatch(reviewActions.createReviewsThunk(spotId, payload));
			await dispatch(spotActions.readSpotThunk(spotId));

			// Call the callback to refresh reviews in parent component
			if (onReviewCreated) {
				await onReviewCreated();
			}

			closeModal();
		} catch {
			setServerError(
				"An error occurred while submitting your review. Please try again.",
			);
		}
	};

	const isDisabled =
		Object.keys(errors).length > 0 || review.length < 10 || !stars;

	return (
		<div className="review-modal modal-box">
			<h1>How was your stay?</h1>
			{serverError && <p className="server-error">{serverError}</p>}
			<form onSubmit={handleSubmit} className="review-form">
				<div className="review-text-container">
					<textarea
						className="text-area"
						type="text"
						name="review"
						value={review}
						placeholder="Leave your review here..."
						onChange={(e) => setReview(e.target.value)}
						required
					/>
					{errors.review && <p className="error-message">{errors.review}</p>}
				</div>
				<br />
				<div className="star-container">
					{starsArr.map((currStars) => {
						return (
							<label key={currStars}>
								<input
									name="rating"
									type="radio"
									value={currStars}
									onChange={() => setStars(currStars)}
									required
								/>
								<span
									className="star"
									name="rating"
									style={{
										color:
											currStars <= (hover || stars) ? "#027373" : "#A9D9D0",
									}}
								>
									<FaStar />
								</span>
							</label>
						);
					})}
					<span>Stars</span>
				</div>
				{errors.stars && <p className="error-message">{errors.stars}</p>}
				<button
					disabled={isDisabled}
					type="submit"
					className="review-submit-button"
				>
					Submit Your Review
				</button>
			</form>
		</div>
	);
}

export default ReviewFormModal;