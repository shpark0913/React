import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER
} from './types'

export function loginUser(dataTosubmit) {

    const request = axios.post('/api/users/login', dataTosubmit)
        .then(response => response.data)
    // action을 reducer에 넘겨주자
    return {
        type: LOGIN_USER,
        payload: request
    }

}


export function registerUser(dataTosubmit) {

    const request = axios.post('/api/users/register', dataTosubmit)
        .then(response => response.data)
    // action을 reducer에 넘겨주자
    return {
        type: REGISTER_USER,
        payload: request
    }

}