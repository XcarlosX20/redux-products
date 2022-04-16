import Swal from "sweetalert2"
import {axiosClient} from "../config/axios"
import {SETCATEGORIES_ERROR, SETCATEGORIES_START, SETCATEGORIES_SUCCESS} from "../types"
export function setCategoriesAction (categories) {
    return async (dispatch) => {
        dispatch(setCategoriesStart())
        try {
            const editCategories = await axiosClient.put('api/companies', {categories})
            if(editCategories.status === 202){
                dispatch(setCategoriesSuccess(categories))
            }
        } catch (err) {
          console.log(err)
        //   Swal.fire({
        //     title: err.response.data.msg || 'There was an error',
        //     icon: 'info',
        //   })
          //dispatch(setCategoriesError(true))
        }
      }
}
const setCategoriesStart = () => ({
  type: SETCATEGORIES_START
})
const setCategoriesSuccess = (categories) => ({
    type: SETCATEGORIES_SUCCESS,
    payload: categories
  })
const setCategoriesError = (boolean) => ({
    type: SETCATEGORIES_ERROR,
    payload: boolean
})