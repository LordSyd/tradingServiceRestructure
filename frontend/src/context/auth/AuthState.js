import React, { useReducer} from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS, CLEAR_REGISTER_STATE
} from '../types';


const AuthState = props => {

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    email: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async (email, token) => {

    setAuthToken(token?? localStorage.token);
    let stateEmail = email?? localStorage.email
    try {
      const res = await axios.get(`${global.BACKEND_URL}/api/user/username?email=${stateEmail}`);

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: undefined
      });
    }
  };

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      await axios.post(`${global.BACKEND_URL}/api/register`, formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
      });

    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`${global.BACKEND_URL}/api/auth`, formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {token : res.data, email: formData.email}
      });

    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Logout
  const logout = () => {
    dispatch({type: LOGOUT});
  }

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  const clearRegistered = () => dispatch({type: CLEAR_REGISTER_STATE});

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        email: state.email,
        registerSuccess: state.registerSuccess,
        clearRegistered,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
