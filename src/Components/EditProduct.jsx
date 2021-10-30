import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editProductAction } from '../Actions/ActionsProducts';
import { showAlertAction } from "../Actions/ActionsAlert"
const EditProduct = () => {
    const dispatch = useDispatch();
    const [productname, setProductname] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState({img_html: "", image_to_Upload: null});
    const {img_html, image_to_Upload } = image;
    let history = useHistory();
    const editProduct = useSelector(state => state.products.productEdit);
    const alert = useSelector(state => state.alert.alert);
    const { loading, error} = useSelector(state => state.products)
    useEffect(() => {
        if (!editProduct) {
            history.push(`/`);
            return null
        }
        const getEditProduct = () => {
            setProductname(editProduct.productname);
            setPrice(editProduct.price);
            setImage({...image, img_html: editProduct.img});
        }
        getEditProduct();
    }, [editProduct, history]);

    const onSubmit = async(e) => {
        e.preventDefault();
        if (productname === "" || !price || img_html === "" ) {
            const msg = {
                txt: "all fields are required",
                class: "alert text-danger text-center text-uppercase p-3"
            }
            dispatch(showAlertAction(msg))
        }else {
            e.preventDefault();
            const { id } = editProduct;
            const product = {
                productname, price : Number(price), id, image
            }
            await dispatch(editProductAction(product))
            history.push(`/`)
        }
    }
    const handleImage = (e) => {
        if(e.target.files[0]){
            setImage({...image,img_html: URL.createObjectURL(e.target.files[0]), image_to_Upload: e.target.files[0]});
        }else{
            setImage({img_html: "", image_to_Upload: ""});
        }
    }
    const disabledEdit = () => {
        if(editProduct ){
            const condition = price == editProduct.price && productname === editProduct.productname && image_to_Upload === null;
            return condition;
        }
    }
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Edit product</h2>
                        {alert ? (<div className={alert.class} role="alert">{alert.txt}</div>) : null}
                        {loading ? <div className="alert alert-info mt-3" role="alert">Loading</div>: null}
                        {error ?
                        (<div className="alert alert-danger mt-3" role="alert">
                            There was a mistake
                        </div>):null}
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
                                    onChange={(e) => setPrice((e.target.value))}
                                    value={price} type="number" step="0.01" min="0" name="price"/>
                            </div>
                            <div className="form-group my-3">
                                <label>Imagen:</label>
                                <input onChange={handleImage} type="file" accept="image/*" name="img" className="mb-3"/>
                                <div className="image-drop">
                                    {img_html ?  <img className="img-fluid" src={img_html} alt={productname} />:   <p>Browse or drop your image</p>}
                                </div>
                            </div>
                            <button
                                disabled={disabledEdit()}
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