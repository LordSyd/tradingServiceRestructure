import React, { useReducer } from 'react'
import axios from 'axios';
import SearchShareContext from './searchShareContext';
import SearchShareReducer from './searchShareReducer';
import {
    GET_STOCKS,
} from '../types'
import setAuthToken from "../../utils/setAuthToken";


const SearchShareState = props => {
    const initialState = {
        stocks: [],
        loading: false
    };
    const [state, dispatch] = useReducer(SearchShareReducer, initialState);

    const getStocks = async (namePart) => {
        console.log("onSubmit " + namePart)
        setAuthToken(localStorage.token)
        try {
            const res = await axios.get(`${global.BACKEND_URL}/api/findStockByName?namePart=${namePart}`);

            dispatch({
                type: GET_STOCKS,
                payload: res.data
            })
            console.log(res)
        }catch (e) {
            console.error(e)
        }
    }

    const getStocksBySymbol = async (symbols) => {
        console.log("onSubmit " + symbols)
        const symbolsArr = symbols.split(',');
        setAuthToken(localStorage.token)
        try {
            const res = await axios.get(`${global.BACKEND_URL}/api/findStocksBySymbol?symbols=${symbols}`);

            dispatch({
                type: GET_STOCKS,
                payload: res.data
            })
            console.log(res)
        }catch (e) {
            console.error(e)
        }
    }


    return (
        <SearchShareContext.Provider value={{
            stocks: state.stocks,
            loading: state.loading,
            getStocksBySymbol,
            getStocks
        }}>
            {props.children}

        </SearchShareContext.Provider>
    )

}

export default SearchShareState;