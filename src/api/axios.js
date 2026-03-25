import axios from 'axios';

const api = axios.create({
  baseURL: 'https://transport-backend-azhc.onrender.com/api',
  // baseURL:'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

api.interceptors.response.use(
  response => response, 
  error => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized! Logging out...');
      localStorage.removeItem('token'); 

      window.location.href = '/'; 
    }

    return Promise.reject(error);
  }
);

export default api;