import { combineReducers } from "redux";
import ProductosReducer from "./ProductosReducer";
import AlertReducer from "./AlertReducer";
import RequestReducer from "./RequestReducer";
import AuthReducer from "./AuthReducer";
import CompanyReducer from "./CompanyReducer";
export default combineReducers({
  auth: AuthReducer,
  products: ProductosReducer,
  request: RequestReducer,
  alert: AlertReducer,
  company: CompanyReducer,
});
