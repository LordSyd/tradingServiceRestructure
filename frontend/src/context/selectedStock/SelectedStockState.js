import React, { useReducer } from 'react'
import SelectedStockContext from "./SelectedStockContext";
import SelectedStockReducer from "./SelectedStockReducer";
import {
    BUY_STOCK_SELECTED, LOGOUT, SELL_STOCK_SELECTED
} from '../types'


const SelectedCustomerState = props => {
    const initialState = {
        buyStockSelected: undefined,
        sellStockSelected: undefined,
        loading: false
    };
    const [state, dispatch] = useReducer(SelectedStockReducer, initialState);

    const buyStockSelect = (stock) => {

            dispatch({
                type: BUY_STOCK_SELECTED,
                payload: stock
            })

    }

    const sellStockSelect = (stock) => {


        dispatch({
            type: SELL_STOCK_SELECTED,
            payload: stock
        })


    }

    const logout = () => dispatch({ type: LOGOUT });

    return (
        <SelectedStockContext.Provider value={{
            buyStockSelected: state.buyStockSelected,
            sellStockSelected: state.sellStockSelected,
            loading: state.loading,
            buyStockSelect,
            sellStockSelect,
            logout
        }}>
            {props.children}

        </SelectedStockContext.Provider>
    )

}

export default SelectedCustomerState;