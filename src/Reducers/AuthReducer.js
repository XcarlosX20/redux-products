import {AUTH_COMPANY_START, AUTH_COMPANY_SUCCESS, AUTH_COMPANY_ERROR, LOGOUT, GET_COMPANY_START, GET_COMPANY_SUCCESS, GET_COMPANY_ERROR} from '../types'
const initialState = {
    company: null,
    auth: false,
    token: localStorage.getItem('token'),
    error: null,
    loading: false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_COMPANY_START,
        GET_COMPANY_START:
            return {
                ...state, loading: true,
            }
        case AUTH_COMPANY_SUCCESS: 
            localStorage.setItem('token', action.payload)
            return {
                ...state,
                token: action.payload,
                loading: false
            } 
            
        case AUTH_COMPANY_ERROR, GET_COMPANY_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case GET_COMPANY_SUCCESS:
            return{
                ...state, loading:false, company: action.payload, auth: true
            }
        case LOGOUT:
            return {
                ...state, auth: false, token: null, company: null
            }
         default:
        return state;
    }
}