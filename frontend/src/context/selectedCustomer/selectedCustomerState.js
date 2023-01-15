import React, { useReducer } from 'react'
import SelectedCustomerContext from "./selectedCustomerContext";
import SelectedCustomerReducer from "./selectedCustomerReducer";
import {
    CUSTOMER_SELECTED,
} from '../types'

const SelectedCustomerState = props => {
    const initialState = {
        weather: [],
        loading: false
    };
    const [state, dispatch] = useReducer(SelectedCustomerReducer, initialState);

    const selectCustomer = async (customer) => {
    //todo make call to endpoint for customer depot
            dispatch({
                type: CUSTOMER_SELECTED,
                payload: customer
            })

    }

    return (
        <SelectedCustomerContext.Provider value={{
            selectedCustomer: state.selectedCustomer,
            loading: state.loading,
            selectCustomer
        }}>
            {props.children}

        </SelectedCustomerContext.Provider>
    )

}

export default SelectedCustomerState;