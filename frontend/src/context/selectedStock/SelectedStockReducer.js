import {
    BUY_STOCK_SELECTED, LOGOUT, SELL_STOCK_SELECTED
} from '../types'


export default (state, action) =>{
    switch(action.type){
        case BUY_STOCK_SELECTED:
            return{
                ...state,
                buyStockSelected: action.payload,
                loading: false
            }
        case SELL_STOCK_SELECTED:
            return{
                ...state,
                sellStockSelected: action.payload,
                loading: false
            }
        case LOGOUT:
            return {}
        default:
            return state;
    }
}