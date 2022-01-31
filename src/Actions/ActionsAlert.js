import { SHOW_ALERT, HIDE_ALERT } from '../types/index'
export function showAlertAction(state) {
  return (dispatch) => {
    dispatch(showAlert(state))
    setTimeout(() => {
      dispatch(hideAlert(null))
    }, 2500)
  }
}
const showAlert = (state) => ({
  type: SHOW_ALERT,
  payload: state,
})
const hideAlert = (state) => ({
  type: HIDE_ALERT,
  payload: state,
})
