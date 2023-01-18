import React, { useReducer } from 'react'
import axios from 'axios';
import GetCustomerContext from './getCustomerContext';
import GetCustomerReducer from './getCustomerReducer';
import {
    CUSTOMER_SELECTED,
    GET_CUSTOMER, LOGOUT,
} from '../types'
import setAuthToken from "../../utils/setAuthToken";


const GetCustomerState = props => {
    const initialState = {
        customers: null,
        loading: false
    };
    const [state, dispatch] = useReducer(GetCustomerReducer, initialState);

    const getCustomersByName = async (customer) => {

        setAuthToken(localStorage.token)
        try {
            const res = await axios.get(`${global.BACKEND_URL}/api/user/customer/name?firstName=${customer.firstName}&lastName=${customer.lastName}`);

            dispatch({
                type: GET_CUSTOMER,
                payload: res.data
            })

        }catch (e) {
            console.error(e)

            dispatch({
                type: GET_CUSTOMER,
                payload: undefined
            })
            dispatch({
                type: CUSTOMER_SELECTED,
                payload: undefined
            })
        }
    }

    const getAllCustomers = async () => {

        setAuthToken(localStorage.token)
        try {
            const res = await axios.get(`${global.BACKEND_URL}/api/user/customer/all`);

            dispatch({
                type: GET_CUSTOMER,
                payload: res.data
            })
        }catch (e) {
            console.error(e)

            dispatch({
                type: GET_CUSTOMER,
                payload: undefined
            })
            dispatch({
                type: CUSTOMER_SELECTED,
                payload: undefined
            })
        }
    }

    const getCustomerById = async (id) => {

        setAuthToken(localStorage.token)
        try {
            const res = await axios.get(`${global.BACKEND_URL}/api/user/customer/id?id=${id}`);

            dispatch({
                type: GET_CUSTOMER,
                payload: [res.data]
            })

        }catch (e) {

            console.error(e)

            dispatch({
                type: GET_CUSTOMER,
                payload: undefined
            })
            dispatch({
                type: CUSTOMER_SELECTED,
                payload: undefined
            })
        }
    }
    const logout = () => dispatch({ type: LOGOUT });

    return (
        <GetCustomerContext.Provider value={{
            customers: state.customers,
            loading: state.loading,
            getAllCustomers,
            getCustomersByName,
            getCustomerById,
            logout
        }}>
            {props.children}

        </GetCustomerContext.Provider>
    )

}

export default GetCustomerState;