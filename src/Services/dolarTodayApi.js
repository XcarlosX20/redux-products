import axios from 'axios'
export const dolarTodayApi = async () => {
  const response = await axios.get(
    'https://s3.amazonaws.com/dolartoday/data.json'
  )
  return response.data.USD.promedio_real
}
