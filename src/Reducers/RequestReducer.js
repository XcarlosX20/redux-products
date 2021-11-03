import { DOWNLOAD_REQUEST_START, DOWNLOAD_REQUEST_SUCCESS, DOWNLOAD_REQUEST_ERROR } from "../types";
const initialState = {
    requests: [],
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
         default:
        return state;
    }
}