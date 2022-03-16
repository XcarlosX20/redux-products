import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editProductAction } from "../Actions/ActionsProducts";
import { showAlertAction } from "../Actions/ActionsAlert";
import Header from "./Header";
import Loading from "./Utils/Loading";
import Swal from "sweetalert2";
import { axiosClient } from "../config/axios";
import { getCompanyAction } from "../Actions/ActionsAuth";
import Compressor from 'compressorjs';
const EditProduct = () => {
  const dispatch = useDispatch();  
  let history = useHistory();
  const getCompany = () => dispatch(getCompanyAction());
  const editProductFn = (product) => dispatch(editProductAction(product));
  //useState
  const [productname, setProductname] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState({ img_html: "", image_to_Upload: null });
  const [categoriesSelect, setCategoriesSelect] = useState('');

  const editProduct = useSelector((state) => state.products.productEdit);
  const { categories } = useSelector((state) => state.auth.company);
  const alert = useSelector((state) => state.alert.alert);
  const { loading, error } = useSelector((state) => state.products);
  const { img_html, image_to_Upload } = image;
  useEffect(() => {
    if (editProduct === null) {
      history.push(`/products`);
      return null;
    }
    const getEditProduct = () => {
      setProductname(editProduct.productname);
      setPrice(editProduct.price);
      setImage({ ...image, img_html: editProduct.img });
      setCategoriesSelect(editProduct.category)
    };
    getEditProduct();
  }, [editProduct, history]);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (productname === "" || !price || img_html === "") {
      const msg = {
        txt: "all fields are required",
        class: "alert text-danger text-center text-uppercase p-3",
      };
      dispatch(showAlertAction(msg));
    } else {
      e.preventDefault();
      const { _id, company } = editProduct;
      const product = {
        productname,
        price: Number(price),
        _id,
        image,
        company,
        category: categoriesSelect
      };
      await editProductFn(product)
      history.push("/products");
    }
  };
  const handleImage = (e) => {
    if (e.target.files[0]) {
      new Compressor(e.target.files[0], {
        quality: 0.6,
    
        // The compression process is asynchronous,
        // which means you have to access the `result` in the `success` hook function.
        success(result) {
          setImage({
            ...image,
            img_html: URL.createObjectURL(e.target.files[0]),
            image_to_Upload: result,
          });
        },
        error(err) {
          console.log(err.message);
        },
      });
    } else {
      setImage({ img_html: "", image_to_Upload: "" });
    }
  };
  const disabledEdit = () => {
    if (editProduct) {
      const condition =
        price == editProduct.price &&
        productname === editProduct.productname &&
        categoriesSelect === editProduct.category &&
        !image_to_Upload;
      return condition;
    }
  };
  if(editProduct === null){
    return <Loading/>
  } 
  return (
    <>
      <Header />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Edit product</h2>
            {alert ? (
              <div className={alert.class} role="alert">
                {alert.txt}
              </div>
            ) : null}
            {loading ? (  
                <Loading />
            ) : null}
            {error ? (
              <div className="alert alert-danger mt-3" role="alert">
              </div>
            ) : null}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>Product name:</label>
                <input
                  className="form-control"
                  onChange={(e) => setProductname(e.target.value)}
                  value={productname}
                  type="text"
                  name="product-name"
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="number"
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
              <div className="form-group my-3">
                <label>Categoria:</label>
                <select onChange={(e) => {
                  if(e.target.value === 'new'){
                    setCategoriesSelect('');
                    Swal.fire({
                      icon: 'info',
                      showCancelButton: true,
                      input: 'text',
                      text: 'Ingrese el nombre de la nueva categoria',
                      confirmButtonText: 'listo',
                      cancelButtonText: 'Cancelar',
                    }).then((result)=> { 
                      let newCategories = [];
                      if(result.isConfirmed && result.value !== ''){
                        const value = result.value.toLowerCase().trim();
                        setCategoriesSelect(value)
                        newCategories.push(...categories, value)
                        axiosClient.put('/api/companies/', {categories: newCategories})
                          .then(() => {
                            getCompany(); 
                            setCategoriesSelect('');
                            Swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: 'Categoria creada',
                              text: 'Fue agregada a tu lista!',
                              showConfirmButton: false,
                              timer: 2000
                            })
                          })
                      }
                    })
                  }else{
                    setCategoriesSelect(e.target.value);
                  }
                }} className="form-control">
                <option selected value={editProduct.category ? editProduct.category : '' }>{editProduct.category ? editProduct.category.toUpperCase() : '-- Seleccionar --' }</option>
                <option value="new">-- Crear nueva categoria-- </option>
                  {categories.map((category) => (
                    category !== editProduct.category ? <option value={category}>{category.toUpperCase()}</option> : null
                  ))}
                </select>
              </div>
              <button
                disabled={disabledEdit()}
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Save product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
