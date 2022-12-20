import React, { useContext, useEffect, Fragment, useReducer } from 'react'
import axios from 'axios';
import aktienDetailsContext from './aktienDetailsContext';
import aktienDetailsReducer from './aktienDetailsReducer';
import {
  GET_HOURLY_WEATHER
} from '../types'


const AktienDetailsState = props => {
  const initialState = {
    hourlyForecast: [],
    loading: false
  };
  const [state, dispatch] = useReducer(aktienDetailsReducer, initialState);

  const getHourlyForecast = async () => {
    try {
      const res = await axios.get('/api/dashboard/tempForecast');

      dispatch({
        type: GET_HOURLY_WEATHER,
        payload: res.data
      })

    } catch (err) {
      console.error(err.message);
      // res.status(500).send('Server Error');
    }
  }


  return (
    <aktienDetailsContext.Provider value={{
      hourlyForecast: state.hourlyForecast,
      loading: state.loading,
      getHourlyForecast

    }}>
      {props.children}

    </aktienDetailsContext.Provider>
  )

}

export default AktienDetailsState;