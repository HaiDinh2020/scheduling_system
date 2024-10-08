import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})


instance.interceptors.request.use(function (config) {
    // gắn token vào header
    const token = window.localStorage.getItem("persist:auth") != null && JSON.parse(localStorage.getItem("persist:auth"))?.token.slice(1,-1)
    config.headers = {
      Authorization: `Baerer ${token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // refresh token
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default instance;