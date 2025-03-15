import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getTasks = () => api.get('/tasks');
export const createTask = (taskData) => {
  if (taskData instanceof FormData) {
    return api.post('/tasks', taskData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  return api.post('/tasks', taskData);
};
export const updateTask = (id, taskData) => {
  if (taskData instanceof FormData) {
    return api.patch(`/tasks/${id}`, taskData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  return api.patch(`/tasks/${id}`, taskData);
};
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
export const toggleTask = (id) => api.patch(`/tasks/${id}/toggle`);

// Auth endpoints
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const resetPassword = (data) => api.post('/auth/reset-password', data);