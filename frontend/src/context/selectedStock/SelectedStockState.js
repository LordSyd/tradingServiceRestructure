import React, { useReducer } from 'react'
import SelectedStockContext from "./SelectedStockContext";
import SelectedStockReducer from "./SelectedStockReducer";
import {
STOCK_SELECTED,
} from '../types'


const SelectedCustomerState = props => {
    const initialState = {
        weather: [],
        loading: false
    };
    const [state, dispatch] = useReducer(SelectedStockReducer, initialState);

    const selectStock = (stock) => {


            dispatch({
                type: STOCK_SELECTED,
                payload: stock
            })


    }

    return (
        <SelectedStockContext.Provider value={{
            selectedStock: state.selectedStock,
            loading: state.loading,
            selectStock
        }}>
            {props.children}

        </SelectedStockContext.Provider>
    )

}

export default SelectedCustomerState;