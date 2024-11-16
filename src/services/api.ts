import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const parsedData = JSON.parse(authData);
      config.headers['Authorization'] = `Bearer ${parsedData.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('api error')

    if (error.response?.status === 401) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default api;
