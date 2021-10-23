import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
//actions of redux
import { addProductAction } from "../Actions/ActionsProducts";
import { showAlertAction } from "../Actions/ActionsAlert";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from '../Services/uploadImage';
const NewProduct = ({history}) => {
    //dispact para usar con action
    const [productname, setProductname] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState({img_html: "", image_to_Upload: ""});
    const dispatch = useDispatch();
    //get the store
    const { loading, error} = useSelector(state => state.products)
    const alert = useSelector(state=> state.alert.alert);
    const {img_html, image_to_Upload } = image;
   
    const addProducto = product => dispatch(addProductAction(product));
    const onSubmit = async (e) => {
        e.preventDefault();
        if (productname === "" || price === 0 || img_html === "" || image_to_Upload === "" ) {
            const msg = {
                txt: "all fields are required",
                class: "alert text-danger text-center text-uppercase p-3"
            }
            dispatch(showAlertAction(msg))
        }else{
        const img = await uploadImage(image_to_Upload);
        addProducto({
            productname,
            price, 
            img,
            id: uuidv4()
        });
        setProductname("");
        setPrice(0);
        setTimeout(()=>{
            history.push("/");
        },1000)}
    }
    const handleImage = (e) => {
        if(e.target.files[0]){
            setImage({...image,img_html: URL.createObjectURL(e.target.files[0]), image_to_Upload: e.target.files[0]});
        }else{
            setImage({img_html: "", image_to_Upload: ""});
        }
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
                            <div className="form-group my-3">
                                <label>Imagen:</label>
                                <input onChange={handleImage} type="file" name="img" className="mb-3" />
                                <div className="img-view">
                                    {img_html ?  <img src={img_html} alt={productname} />: null}
                                </div>
                             
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