import {
    LOGIN_USER, SIGNUP_USER, CHECK_EMAIL, 
    CHECK_EMAIL_CODE, CHECK_NICKNAME, SEND_CODE,
    LOGIN_CONSTANT
} from '../_actions/types'


// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, payload: action.payload }

        case SIGNUP_USER:
            return { ...state, payload: action.payload }

        case CHECK_EMAIL:
            return { ...state, payload: action.payload }

            case CHECK_EMAIL_CODE:
            return { ...state, payload: action.payload }

        case CHECK_NICKNAME:
            return { ...state, payload: action.payload }

        case SEND_CODE:
            return { ...state, payload: action.payload }

        case LOGIN_CONSTANT:
            return { ...state, payload: action.payload }
            
        default:
            return state
    }
}