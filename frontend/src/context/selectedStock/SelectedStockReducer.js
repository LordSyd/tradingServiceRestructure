import {
    BUY_STOCK_SELECTED, LOGOUT, SELL_STOCK_SELECTED
} from '../types'


export default (state, action) =>{
    switch(action.type){
        case BUY_STOCK_SELECTED:
            return{
                sellStockSelected: state.sellStockSelected,
                buyStockSelected: action.payload,
                loading: false
            }
        case SELL_STOCK_SELECTED:
            return{
                buyStockSelected: state.buyStockSelected,
                sellStockSelected: action.payload,
                loading: false
            }
        case LOGOUT:
            return {
                buyStockSelected: undefined,
                sellStockSelected: undefined,
                loading: false}
        default:
            return state;
    }
}