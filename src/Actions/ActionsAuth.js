import {axiosClient, tokenAuth} from "../config/axios"
import { AUTH_COMPANY_START, AUTH_COMPANY_SUCCESS, AUTH_COMPANY_ERROR } from "../types"
import { showAlertAction } from "./ActionsAlert"
export function authCompanyAction (company) {
    return async (dispatch) => {
        dispatch(authCompanyStart())
        try {
            const gettoken = await axiosClient.post('/api/auth/company', company)
            dispatch(authCompanySuccess(gettoken.data.token))
            console.log(gettoken)
            dispatch(getCompanyAction(gettoken.data.token))
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
export function getCompanyAction (token) {
    return async (dispatch) => {
        if(token){
          tokenAuth(token)
        }
        try {
            dispatch(authCompanyStart())
            const getCompany = await axiosClient.get('/api/auth/company')
            if(getCompany.status == 200){
            dispatch(authCompanySuccess(token, getCompany.data))}
            //return (getCompany.data);
        } catch (err) {
          console.log(err)
          dispatch(authCompanyError(true))
        }
      }
}
const authCompanyStart = () => ({
    type: AUTH_COMPANY_START,
  })
const authCompanySuccess = (token, company) => ({
    type: AUTH_COMPANY_SUCCESS,
    payload: {token, company},
})
const authCompanyError = (boolean) => ({
    type: AUTH_COMPANY_ERROR,
    payload: boolean,
})
