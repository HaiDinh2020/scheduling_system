import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})


instance.interceptors.request.use(function (config) {
    // gắn token vào header
    const token = localStorage.getItem("persist:auth")
 

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