// utils/axios.js
import axios from 'axios';

// Create an instance
const API = axios.create({
  baseURL: 'https://socket.hindwana.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
