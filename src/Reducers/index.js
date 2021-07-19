import {combineReducers} from "redux";
import ProductosReducer from "./ProductosReducer";
import AlertReducer from "./AlertReducer";

export default combineReducers({
    products: ProductosReducer,
    alert: AlertReducer
});