/* eslint-disable no-param-reassign */
import axios from 'axios';

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
    type: 'application/json',
  },
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  async (config) => {
    const persistRoot = await localStorage.getItem('user');
    const { access_token } = JSON.parse(persistRoot);
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default {
  get: (url, data, options = {}) => axios.get(url, data, { ...defaultOptions, ...options }),
  post: (url, data, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
  patch: (url, data, options = {}) => axios.patch(url, data, { ...defaultOptions, ...options }),
  put: (url, data, options = {}) => axios.put(url, data, { ...defaultOptions, ...options }),
  delete: (url, data, options = {}) => axios.delete(url, data, { ...defaultOptions, ...options }),
};