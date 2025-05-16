const initialState = {
  spotImages: {},
  reviewImages: {}
};

const imagesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'images/LOAD_SPOT_IMAGES': {
      newState = { ...state };
      newState.spotImages[action.payload.spotId] = action.payload.images;
      return newState;
    }
    case 'images/LOAD_REVIEW_IMAGES': {
      newState = { ...state };
      newState.reviewImages[action.payload.reviewId] = action.payload.images;
      return newState;
    }
    case 'images/CREATE_REVIEW_IMAGE': {
      newState = { ...state };
      const newImage = action.payload;
      const reviewId = newImage.reviewId;
      
      if (!newState.reviewImages[reviewId]) {
        newState.reviewImages[reviewId] = {};
      }
      newState.reviewImages[reviewId][newImage.id] = newImage;
      
      return newState;
    }
    case 'images/DELETE_REVIEW_IMAGE': {
      newState = { ...state };
      const { reviewId, imageId } = action.payload;
      
      if (newState.reviewImages[reviewId]) {
        delete newState.reviewImages[reviewId][imageId];
      }
      
      return newState;
    }
    default:
      return state;
  }
};

export default imagesReducer;
