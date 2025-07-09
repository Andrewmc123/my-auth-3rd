import DeleteReviewModal from "./DeleteReviewModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./ReviewDetails.css";
import { useDispatch } from 'react-redux';
import * as reviewActions from '../../store/reviews';

const ReviewDetails = ({review, currUser, spotId, className}) => {
    const dispatch = useDispatch();

    const timestamp = review.createdAt
    const date = new Date(timestamp)
    const options= {year: "numeric", month: "long"}
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

    return(
        <>
            { review &&(
                <div className={`review-container ${className}`}>
                    <h4 className="review-user">{review.User?.firstName || currUser.firstName}</h4>
                    <p className="review-date">{formattedDate}</p>
                    <p className="review">{review.review}</p>
                    {currUser?.id === review.userId ? (
                        <span>
                         <OpenModalButton
                             buttonClassName="delete-review-modal-button"
                             buttonText="Delete"
                             modalComponent={DeleteReviewModal}
                             onButtonClick={() => {
                                 dispatch(reviewActions.readReviewsThunk(spotId));
                             }}
                             modalProps={{
                                 reviewId: review.id,
                                 spotId: spotId,
                                 onReviewDeleted: () => {
                                     dispatch(reviewActions.readReviewsThunk(spotId));
                                 }
                             }}
                         />{" "}
                        </span>
                    ) : (
                        <></>
                    )}
                 </div>
            )}
        </>
    )
}

export default ReviewDetails
