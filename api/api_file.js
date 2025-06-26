import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_FILE = axios.create({
  baseURL: 'https://socket.hindwana.com/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Attach token to each request
API_FILE.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Failed to attach token to file request', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response
API_FILE.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      message: 'File upload failed. Please try again.',
      ...(error.message && { details: error.message }),
    });
  }
);

export default API_FILE;
