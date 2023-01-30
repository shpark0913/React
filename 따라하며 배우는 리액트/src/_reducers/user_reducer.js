import {
    LOGIN_USER, REGISTER_USER, CHECK_EMAIL, CHECK_NICKNAME
} from '../_actions/types'


// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            break;

        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;

        case CHECK_EMAIL:
            return { ...state, emailValid: action.payload}
            break;

        case CHECK_NICKNAME:
            return { ...state, nicknameVaild: action.payload}
            break;
            
        default:
            return state
    }
}