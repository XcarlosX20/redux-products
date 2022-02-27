import {
  Container,
  Grid,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import Loading from '../Utils/Loading'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {authCompanyAction} from '../../Actions/ActionsAuth'
import {showAlertAction} from '../../Actions/ActionsAlert'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const authCompany = (company) =>  dispatch(authCompanyAction(company));
  const showAlert = (alert) =>  dispatch(showAlertAction(alert));
  const {alert} = useSelector((state) => state.alert);
  const [values, setValues] = useState({
    companyEmail: "",
    password: "",
    showPassword: false,
  });
  const history = useHistory();
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const login = async (e) => {
    e.preventDefault();
    if(values.email && values.password){
      const company = {
        companyEmail: values.email, password: values.password
      }
      await authCompany(company)
      history.push('/products')
    }

    else{
      swal.fire({
        title: 'all fields are required',
        icon: 'info',
      })
    }
  }
  return (
    <>{alert != null ? (
      <div className={alert.class} role="alert">
        {alert.txt}
      </div>
    ) : null}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box className="login trapecio">
            <img
              className="img-fluid login-img"
              src="https://res.cloudinary.com/do5yybhwe/image/upload/v1645209426/shops/store-g0735b5b84_1280-min_phczyl.png"
              alt="login"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            paddingX={"5rem"}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            height={"100%"}
          >
            <form onSubmit={login}>
            <Grid container rowGap={2}>
            <h3>Login</h3>
              <FormControl fullWidth>
                <InputLabel>Email</InputLabel>
                <OutlinedInput label="Email" onChange={handleChange("email")} />
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button variant="contained" color="info" type="submit">Login</Button>
              </Grid>
              {loading ? <Loading width="10rem" height="10rem"/> : null}
              </form>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
