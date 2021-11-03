import './index.css';
import './bootstrap.min.css';
import Header from './Components/Header';
import Products from './Components/Products';
import NewProduct from './Components/NewProduct';
import EditProduct from './Components/EditProduct';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//redux
import { Provider } from "react-redux";
import store from "./store.js";
import Requests from './Components/Pages/Requests';
function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="mb-4">
          <Header />
        </div>
        <Switch>
          <Route exact path="/" component={Products} />
          <Route path="/product/new" component={NewProduct} />
          <Route path="/product/edit/:id" component={EditProduct} />
          <Route path="/requests" component={Requests} />  
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
