import {
    GET_BANK_VOLUME
} from '../types'

export default (state, action) => {
    switch (action.type) {

        case GET_BANK_VOLUME:
            return {
                ...state,
                bankVolume: action.payload,
                loading: false
            }
        default:
            return state;
    }
}