import axios from 'axios'
import qs from 'qs'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  timeout: 1000,
  paramsSerializer: (params) => {
    return qs.stringify(params, { encodeValuesOnly: true })
  },
})

axiosInstance.interceptors.response.use(
  function (response) {
    if (response.status === 200 || response.status === 201) {
      return response
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosInstance
