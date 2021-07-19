import { useState } from 'react';
//actions of redux
import { addProductAction } from "../Actions/ActionsProducts";
import { showAlertAction } from "../Actions/ActionsAlert";
import { useDispatch, useSelector } from "react-redux";
const NewProduct = ({history}) => {
    //dispact para usar con action
    const [productname, setProductname] = useState("");
    const [price, setPrice] = useState(0);
    const dispatch = useDispatch();
    //get the store
    const { loading, error} = useSelector(state => state.products)
    const alert = useSelector(state=> state.alert.alert);
   
    const addProducto = product => dispatch(addProductAction(product));
    const onSubmit = (e) => {
        e.preventDefault();
        if (productname === "" || price === 0) {
            const msg = {
                txt: "all fields are required",
                class: "alert text-danger text-center text-uppercase p-3"
            }
            dispatch(showAlertAction(msg))
        }else{
        addProducto({
            productname,
            price
        });
        setProductname("");
        setPrice(0);
        setTimeout(()=>{
            history.push("/");
        },1000)}
    }
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Add new product</h2>
                        {alert != null ? (<div className={alert.class}>{alert.txt}</div>):null}
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>Product name:</label>
                                <input onChange={(e) => setProductname(e.target.value)}
                                    className="form-control" type="text"
                                    value={productname}
                                    name="productname" />
                            </div>
                            <div className="form-group">
                                <label>Price USD:</label>
                                <input onChange={(e) => setPrice(Number(e.target.value))}
                                    className="form-control" type="number"
                                    value={price}
                                    name="price"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >add</button>
                        </form>
                        {loading ? <div className="alert alert-info mt-3">Loading</div>: null}
                        {error ?
                        (<div class="alert alert-danger mt-3" role="alert">
                            There was a mistake
                        </div>):null}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default NewProduct;