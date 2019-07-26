const axios = require('axios');
const Axios = axios.create({
  baseURL: 'http://t.weather.sojson.com/api/weather',
  timeout: 30000,
  responseType: 'json',
  withCredentials: false, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

Axios.interceptors.request.use(
  (config) => {
    if (config.method === 'get') {
      config.params = config.data;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

Axios.interceptors.response.use(
  res => {
    if (!res.status) {
      return Promise.reject(res.data);
    } else if (res.status !== 200) {
      return Promise.reject(res.data);
    }
    return res.data;
  });
module.exports=Axios;
