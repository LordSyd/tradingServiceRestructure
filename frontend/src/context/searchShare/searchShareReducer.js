import {
    GET_STOCKS, LOGOUT,
} from '../types'


export default (state, action) =>{
    switch(action.type){
        case GET_STOCKS:
            return{
                stocks: action.payload,
                loading: false
            }
        case LOGOUT:
            return {
                stocks: undefined,
                loading: false}
        default:
            return state;
    }
}