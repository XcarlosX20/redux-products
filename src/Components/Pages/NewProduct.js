import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { getCompanyAction } from "../../Actions/ActionsAuth";
import { axiosClient } from "../../config/axios";
//actions of redux
import { addProductAction } from "../../Actions/ActionsProducts";
import { showAlertAction } from "../../Actions/ActionsAlert";
import { useDispatch, useSelector } from "react-redux";
//Styles
import Loading from "../Utils/Loading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Grid, Input, TextField } from "@mui/material";
import Swal from "sweetalert2";
import Compressor from "compressorjs";
import { PhotoCamera } from "@mui/icons-material";
import useNumberFormatCustom from "../../Hooks/NumberFormatCustom";

const NewProduct = ({ history }) => {
  const {numberformat , changeValue, NumberFormatCustom} = useNumberFormatCustom('')
  const dispatch = useDispatch();
  //useState
  const [image, setImage] = useState({ img_html: "", image_to_Upload: "" });
  const [categoriesSelect, setCategoriesSelect] = useState("");
  //get store
  const { loading, error } = useSelector((state) => state.products);
  const { _id, categories } = useSelector((state) => state.auth.company);
  const alert = useSelector((state) => state.alert.alert);
  const { img_html, image_to_Upload } = image;
  const addProducto = (product) => dispatch(addProductAction(product));
  const getCompany = () => dispatch(getCompanyAction());
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data, e) => {
    console.log(numberformat)
    data.price = Number(numberformat.substring(-1));
    e.preventDefault();
    const { productname, price } = data;
    if (image_to_Upload === "") {
      const msg = {
        txt: "the image is required",
        class: "alert text-danger text-center text-uppercase p-3",
      };
      dispatch(showAlertAction(msg));
    } else {
      await addProducto({
        productname,
        price: Number(price),
        image_to_Upload,
        company: _id,
        category: categoriesSelect,
      });
      history.push("/products");
    }
  };
  const handleImage = (e) => {
    if (e.target.files[0]) {
      new Compressor(e.target.files[0], {
        quality: 0.6,
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
            {loading ? <Loading /> : null}
            {error ? (
              <div className="alert alert-danger mt-3" role="alert">
                There was a mistake
              </div>
            ) : null}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <TextField
                  id="filled-basic"
                  label="Name"
                  variant="filled"
                  {...register("productname", { required: true })}
                  helperText="required"
                  error={errors.productname}
                />
                <TextField
                  id="filled-basic"
                  label="Price"
                  variant="filled"
                  {...register("price", { required: true })}
                  placeholder={numberformat}
                  helperText="required"
                  onChange={(e) => changeValue(e.target.value)}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  error={errors.price}
                />
              </div>
              <div className="form-group my-3">
                <legend>Imagen:</legend>
                <Grid paddingBottom={2}>
                  <label htmlFor="contained-button-file">
                    <Input
                      sx={{ display: "none" }}
                      onChange={handleImage}
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <Button
                      endIcon={<PhotoCamera />}
                      variant="contained"
                      component="span"
                    >
                      Upload
                    </Button>
                  </label>
                  {alert != null ? (
                    <div className={alert.class} role="alert">
                      {alert.txt}
                    </div>
                  ) : null}
                </Grid>
                <div className="image-drop">
                  {img_html ? (
                    <img
                      className="img-fluid"
                      src={img_html}
                      alt={"product-show"}
                    />
                  ) : null}
                </div>
              </div>
              <div className="form-group my-3">
                <label>Categoria:</label>
                <select
                  onChange={(e) => {
                    if (e.target.value === "new") {
                      setCategoriesSelect("");
                      Swal.fire({
                        icon: "info",
                        showCancelButton: true,
                        input: "text",
                        text: "Ingrese el nombre de la nueva categoria",
                        confirmButtonText: "listo",
                        cancelButtonText: "Cancelar",
                      }).then((result) => {
                        let newCategories = [];
                        if (result.isConfirmed && result.value !== "") {
                          const value = result.value.toLowerCase().trim();
                          setCategoriesSelect(value);
                          newCategories.push(...categories, value);
                          axiosClient
                            .put("/api/companies/", {
                              categories: newCategories,
                            })
                            .then(() => {
                              getCompany();
                              setCategoriesSelect("");
                              Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Categoria creada",
                                text: "Fue agregada a tu lista!",
                                showConfirmButton: false,
                                timer: 2000,
                              });
                            });
                        }
                        e.target.value = "";
                      });
                    } else {
                      setCategoriesSelect(e.target.value);
                    }
                  }}
                  className="form-control"
                >
                  <option value="" disabled selected>
                    Seleccione
                  </option>
                  <option value="new">-- Crear nueva categoria -- </option>
                  {categories.map((category) => (
                    <option value={category}>{category.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <Grid container justifyContent={"center"}>
                <Button
                  disabled={loading}
                  type="submit"
                  variant="contained"
                  color="info"
                  sx={{ padding: "10px 40px" }}
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
