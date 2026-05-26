import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor: The "Envelope Opener"
api.interceptors.response.use(
  (response) => {
    // If backend returns { statusCode, message, data, ... }
    // We return only the 'data' part to the service calls
    if (response.data && response.data.data !== undefined) {
      return response.data.data; 
    }
    return response.data;
  },
  (error) => {
    // Extracting the error message from your ResponseStructure
    const message = error.response?.data?.message || error.message || 'Server Error';
    toast.error(message);
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;