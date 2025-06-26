import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const API = axios.create({
  baseURL: 'https://socket.hindwana.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to each request
API.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Failed to attach token', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      message: 'Something went wrong. Please try again.',
      ...(error.message && { details: error.message }),
    });
  }
);

export default API;
