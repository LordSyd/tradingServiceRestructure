import {
    GET_ROLE
} from '../types'

export default (state, action) => {
    switch (action.type) {

        case GET_ROLE:
            return {
                ...state,
                getRole: action.payload,
                loading: false
            }
        default:
            return state;
    }
}