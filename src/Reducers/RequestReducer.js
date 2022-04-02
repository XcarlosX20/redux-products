import { DOWNLOAD_REQUEST_START, DOWNLOAD_REQUEST_SUCCESS, DOWNLOAD_REQUEST_ERROR, EDIT_REQUEST_ERROR, EDIT_REQUEST_START, EDIT_REQUEST_SUCCESS, GET_SUMMARY_SUCCESS, GET_SUMMARY_ERROR, GET_SUMMARY_START } from "../types";
const initialState = {
    requests: [],
    requestEdit: null,
    error: null,
    loading: false, 
    summary: null
}
export default function (state = initialState, action) {
    switch (action.type) {
        case DOWNLOAD_REQUEST_START:
            return {
                ...state, loading: true 
            }
        case DOWNLOAD_REQUEST_SUCCESS: 
            return {
                ...state, loading: false,
                error: false,
                requests: action.payload
            }
        case EDIT_REQUEST_ERROR,
        DOWNLOAD_REQUEST_ERROR:
            return {
                ...state, loading: false, error: true,
            }   
        case EDIT_REQUEST_START:
            return {
                ...state, loading: true, requestEdit: action.payload
            }
        case EDIT_REQUEST_SUCCESS:
            return{
                ...state, loading: false,
                requestEdit: null,
                requests: state.requests.map(request => request._id === action.payload._id ? request = action.payload : request)
            }
        case GET_SUMMARY_START:
            return{
                ...state, loading: true
            }
       case GET_SUMMARY_SUCCESS:
            return{
                ...state, loading: false, error: true, summary: action.payload
            }     
        case GET_SUMMARY_ERROR:
            return{
                ...state, loading: false, error: true
            }
         default:
        return state;
    }
}