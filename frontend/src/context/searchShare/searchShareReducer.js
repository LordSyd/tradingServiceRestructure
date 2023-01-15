import {
    GET_STOCKS,
} from '../types'


export default (state, action) =>{
    switch(action.type){
        case GET_STOCKS:
            return{
                stocks: action.payload,
                loading: false
            }
        default:
            return state;
    }
}