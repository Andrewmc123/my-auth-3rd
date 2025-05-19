import { csrfFetch } from './csrf';

export const fetchSpots = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    const response = await csrfFetch('/api/spots');
    const data = await response.json();
    if (response.ok) {
      dispatch(setAllSpots(data.Spots));
    } else {
      dispatch(setError(data.message || 'Failed to fetch spots'));
    }
  } catch (error) {
    dispatch(setError(error.message || 'Network error occurred'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchSpot = (spotId) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const data = await response.json();
    if (response.ok) {
      dispatch(setSpot(data.Spot));
    } else {
      dispatch(setError(data.message || 'Spot not found'));
    }
  } catch (error) {
    dispatch(setError(error.message || 'Network error occurred'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createSpot = (spotData) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(spotData)
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(addSpot(data.Spot));
      return data.Spot;
    } else {
      dispatch(setError(data.message || 'Failed to create spot'));
      throw new Error(data.message || 'Failed to create spot');
    }
  } catch (error) {
    dispatch(setError(error.message || 'Network error occurred'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateSpot = (spotId, spotData) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(spotData)
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(updateSpotData(data.Spot));
      return data.Spot;
    } else {
      dispatch(setError(data.message || 'Failed to update spot'));
      throw new Error(data.message || 'Failed to update spot');
    }
  } catch (error) {
    dispatch(setError(error.message || 'Network error occurred'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteSpot = (spotId) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(removeSpot(spotId));
      return data;
    } else {
      dispatch(setError(data.message || 'Failed to delete spot'));
      throw new Error(data.message || 'Failed to delete spot');
    }
  } catch (error) {
    dispatch(setError(error.message || 'Network error occurred'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

const initialState = {
  allSpots: [],
  spotsById: {},
  singleSpot: null,
  loading: false,
  error: null
};

export const setAllSpots = (spots) => ({
  type: 'spots/setAllSpots',
  payload: { Spots: spots }
});

export const setSpot = (spot) => ({
  type: 'spots/setSpot',
  payload: { Spot: spot }
});

export const addSpot = (spot) => ({
  type: 'spots/addSpot',
  payload: { Spot: spot }
});

export const updateSpotData = (spot) => ({
  type: 'spots/updateSpot',
  payload: { Spot: spot }
});

export const removeSpot = (spotId) => ({
  type: 'spots/removeSpot',
  payload: spotId
});

export const setLoading = (isLoading) => ({
  type: 'spots/setLoading',
  payload: isLoading
});

export const setError = (error) => ({
  type: 'spots/setError',
  payload: error
});

export const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'spots/setAllSpots':{
      const spots = action.payload.Spots;
      const spotsById = spots.reduce((acc, spot) => {
        acc[spot.id] = spot;
        return acc;
      }, {});
      return {
        ...state,
        allSpots: spots,
        spotsById,
        loading: false,
        error: null
      }
    }
    case 'spots/setSpot': 
      return {
        ...state,
        singleSpot: action.payload.Spot,
        loading: false,
        error: null
      };
    case 'spots/addSpot':
      return {
        ...state,
        allSpots: [...state.allSpots, action.payload.Spot],
        spotsById: {
          ...state.spotsById,
          [action.payload.Spot.id]: action.payload.Spot
        },
        loading: false,
        error: null
      };
    case 'spots/updateSpot':
      return {
        ...state,
        allSpots: state.allSpots.map(spot => 
          spot.id === action.payload.Spot.id ? action.payload.Spot : spot
        ),
        spotsById: {
          ...state.spotsById,
          [action.payload.Spot.id]: action.payload.Spot
        },
        loading: false,
        error: null
      };
    case 'spots/removeSpot':
      return {
        ...state,
        allSpots: state.allSpots.filter(spot => spot.id !== action.payload),
        spotsById: Object.keys(state.spotsById)
          .filter(key => key !== action.payload.toString())
          .reduce((obj, key) => {
            obj[key] = state.spotsById[key];
            return obj;
          }, {}),
        loading: false,
        error: null
      };
    case 'spots/setLoading':
      return {
        ...state,
        loading: action.payload
      };
    case 'spots/setError':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default spotsReducer;
