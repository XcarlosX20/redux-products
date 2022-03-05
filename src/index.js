import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import reportWebVitals from './reportWebVitals';
const theme = createTheme({
  palette: {
    primary: {
      main: "#98C1D9",
    },
    secondary: {
      main: "#3D5A80",
    },
    warning: {
      main: "#FFDDD2"
    },
    light:{
      main: "#E0FBFC"
    }
    ,dark:{
      main: '#293241'
    }
  },
});
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
