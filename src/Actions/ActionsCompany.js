import Swal from "sweetalert2";
import { axiosClient } from "../config/axios";
import {
  SETCATEGORIES_ERROR,
  SETCATEGORIES_START,
  SETCATEGORIES_SUCCESS,
  GET_INFOCOMPANY_START,
  GET_INFOCOMPANY_ERROR,
  GET_INFOCOMPANY_SUCCESS,
  SET_INFOCOMPANY_START,
  SET_INFOCOMPANY_ERROR,
  SET_INFOCOMPANY_SUCCESS,
} from "../types";
export function setCategoriesAction(categories) {
  return async (dispatch) => {
    dispatch(setCategoriesStart());
    try {
      const editCategories = await axiosClient.put("api/companies", {
        categories,
      });
      if (editCategories.status === 202) {
        dispatch(setCategoriesSuccess(categories));
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "There was an error",
        icon: "info",
      });
      dispatch(setCategoriesError(true));
    }
  };
}
const setCategoriesStart = () => ({
  type: SETCATEGORIES_START,
});
const setCategoriesSuccess = (categories) => ({
  type: SETCATEGORIES_SUCCESS,
  payload: categories,
});
const setCategoriesError = (boolean) => ({
  type: SETCATEGORIES_ERROR,
  payload: boolean,
});
export function getInfoCompanyAction() {
  return async (dispatch) => {
    dispatch(getInfoCompanyStart());
    try {
      const res = await axiosClient.get("api/companies/info");
      if (res.status === 200) {
        dispatch(getInfoCompanySuccess(res.data));
      }
    } catch (err) {
      Swal.fire({
        title: "There was an error",
        icon: "info",
      });
      dispatch(getInfoCompanyError(true));
    }
  };
}
const getInfoCompanyStart = () => ({
  type: GET_INFOCOMPANY_START,
});
const getInfoCompanySuccess = (infoCompany) => ({
  type: GET_INFOCOMPANY_SUCCESS,
  payload: infoCompany,
});
const getInfoCompanyError = (boolean) => ({
  type: GET_INFOCOMPANY_ERROR,
  payload: boolean,
});
export function setInfoCompanyAction(data) {
  return async (dispatch) => {
    dispatch(setInfoCompanyStart());
    try {
      const res = await axiosClient.put("api/companies/info", data);
      if (res.status === 201) {
        dispatch(setInfoCompanySuccess(data));
        Swal.fire({
          icon: "success",
          title: "Changes saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      Swal.fire({
        title: "There was an error. please try it later",
        icon: "info",
      });
      dispatch(setInfoCompanyError(true));
    }
  };
}
const setInfoCompanyStart = () => ({
  type: SET_INFOCOMPANY_START,
});
const setInfoCompanySuccess = (data) => ({
  type: SET_INFOCOMPANY_SUCCESS,
  payload: data,
});
const setInfoCompanyError = (boolean) => ({
  type: SET_INFOCOMPANY_ERROR,
  payload: boolean,
});
