import axiosClient from "../config/axios";
import { DOWNLOAD_REQUEST_START, DOWNLOAD_REQUEST_SUCCESS, DOWNLOAD_REQUEST_ERROR } from "../types";
export function getRequestAction(){
        return async (dispatch) => {
            dispatch(getRequest());
            try{
                const res = await axiosClient.get("/requests");
                dispatch(getRequestSuccess(res.data));
            }catch{
                dispatch(getRequestError(true));
            }
    }}
const getRequest = () => ({
    type: DOWNLOAD_REQUEST_START,
    payload: true
})
const getRequestSuccess = (res) => ({
    type: DOWNLOAD_REQUEST_SUCCESS,
    payload: res
})
const getRequestError = (boolean) => ({
 type: DOWNLOAD_REQUEST_ERROR,
 payload: boolean
});
