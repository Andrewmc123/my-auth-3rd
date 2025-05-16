const initialState = {
  spotReviews: {},
  userReviews: {}
};

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'reviews/LOAD_SPOT_REVIEWS': {
      newState = { ...state };
      newState.spotReviews[action.payload.spotId] = action.payload.reviews;
      return newState;
    }
    case 'reviews/LOAD_USER_REVIEWS': {
      newState = { ...state };
      newState.userReviews = action.payload.reviews;
      return newState;
    }
    case 'reviews/CREATE_REVIEW': {
      newState = { ...state };
      const newReview = action.payload;
      const spotId = newReview.spotId;
      
      if (!newState.spotReviews[spotId]) {
        newState.spotReviews[spotId] = {};
      }
      newState.spotReviews[spotId][newReview.id] = newReview;
      
      if (!newState.userReviews[newReview.userId]) {
        newState.userReviews[newReview.userId] = {};
      }
      newState.userReviews[newReview.userId][newReview.id] = newReview;
      
      return newState;
    }
    case 'reviews/DELETE_REVIEW': {
      newState = { ...state };
      const { spotId, userId, reviewId } = action.payload;
      
      if (newState.spotReviews[spotId]) {
        delete newState.spotReviews[spotId][reviewId];
      }
      
      if (newState.userReviews[userId]) {
        delete newState.userReviews[userId][reviewId];
      }
      
      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;
