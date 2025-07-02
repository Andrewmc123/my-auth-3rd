import { csrfFetch } from './csrf';

const CREATE_IMAGE = "images/createImage"
const UPDATE_IMAGE = "images/updateImage"
const DELETE_IMAGE = "images/deleteImage"


export const createImage = (payload) => ({
    type: CREATE_IMAGE,
    payload,
  });

export const updateImage = (payload) => ({
    type: UPDATE_IMAGE,
    payload,
  });

export const deleteImage = (imageId) => ({
    type: DELETE_IMAGE,
    payload: { id: imageId },
  });

export const createImageThunk = (id, payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createImage(data));
        return data;
    }
}

export const deleteImageThunk = (imageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spot-images/${imageId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteImage(imageId));
        return true;
    }
    return false;
};

const initialState = {};

const spotImageReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case CREATE_IMAGE:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        case UPDATE_IMAGE:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_IMAGE:
            newState = { ...state };
            delete newState[action.payload.id];
            return newState;
        default:
            return state;
    }
}


export default spotImageReducer
