import {
    CUSTOMER_SELECTED,
} from '../types'


export default (state, action) =>{
    switch(action.type){
        case CUSTOMER_SELECTED:
            return{
                selectedCustomer: action.payload,
                loading: false
            }
        default:
            return state;
    }
}