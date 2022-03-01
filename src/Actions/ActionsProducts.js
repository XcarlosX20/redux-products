import Swal from 'sweetalert2'
import {axiosClient} from '../config/axios'
import { uploadImage } from '../Services/uploadImage'
import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  DOWNLOAD_PRODUCTS_SUCCESS,
  DOWNLOAD_PRODUCTS_ERROR,
  DOWNLOAD_PRODUCTS_START,
  GET_DELETE_PRODUCT,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  GET_EDIT_PRODUCT,
  EDIT_PRODUCT_START,
  EDIT_PRODUCT_ERROR,
  EDIT_PRODUCT_SUCCESS,
  GET_SEARCH_RESULTS_START,
  GET_SEARCH_RESULTS_SUCCESS,
  GET_SEARCH_RESULTS_ERROR,
} from '../types'
//CREATE A NEW PRODUCT
export function addProductAction(product) {
  return async (dispatch) => {
    dispatch(addProduct())
    try {
      const { image_to_Upload } = product
      await uploadImage(image_to_Upload)
      .then(res => {
        product.img = res
        delete product.image_to_Upload
        axiosClient.post('/api/products', product)
        Swal.fire({
            title: 'Producto agregado correctamente!',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          })
          dispatch(addProductSuccess(product))
      })
    } catch (err) {
      dispatch(addProductErr(true))
    }
  }
}
const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true,
})
const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
})
const addProductErr = (boolean) => ({
  type: ADD_PRODUCT_ERROR,
  payload: boolean,
})

//GET PRODUCTS FROM ACTION
export function getProductsAction() {
  return async (dispatch) => {
    dispatch(getProducts())
    try {
      const res = await axiosClient.get('/api/products')
      dispatch(getProductsSuccess(res.data))
    } catch {
      dispatch(getProductsError(true))
    }
  }
}
const getProducts = () => ({
  type: DOWNLOAD_PRODUCTS_START,
  payload: true,
})
const getProductsSuccess = (res) => ({
  type: DOWNLOAD_PRODUCTS_SUCCESS,
  payload: res,
})
const getProductsError = (boolean) => ({
  type: DOWNLOAD_PRODUCTS_ERROR,
  payload: boolean,
})
//DELETE PRODUCTS
export function deleteProductAction(_id) {
  return async (dispatch) => {
    dispatch(getProductDelete(_id))
    try {
      await axiosClient.delete(`/api/products/${_id}`)
      dispatch(deleteProductSuccess())
      Swal.fire('Deleted!', 'Your product has been deleted.', 'success')
    } catch (err) {
      dispatch(deleteProductError(true))
    }
  }
}
const getProductDelete = (_id) => ({
  type: GET_DELETE_PRODUCT,
  payload: _id,
})
const deleteProductError = (boolean) => ({
  type: DELETE_PRODUCT_ERROR,
  payload: boolean,
})
const deleteProductSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS,
})
//EDIT PRODUCT
export function getEditProductAction(product) {
  return (dispatch) => {
    dispatch(getEditProduct(product))
  }
}
const getEditProduct = (product) => ({
  type: GET_EDIT_PRODUCT,
  payload: product,
})
export function editProductAction(product) {
  return async (dispatch) => {
    try {
      dispatch(editProduct(product))
      const { image_to_Upload, img_html } = product.image
      if (image_to_Upload) {
        product.img = await uploadImage(image_to_Upload)
      } else {
        product.img = img_html
      }
      delete product.image
      const productEdited = await axiosClient.put(`/api/products/${product._id}`, product)
      dispatch(editProductSuccess(productEdited.data))
      console.log(productEdited);
    } catch (err) {
      console.log(err)
      dispatch(editProductError(true))
    }
  }
}
const editProduct = (product) => ({
  type: EDIT_PRODUCT_START,
  payload: product,
})
const editProductSuccess = (product) => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload: product,
})
const editProductError = (boolean) => ({
  type: EDIT_PRODUCT_ERROR,
  payload: boolean,
})
export function getSearchResultsAction(results) {
  return (dispatch) => {
    try {
      dispatch(getSearchResultsSuccess(results))
    } catch (err) {
      dispatch(getSearchResultsError(true))
    }
  }
}
const getSearchResultsSuccess = (results) => ({
  type: GET_SEARCH_RESULTS_SUCCESS,
  payload: results,
})
const getSearchResultsError = (boolean) => ({
  type: GET_SEARCH_RESULTS_ERROR,
  payload: boolean,
})
