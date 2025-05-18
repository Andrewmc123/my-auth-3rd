import { csrfFetch } from './csrf';

export const loadSpotReviews = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const data = await response.json();
  dispatch(setReviews(data));
};

export const createReview = (spotId, reviewData) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData)
  });
  const data = await response.json();
  dispatch(addReview(data));
  return data;
};

export const deleteReview = (reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  dispatch(removeReview(reviewId));
  return data;
};

const initialState = {
  allReviews: {},
  loading: false,
  error: null
};

export const setReviews = (reviews) => ({
  type: 'reviews/setReviews',
  payload: reviews
});

export const addReview = (review) => ({
  type: 'reviews/addReview',
  payload: review
});

export const removeReview = (reviewId) => ({
  type: 'reviews/removeReview',
  payload: reviewId
});

export const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'reviews/setReviews':
      newState = {
        ...state,
        allReviews: action.payload
      };
      break;
    case 'reviews/addReview':
      newState = {
        ...state,
        allReviews: {
          ...state.allReviews,
          [action.payload.id]: action.payload
        }
      };
      break;
    case 'reviews/removeReview':
      newState = {
        ...state,
        allReviews: Object.keys(state.allReviews)
          .filter(key => key !== action.payload)
          .reduce((obj, key) => {
            obj[key] = state.allReviews[key];
            return obj;
          }, {})
      };
      break;
    default:
      return state;
  }
  return newState;
};

export default reviewsReducer;
