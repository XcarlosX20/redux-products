import {
    SHOW_ALERT,
    HIDE_ALERT
} from "../types/index"
const initialState = {
    alert: null
}
export default (state = initialState, action)=>{
    switch(action.type){
        case HIDE_ALERT:
        case SHOW_ALERT:
            return{
                ...state,
                alert: action.payload
            }
        default:
            return state;
    }
}