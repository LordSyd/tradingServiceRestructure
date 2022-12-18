import React, { useContext, useEffect, Fragment, useReducer } from 'react'
import axios from 'axios';
import bankVolumeContext from './bankVolumeContext';
import bankVolumeReducer from './bankVolumeReducer';
import {
    GET_GAS_PRICE
} from '../types'


const BankVolumeState = props => {
  const initialState = {
    gasStation: [],
    loading: false
  };
  const [state, dispatch] = useReducer(bankVolumeReducer, initialState);

  const getPrice = async () => {
    try {
      const res = await axios.get('/api/dashboard/gasStation');
      dispatch({
        type: GET_GAS_PRICE,
        payload: res.data
      })
    } catch (err) {
      console.error(err.message, 'my err?');
      // res.status(500).send('Server Error');
    }
  }

  return (
    <bankVolumeContext.Provider value={{
      gasStation: state.gasStation,
      loading: state.loading,
      getPrice
    }}>
      {props.children}
    </bankVolumeContext.Provider>
  )
}

export default BankVolumeState;