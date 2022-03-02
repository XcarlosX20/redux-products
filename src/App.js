import './index.css';
import './bootstrap.min.css';
import Products from './Components/Products';
import NewProduct from './Components/NewProduct';
import EditProduct from './Components/EditProduct';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//redux
import { Provider} from "react-redux";
import store from "./store.js";
import Orders from './Components/Pages/Orders';
import Login from './Components/Pages/Login';
import PrivateRoute from './Components/RoutePrivateConfig/RoutePrivate';
import { tokenAuth } from './config/axios';
function App() {
  const token = localStorage.getItem('token');
  if(token){
    tokenAuth(token);
  }
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route exact path="/login" component={Login} />  
          <PrivateRoute path="/products" component={Products}/>
          <PrivateRoute path="/product/new" component={NewProduct} />
          <PrivateRoute path="/product/edit/:id" component={EditProduct} />
          <PrivateRoute path="/orders" component={Orders} />  
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
