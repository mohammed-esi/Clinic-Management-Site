import api from '../utils/api';
import setAuthToken from '../utils/setAuthToken';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERROR,
} from '../utils/constant';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    try {
      const res = await api.get('/api/users/self');

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  const res = await api.post('/api/users/login', body);

  if (res.data.status_code === 200) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } else {
    dispatch({
      type: AUTH_ERROR,
      payload: res.data.msg,
    });
  }
};

// Clear Error
export const clearError = () => ({ type: CLEAR_ERROR });

// Logout
export const logout = () => ({ type: LOGOUT });
