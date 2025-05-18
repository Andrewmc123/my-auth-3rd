import { csrfFetch } from './csrf';

export const fetchSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots');
  const data = await response.json();
  dispatch(setAllSpots(data.Spots));
};

export const fetchSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const data = await response.json();
  dispatch(setSpot(data));
};

export const createSpot = (spotData) => async dispatch => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spotData)
  });
  const data = await response.json();
  dispatch(addSpot(data));
  return data;
};

export const updateSpot = (spotId, spotData) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spotData)
  });
  const data = await response.json();
  dispatch(updateSpotData(data));
  return data;
};

export const deleteSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  dispatch(removeSpot(spotId));
  return data;
};

const initialState = {
  allSpots: {},
  singleSpot: null,
  loading: false,
  error: null
};

export const setAllSpots = (spots) => ({
  type: 'spots/setAllSpots',
  payload: spots
});

export const setSpot = (spot) => ({
  type: 'spots/setSpot',
  payload: spot
});

export const addSpot = (spot) => ({
  type: 'spots/addSpot',
  payload: spot
});

export const updateSpotData = (spot) => ({
  type: 'spots/updateSpot',
  payload: spot
});

export const removeSpot = (spotId) => ({
  type: 'spots/removeSpot',
  payload: spotId
});

export const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'spots/setAllSpots':
      newState = {
        ...state,
        allSpots: action.payload
      };
      break;
    case 'spots/setSpot':
      newState = {
        ...state,
        singleSpot: action.payload
      };
      break;
    case 'spots/addSpot':
      newState = {
        ...state,
        allSpots: {
          ...state.allSpots,
          [action.payload.id]: action.payload
        }
      };
      break;
    case 'spots/updateSpot':
      newState = {
        ...state,
        allSpots: {
          ...state.allSpots,
          [action.payload.id]: action.payload
        },
        singleSpot: action.payload
      };
      break;
    case 'spots/removeSpot':
      newState = {
        ...state,
        allSpots: Object.keys(state.allSpots)
          .filter(key => key !== action.payload)
          .reduce((obj, key) => {
            obj[key] = state.allSpots[key];
            return obj;
          }, {}),
        singleSpot: null
      };
      break;
    default:
      return state;
  }
  return newState;
};

export default spotsReducer;
