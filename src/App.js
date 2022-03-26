import './index.css';
import './bootstrap.min.css';
import Products from './Components/Pages/Products.js';
import NewProduct from './Components/Pages/NewProduct.js';
import EditProduct from './Components/Pages/EditProduct.js';
import Summary from './Components/Pages/Summary';
import Customization from './Components/Pages/Customization';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//redux
import { Provider} from "react-redux";
import store from "./store.js";
import Orders from './Components/Pages/Orders';
import Login from './Components/Pages/Login';
import PrivateRoute from './Components/RoutePrivateConfig/RoutePrivate';
import { tokenAuth } from './config/axios';
import Categories from './Components/Pages/custom/Categories';
import Mycompany from './Components/Pages/custom/Mycompany';
import { Redirect } from 'react-router-dom';
function App() {
  const token = localStorage.getItem('token');
  if(token){
    tokenAuth(token);
  }
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route path="/login" component={Login} />  
          <PrivateRoute exact path="/products" component={Products}/>
          <PrivateRoute path="/product/new" component={NewProduct} />
          <PrivateRoute path="/product/edit/:id" component={EditProduct} />
          <PrivateRoute path="/orders" component={Orders} /> 
          <PrivateRoute exact path="/customization" component={Customization} />  
          <PrivateRoute path="/customization/categories" component={Categories} />  
          <PrivateRoute path="/customization/my-company" component={Mycompany} />
          <PrivateRoute path="/customization/sales-summary" component={Summary} />
          <Route render={() => {setTimeout(()=>{window.location = '/products'},3000); return(<><h2>Page not found... redirecting to home</h2></>)}} /> 
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
