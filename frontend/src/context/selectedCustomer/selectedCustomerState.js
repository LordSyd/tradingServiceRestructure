import React, {useReducer} from 'react'
import SelectedCustomerContext from "./selectedCustomerContext";
import SelectedCustomerReducer from "./selectedCustomerReducer";
import {CUSTOMER_SELECTED, LOGOUT,} from '../types'
import axios from "axios";

const SelectedCustomerState = props => {
    const initialState = {
        selectedCustomer: null,
        loading: false
    };
    const [state, dispatch] = useReducer(SelectedCustomerReducer, initialState);

    const selectCustomer = async (customer) => {
        try {
            const res = await axios.get(`${global.BACKEND_URL}/api/user/depot?depotId=${customer.depotId}`);
            customer.depot = res.data;

            customer.depotValue = customer.depot.reduce((acc, stock) => acc + (stock.quantity * stock.currentPrice), 0);

            dispatch({
                type: CUSTOMER_SELECTED,
                payload: customer
            })

        }catch (e) {
            console.error(e)
        }


    }

    const logout = () => dispatch({ type: LOGOUT });

    return (
        <SelectedCustomerContext.Provider value={{
            selectedCustomer: state.selectedCustomer,
            loading: state.loading,
            selectCustomer,
            logout
        }}>
            {props.children}

        </SelectedCustomerContext.Provider>
    )

}

export default SelectedCustomerState;