import {
    GET_CUSTOMER, LOGOUT,
} from '../types'


export default (state, action) =>{
    switch(action.type){
        case GET_CUSTOMER:
            return{
                customers: action.payload,
                loading: false
            }
        case LOGOUT:
            return {
                customers: undefined,
                loading: false}
        default:
            return state;
    }
}