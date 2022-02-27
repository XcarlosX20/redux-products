import {AUTH_COMPANY_START, AUTH_COMPANY_SUCCESS, AUTH_COMPANY_ERROR} from '../types'
const initialState = {
    company: null,
    auth: false,
    token: localStorage.getItem('token'),
    error: null,
    loading: false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_COMPANY_START:
            return {
                ...state, loading: true,
            }
        case AUTH_COMPANY_SUCCESS: 
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                auth: true,
                token: action.payload.token,
                company: action.payload.company,
                loading: false
            } 
            
        case AUTH_COMPANY_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
         default:
        return state;
    }
}