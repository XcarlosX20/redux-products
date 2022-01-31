import { combineReducers } from 'redux'
import ProductosReducer from './ProductosReducer'
import AlertReducer from './AlertReducer'
import RequestReducer from './RequestReducer'
export default combineReducers({
  products: ProductosReducer,
  request: RequestReducer,
  alert: AlertReducer,
})
