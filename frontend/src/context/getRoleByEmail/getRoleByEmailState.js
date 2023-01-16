import React, { useContext, useEffect, Fragment, useReducer } from 'react'
import axios from 'axios';
import getRoleByEmailContext from './getRoleByEmailContext';
import getRoleByEmailReducer from './getRoleByEmailReducer';
import {
    GET_ROLE
} from '../types'


const GetRoleByEmailState = props => {
  const initialState = {
    gasStation: [],
    loading: false
  };
  const [state, dispatch] = useReducer(getRoleByEmailReducer, initialState);

  const getVolume = async (email) => {
    try {
      const res = await axios.get(`${global.BACKEND_URL}/api/user/username?email=${email}`);
      dispatch({
        type: GET_ROLE,
        payload: res.data
      })
    } catch (err) {
      console.error(err.message, 'my err?');
      // res.status(500).send('Server Error');
    }
  }

  return (
    <getRoleByEmailContext.Provider value={{
      getRole: state.getRole,
      loading: state.loading,
      getVolume
    }}>
      {props.children}
    </getRoleByEmailContext.Provider>
  )
}

export default GetRoleByEmailState;