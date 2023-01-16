import React, {useContext, useReducer} from 'react'
import axios from 'axios';
import BuySharesContext from './buySharesContext';
import BuySharesReducer from './buySharesReducer';


import {
    BUY_SHARES,
} from '../types'
import setAuthToken from "../../utils/setAuthToken";
import SelectedCustomerContext from "../selectedCustomer/selectedCustomerContext";
import BankVolumeContext from "../bankVolume/bankVolumeContext";


const BuySharesState = props => {
    const initialState = {
        weather: [],
        loading: false
    };
    const [state, dispatch] = useReducer(BuySharesReducer, initialState);

    const selectedCustomerContext = useContext(SelectedCustomerContext)

    const buyShares = async (symbol, shares, depotId) => {
        console.log("onSubmit " + symbol)
        setAuthToken(localStorage.token)
        try {
            const res = await axios.get(`${global.BACKEND_URL}/api/buyStock?symbol=${symbol}&shares=${shares}&depotId=${depotId}`);


            console.log(res)
            getVolume()
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
        <BuySharesContext.Provider value={{

            buyShares
        }}>
            {props.children}

        </BuySharesContext.Provider>
    )

}

export default SearchShareState;