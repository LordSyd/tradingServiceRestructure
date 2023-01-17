import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    CLEAR_REGISTER_STATE
  } from '../types';
  
  export default (state, action) => {
    switch (action.type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload
        };
      case REGISTER_SUCCESS:
        return{
          ...state,
          registerSuccess: true,
        }
      case LOGIN_SUCCESS:
        console.log("login success")
        console.log(action.payload)
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('email', action.payload.email);
        return {
          ...state,
          token: action.payload.token,
          email: action.payload.email,
          isAuthenticated: true,
          loading: false
        };
      case REGISTER_FAIL:
        console.log("reg Error")
        return{
          ...state,
          registerSuccess: false,
          error: action.payload
        }
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
        console.log("auth Error")
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: action.payload,
          email:null
        };
      case CLEAR_REGISTER_STATE:
        return {
          ...state,
          registerSuccess:false,
          error: null
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null
        };
      default:
        return state;
    }
  };
  