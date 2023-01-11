import React, { useReducer } from 'react'
import axios from 'axios';
import SearchBoxContext from './searchBoxContext';
import SearchBoxReducer from './searchBoxReducer';
import {
    GET_STOCKS,
} from '../types'
import setAuthToken from "../../utils/setAuthToken";


const SearchBoxState = props => {
    const initialState = {
        weather: [],
        loading: false
    };
    const [state, dispatch] = useReducer(SearchBoxReducer, initialState);

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
        <SearchBoxContext.Provider value={{
            stocks: state.stocks,
            loading: state.loading,
            getStocks
        }}>
            {props.children}

        </SearchBoxContext.Provider>
    )

}

export default SearchBoxState;