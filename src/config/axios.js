import axios from "axios";
export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_MYAPP_BACKEND,
});
export const tokenAuth = (token) => {
  if (token) {
    axiosClient.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axiosClient.defaults.headers.common["x-auth-token"];
  }
};
