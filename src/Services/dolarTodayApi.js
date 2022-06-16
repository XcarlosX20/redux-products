import axios from "axios";
export const dolarTodayApi = async () => {
  const response = await axios.get(process.env.REACT_APP_MYAPP_USD_TO_BS);
  return response.data.USD.promedio_real;
};
