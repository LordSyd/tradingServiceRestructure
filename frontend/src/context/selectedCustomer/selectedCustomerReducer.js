import {
    CUSTOMER_SELECTED, LOGOUT,
} from '../types'


export default (state, action) =>{
    switch(action.type){
        case CUSTOMER_SELECTED:
            return{
                selectedCustomer: action.payload,
                loading: false
            }
        case LOGOUT:
            return {
                selectedCustomer: undefined,
                loading: false}
        default:
            return state;
    }
}