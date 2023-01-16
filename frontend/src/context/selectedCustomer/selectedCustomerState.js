import React, { useReducer } from 'react'
import SelectedCustomerContext from "./selectedCustomerContext";
import SelectedCustomerReducer from "./selectedCustomerReducer";
import {
    CUSTOMER_SELECTED,
} from '../types'
import axios from "axios";

const SelectedCustomerState = props => {
    const initialState = {
        weather: [],
        loading: false
    };
    const [state, dispatch] = useReducer(SelectedCustomerReducer, initialState);

    const selectCustomer = async (customer) => {
    //todo make call to endpoint for customer depot
        try {
            const res = await axios.get(`${global.BACKEND_URL}/api/user/depot?depotId=${customer.depotId}`);
            customer.depot = res.data;
            dispatch({
                type: CUSTOMER_SELECTED,
                payload: customer
            })

            console.log(res)
        }catch (e) {
            console.error(e)
        }


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