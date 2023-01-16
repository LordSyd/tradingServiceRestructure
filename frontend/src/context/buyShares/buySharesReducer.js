import {
    BUY_SHARES,
} from '../types'


export default (state, action) =>{
    switch(action.type){
        case BUY_SHARES:
            return{
                stocks: action.payload,
                loading: false
            }
        default:
            return state;
    }
}