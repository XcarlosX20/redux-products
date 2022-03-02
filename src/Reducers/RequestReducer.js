import { DOWNLOAD_REQUEST_START, DOWNLOAD_REQUEST_SUCCESS, DOWNLOAD_REQUEST_ERROR, EDIT_REQUEST_ERROR, EDIT_REQUEST_START, EDIT_REQUEST_SUCCESS } from "../types";
const initialState = {
    requests: [],
    requestEdit: null,
    error: null,
    loading: false
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
         default:
        return state;
    }
}