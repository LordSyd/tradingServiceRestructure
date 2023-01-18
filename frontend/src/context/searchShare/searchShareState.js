import React, { useReducer } from 'react'
import axios from 'axios';
import SearchShareContext from './searchShareContext';
import SearchShareReducer from './searchShareReducer';
import {
    GET_STOCKS, LOGOUT,
} from '../types'
import setAuthToken from "../../utils/setAuthToken";


const SearchShareState = props => {
    const initialState = {
        stocks: undefined,
        loading: false
    };
    const [state, dispatch] = useReducer(SearchShareReducer, initialState);

    const getStocks = async (namePart) => {
        setAuthToken(localStorage.token)
        try {
            const res = await axios.get(`${global.BACKEND_URL}/api/findStockByName?namePart=${namePart}`);

            dispatch({
                type: GET_STOCKS,
                payload: res.data
            })
        }catch (e) {
            console.error(e)
        }
    }

    const getStocksBySymbol = async (symbols) => {
        setAuthToken(localStorage.token)
        try {
            const res = await axios.get(`${global.BACKEND_URL}/api/findStocksBySymbol?symbols=${symbols}`);

            dispatch({
                type: GET_STOCKS,
                payload: res.data
            })

        }catch (e) {
            console.error(e)
        }
    }

    const logout = () => dispatch({ type: LOGOUT });
    return (
        <SearchShareContext.Provider value={{
            stocks: state.stocks,
            loading: state.loading,
            getStocksBySymbol,
            getStocks,
            logout
        }}>
            {props.children}

        </SearchShareContext.Provider>
    )

}

export default SearchShareState;