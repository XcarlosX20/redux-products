import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editProductAction } from '../Actions/ActionsProducts';
import { showAlertAction } from "../Actions/ActionsAlert"
const EditProduct = () => {
    const dispatch = useDispatch();
    const [productname, setProductname] = useState("");
    const [price, setPrice] = useState(0);
    let history = useHistory();
    const editProduct = useSelector(state => state.products.productEdit);
    const alert = useSelector(state => state.alert.alert);
    useEffect(() => {
        if (!editProduct) {
            history.push(`/`);
            return null
        }
        const getEditProduct = () => {
            setProductname(editProduct.productname);
            setPrice(editProduct.price);
        }
        getEditProduct();
    }, [editProduct, history]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (productname === "" || price === 0) {
            const msg = {
                txt: "all fields are required",
                class: "alert text-danger text-center text-uppercase p-3"
            }
            dispatch(showAlertAction(msg))
        } else {
            e.preventDefault();
            const { id } = editProduct;
            const product = {
                productname, price, id
            }
            dispatch(editProductAction(product))
            history.push(`/`)
        }
    }
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Edit product</h2>
                        {alert != null ? (<div className={alert.class}>{alert.txt}</div>) : null}
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>Product name:</label>
                                <input className="form-control"
                                    onChange={(e) => setProductname(e.target.value)}
                                    value={productname} type="text" name="product-name"/>
                            </div>
                            <div className="form-group">
                                <label>Price:</label>
                                <input className="form-control"
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    value={price} type="number" name="price"/>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Save product</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EditProduct;