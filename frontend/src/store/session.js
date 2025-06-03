import { csrfFetch } from './csrf';

const actionTypes = {
  login: 'session/login',
  restoreUser: 'session/restoreUser',
  signup: 'session/signup',
  removeUser: 'session/removeUser'
};

export const login = (user) => ({
  type: actionTypes.login,
  payload: user
});

export const restoreUser = (user) => ({
  type: actionTypes.restoreUser,
  payload: user
});

export const signup = (user) => ({
  type: actionTypes.signup,
  payload: user
});

export const removeUser = () => ({
  type: actionTypes.removeUser
});

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return response;
};

export const loginThunk = (credential, password) => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  const data = await response.json();
  dispatch(login(data.user));
  return response;
};

export const signupThunk = (firstName, lastName, email, username, password) => async (dispatch) => {
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      username,
      password,
    }),
  });

  const data = await response.json();
  dispatch(signup(data.user));
  return response;
};

export const restoreUserThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(restoreUser(data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case actionTypes.login:
    case actionTypes.signup:
    case actionTypes.restoreUser:
      newState = {
        ...state,
        user: action.payload
      };
      return newState;
    case actionTypes.removeUser:
      newState = {
        ...state,
        user: null
      };
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;