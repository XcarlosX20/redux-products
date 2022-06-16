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
const initialState = {
  description: "",
  categories: [],
  workdays: [],
  workTime: { startTime: "", endTime: "" },
  employess: [],
  loading: false,
  error: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INFOCOMPANY_START:
    case GET_INFOCOMPANY_START:
      return { ...state, loading: true, error: false };
    case SET_INFOCOMPANY_SUCCESS:
    case GET_INFOCOMPANY_SUCCESS:
      return {
        ...state,
        description: action.payload.description,
        categories: action.payload.categories,
        workdays: action.payload.workdays,
        workTime: action.payload.workTime,
        employess: action.payload.employess,
        loading: false,
        error: false,
      };
    case SET_INFOCOMPANY_ERROR:
    case GET_INFOCOMPANY_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
