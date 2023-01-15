import {
    GET_CUSTOMER,
} from '../types'


export default (state, action) =>{
    switch(action.type){
        case GET_CUSTOMER:
            console.log("in reducer")
            console.log(action.payload)
            return{
                customers: action.payload,
                loading: false
            }
        default:
            return state;
    }
}