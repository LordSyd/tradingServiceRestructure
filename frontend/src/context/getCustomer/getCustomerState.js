import React, { useReducer } from 'react'
import axios from 'axios';
import GetCustomerContext from './getCustomerContext';
import GetCustomerReducer from './getCustomerReducer';
import {
    GET_CUSTOMER,
} from '../types'
import setAuthToken from "../../utils/setAuthToken";


const GetCustomerState = props => {
    const initialState = {
        weather: [],
        loading: false
    };
    const [state, dispatch] = useReducer(GetCustomerReducer, initialState);

    const getCustomer = async () => {
        console.log("onSubmit")
        setAuthToken(localStorage.token)
        try {
            const res = await axios.get(`${global.BACKEND_URL}/api/user/customer/all`);

            dispatch({
                type: GET_CUSTOMER,
                payload: res.data
            })
            console.log(res)
        }catch (e) {
            console.error(e)
        }
    }

    /*const getWeather = async () => {
        try {
            const res = await axios.get('/api/dashboard/tempCurrent');
            dispatch({
                type: GET_STOCKS,
                payload: res.data
            })

        } catch (err) {
            console.error(err.message);
            // res.status(500).send('Server Error');
        }
    }
*/

    return (
        <GetCustomerContext.Provider value={{
            customers: state.customers,
            loading: state.loading,
            getCustomer
        }}>
            {props.children}

        </GetCustomerContext.Provider>
    )

}

export default GetCustomerState;