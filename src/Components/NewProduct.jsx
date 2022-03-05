import { useState } from "react";
import { Link } from "react-router-dom";
//actions of redux
import { addProductAction } from "../Actions/ActionsProducts";
import { showAlertAction } from "../Actions/ActionsAlert";
import { useDispatch, useSelector } from "react-redux";
//Styles
import Loading from "./Utils/Loading"; 
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Grid } from "@mui/material";
import Swal from "sweetalert2";
import { axiosClient } from "../config/axios";
import { getCompanyAction } from "../Actions/ActionsAuth";
const dialog = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  width: '100%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'transparent',
};
const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  //useState
  const [productname, setProductname] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState({ img_html: "", image_to_Upload: "" });
  const [categoriesSelect, setCategoriesSelect] = useState('');
  //get the store
  const { loading, error } = useSelector((state) => state.products);
  const { _id, categories } = useSelector((state) => state.auth.company);
  const alert = useSelector((state) => state.alert.alert);
  const { img_html, image_to_Upload } = image;
  const addProducto = (product) => dispatch(addProductAction(product));
  const getCompany = () => dispatch(getCompanyAction());
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
        company: _id,
        categories: categoriesSelect
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
              <Box sx={dialog}>
                <Loading/>
              </Box>
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
                <option value="">-- Seleccione --</option>
                <option value="new">-- Crear nueva categoria-- </option>
                  {categories.map((category) => (
                    <option value={category}>{category.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <Grid container justifyContent={'center'}>
              <Button
                type="submit"
                variant="contained"
                color="info"
                sx={{padding: '10px 40px'}}
              >
                add
              </Button>
              </Grid>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;