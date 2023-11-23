// loginReducer
  import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
  } from '../reducers/loginReducer'

  // UserReducer
  import {
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_RESET,
    USER_PROFILE_UPDATE,
  } from '../reducers/UserReducer'

  import axios from 'axios'

  
// Login action

export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }

    const { data } = await axios.post(
      'http://localhost:3001/api/v1/user/login',
      { email, password },
      config
    )

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    dispatch(userProfile(data.body.token))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Logout action

export const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_PROFILE_RESET })
}

// User's profile action

export const userProfile = (token) => async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:3001/api/v1/user/profile', { token }, getConfig(token));
    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch(handleError(USER_PROFILE_FAIL, error));
  }
};

// User's update profile

export const updateProfile = (token, newFirstName, newLastName) => async (dispatch) => {
  try {
    const { data } = await axios.put('http://localhost:3001/api/v1/user/profile', { firstName: newFirstName, lastName: newLastName }, getConfig(token));
    dispatch({ type: USER_PROFILE_UPDATE, payload: data });
  } catch (error) {
    dispatch(handleError(USER_PROFILE_FAIL, error));
  }
};

const handleError = (type, error) => ({
  type,
  payload: error.response && error.response.data.message ? error.response.data.message : error.message,
});

const getConfig = (token) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});
