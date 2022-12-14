import React, { useContext, useEffect, Fragment, useReducer } from 'react'
import axios from 'axios';
import DepotContext from './depotContext';
import DepotReducer from './depotReducer';
import {
  GET_COVID
} from '../types'


const DepotState = props => {
  const initialState = {
    covidData: [],
    loading: true
  };
  const [state, dispatch] = useReducer(DepotReducer, initialState);

  const getCovid = async () => {
    try {
      const res = await axios.get('/api/dashboard/coronaData');
      dispatch({
        type: GET_COVID,
        payload: res.data
      })
    } catch (err) {
      console.error(err.message);
      // res.status(500).send('Server Error');
    }
  }


  return (
    <DepotContext.Provider value={{
      covidData: state.covidData,
      loading: state.loading,
      getCovid
    }}>
      {props.children}

    </DepotContext.Provider>
  )

}

export default DepotState;