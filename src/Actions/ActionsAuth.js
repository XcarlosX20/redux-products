import Swal from "sweetalert2"
import {axiosClient, tokenAuth} from "../config/axios"
import { AUTH_COMPANY_START, AUTH_COMPANY_SUCCESS, AUTH_COMPANY_ERROR, LOGOUT, GET_COMPANY_START,
  GET_COMPANY_SUCCESS, GET_COMPANY_ERROR } from "../types"
import { showAlertAction } from "./ActionsAlert"
export function authCompanyAction (company) {
    return async (dispatch) => {
        dispatch(authCompanyStart())
        try {
            const gettoken = await axiosClient.post('/api/auth/company', company)
            if (gettoken.status === 200) {
              dispatch(authCompanySuccess(gettoken.data.token))
            }
        } catch (err) {
          console.log(err)
          Swal.fire({
            title: err.response.data.msg,
            icon: 'info',
          })
          dispatch(authCompanyError(true))
        }
      }
}
const authCompanyStart = () => ({
  type: AUTH_COMPANY_START,
})
const authCompanySuccess = (token) => ({
  type: AUTH_COMPANY_SUCCESS,
  payload: token,
})
const authCompanyError = (boolean) => ({
  type: AUTH_COMPANY_ERROR,
  payload: boolean,
})
export function getCompanyAction (token) {
    return async (dispatch) => {
        if(token){
          tokenAuth(token)
        }
        try {
            dispatch(getCompanyStart())
            const getCompany = await axiosClient.get('/api/auth/company')
            if(getCompany.status == 200){
            dispatch(getCompanySuccess(getCompany.data))}
            //return (getCompany.data);
        } catch (err) {
          console.log(err)
          dispatch(getCompanyError(true))
        }
      }
}
const getCompanyStart = (token, company) => ({
  type: GET_COMPANY_START,
  payload: {token, company},
})
const getCompanySuccess = (company) => ({
  type: GET_COMPANY_SUCCESS,
  payload: company,
})
const getCompanyError = (boolean) => ({
  type: GET_COMPANY_ERROR,
  payload: boolean,
})
export function logoutAction() {
  return (dispatch)=>{
    dispatch(logout())
  }
} 
const logout = () => ({
  type: LOGOUT,
})
