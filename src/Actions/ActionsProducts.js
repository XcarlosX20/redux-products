import Swal from 'sweetalert2';
import axiosClient from "../config/axios";
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
   } from "../types";
   //CREATE A NEW PRODUCT
   export function addProductAction(product) {
       return async (dispatch) => {
           dispatch(addProduct());
           try{
            //insert to API
            await axiosClient.post("/productos", product);
            //setState of products
            dispatch(addProductSuccess(product));
            //alert
            Swal.fire({
                title: 'Producto agregado correctamente!',
                icon: 'success'
              })
           }catch(err){
            dispatch(addProductErr(true))
           }
       }
   }
   const addProduct = () => ({
       type: ADD_PRODUCT,
       payload: true
   });
   const addProductSuccess = (product) => ({
       type: ADD_PRODUCT_SUCCESS,
       payload: product
   });
   const addProductErr = boolean => ({
    type: ADD_PRODUCT_ERROR,
    payload: boolean
   })

   //GET PRODUCTS FROM ACTION
   export function getProductsAction(){
       return async (dispatch) => {
            dispatch(getProducts());
            try{
                const res = await axiosClient.get("/productos");
                dispatch(getProductsSuccess(res.data));
            }catch{
                dispatch(getProductsError(true));
            }
       }
   }
   const getProducts = () => ({
       type: DOWNLOAD_PRODUCTS_START,
       payload: true
   })
   const getProductsSuccess = (res) => ({
       type: DOWNLOAD_PRODUCTS_SUCCESS,
       payload: res
   })
   const getProductsError = (boolean) => ({
    type: DOWNLOAD_PRODUCTS_ERROR,
    payload: boolean
});
//DELETE PRODUCTS
export function deleteProductAction (id){
    return async(dispatch) => {
        dispatch(getProductDelete(id));
        try{
            await axiosClient.delete(`/productos/${id}`);
            dispatch(deleteProductSuccess());
            Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
              )
        }catch(err){
            dispatch(deleteProductError(true))
        }
    }
}
const getProductDelete = (id) => ({
    type: GET_DELETE_PRODUCT,
    payload: id
}); 
const deleteProductError = (boolean) => ({
    type: DELETE_PRODUCT_ERROR,
    payload: boolean
});
const deleteProductSuccess = () => ({
    type: DELETE_PRODUCT_SUCCESS
});
//EDIT PRODUCT
export function getEditProductAction(product){
    return (dispatch) => {
        dispatch(getEditProduct(product))
    }
}
const getEditProduct = (product) => ({
    type: GET_EDIT_PRODUCT,
    payload: product
})
export function editProductAction(product){
    return async (dispatch) => {
        dispatch(editProduct(product));
    try{
        await axiosClient.put(`/productos/${product.id}`, product);
        dispatch(editProductSuccess(product));
    }catch(err){
        console.log(err);
        dispatch(editProductError(true))
    }
}}
const editProduct = (product) => ({
    type: EDIT_PRODUCT_START,
    payload: product
})
const editProductSuccess = (product) => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload: product
});
const editProductError = (boolean) => ({
    type: EDIT_PRODUCT_ERROR,
    payload: boolean
})