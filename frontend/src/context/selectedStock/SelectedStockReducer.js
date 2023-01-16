import {
    STOCK_SELECTED,
} from '../types'


export default (state, action) =>{
    switch(action.type){
        case STOCK_SELECTED:
            return{
                selectedStock: action.payload,
                loading: false
            }
        default:
            return state;
    }
}