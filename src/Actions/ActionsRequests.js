import Swal from 'sweetalert2'
import {axiosClient} from '../config/axios'
import {
  DOWNLOAD_REQUEST_START,
  DOWNLOAD_REQUEST_SUCCESS,
  DOWNLOAD_REQUEST_ERROR,
  EDIT_REQUEST_ERROR,
  EDIT_REQUEST_SUCCESS,
  EDIT_REQUEST_START,
} from '../types'
export function getRequestAction() {
  return async (dispatch) => {
    dispatch(getRequest())
    try {
      const res = await axiosClient.get('/api/requests')
      dispatch(getRequestSuccess(res.data))
    } catch(err) {
      console.log(err)
      dispatch(getRequestError(true))
    }
  }
}
const getRequest = () => ({
  type: DOWNLOAD_REQUEST_START,
  payload: true,
})
const getRequestSuccess = (res) => ({
  type: DOWNLOAD_REQUEST_SUCCESS,
  payload: res,
})
const getRequestError = (boolean) => ({
  type: DOWNLOAD_REQUEST_ERROR,
  payload: boolean,
})
export function editRequestAction(request) {
  return async (dispatch) => {
    try {
      dispatch(editRequestStart(request))
      const res = await axiosClient.put(`/api/requests/${request._id}`, request)
      dispatch(editRequestSuccess(request))
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Genial',
        showConfirmButton: false,
        timer: 1500
      })
    } catch(err) {
      console.log(err)
      dispatch(editRequestError(true))
    }
  }
}
const editRequestStart = (request) => ({
  type: EDIT_REQUEST_START,
  payload: request
})
const editRequestSuccess = (requestEdited) => ({
 type:EDIT_REQUEST_SUCCESS,
 payload: requestEdited
})
const editRequestError = (boolean) => ({
  type: EDIT_REQUEST_ERROR,
  payload: boolean
})