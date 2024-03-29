import React, { useReducer } from 'react'
import axios from 'axios';
import bankVolumeContext from './bankVolumeContext';
import bankVolumeReducer from './bankVolumeReducer';
import {
    GET_BANK_VOLUME
} from '../types'


const BankVolumeState = props => {
  const initialState = {
    bankVolume: null,
    loading: false
  };
  const [state, dispatch] = useReducer(bankVolumeReducer, initialState);

  const getVolume = async () => {
    try {
      const res = await axios.get(`${global.BACKEND_URL}/api/bank/volume`);
      dispatch({
        type: GET_BANK_VOLUME,
        payload: res.data
      })
    } catch (err) {
      console.error(err.message, 'my err?');
    }
  }

  return (
    <bankVolumeContext.Provider value={{
      bankVolume: state.bankVolume,
      loading: state.loading,
      getVolume
    }}>
      {props.children}
    </bankVolumeContext.Provider>
  )
}

export default BankVolumeState;