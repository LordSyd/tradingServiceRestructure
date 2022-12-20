import {
    GET_WEATHER,
} from '../types'


export default (state, action) =>{
    switch(action.type){
        case GET_WEATHER:
            return{
                ...state,
                weather: action.payload,
                loading: false
            }
        default:
            return state;
    }
}