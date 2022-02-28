import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
//actions of redux
import { addProductAction } from "../Actions/ActionsProducts";
import { showAlertAction } from "../Actions/ActionsAlert";
import { useDispatch, useSelector } from "react-redux";
const NewProduct = ({ history }) => {
  //dispact para usar con action
  const [productname, setProductname] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState({ img_html: "", image_to_Upload: "" });
  const dispatch = useDispatch();
  //get the store
  const { loading, error } = useSelector((state) => state.products);
  const alert = useSelector((state) => state.alert.alert);
  const { img_html, image_to_Upload } = image;

  const addProducto = (product) => dispatch(addProductAction(product));
  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      productname === "" ||
      !price ||
      img_html === "" ||
      image_to_Upload === ""
    ) {
      const msg = {
        txt: "all fields are required",
        class: "alert text-danger text-center text-uppercase p-3",
      };
      dispatch(showAlertAction(msg));
    } else {
      await addProducto({
        productname,
        price: Number(price),
        image_to_Upload,
        company: "61ff0b1d8dfcc4c180721928",
      });
      setProductname("");
      setPrice(0);
      history.push("/products");
    }
  };
  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage({
        ...image,
        img_html: URL.createObjectURL(e.target.files[0]),
        image_to_Upload: e.target.files[0],
      });
    } else {
      setImage({ img_html: "", image_to_Upload: "" });
    }
  };
  return (
    <>
      <div className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container">
          <Link className="navbar-brand white" to={"/products"}>
            <ArrowBackIcon color="warning" fontSize="large" />
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Add new product
            </h2>
            {alert != null ? (
              <div className={alert.class} role="alert">
                {alert.txt}
              </div>
            ) : null}
            {loading ? (
              <div className="alert alert-info mt-3" role="alert">
                Loading
              </div>
            ) : null}
            {error ? (
              <div className="alert alert-danger mt-3" role="alert">
                There was a mistake
              </div>
            ) : null}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>Product name:</label>
                <input
                  onChange={(e) => setProductname(e.target.value)}
                  className="form-control"
                  type="text"
                  value={productname}
                  name="productname"
                />
              </div>
              <div className="form-group">
                <label>Price USD:</label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control"
                  type="number"
                  value={price}
                  step="0.01"
                  min="0"
                  name="price"
                />
              </div>
              <div className="form-group my-3">
                <label>Imagen:</label>
                <input
                  onChange={handleImage}
                  type="file"
                  accept="image/*"
                  name="img"
                  className="mb-3"
                />
                <div className="image-drop">
                  {img_html ? (
                    <img
                      className="img-fluid"
                      src={img_html}
                      alt={productname}
                    />
                  ) : (
                    <p>Browse or drop your image</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                add
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
