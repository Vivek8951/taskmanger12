import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // Only set Content-Type to application/json if not FormData
    if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
  }
  return config;
});

// Auth API
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (userData) => API.post('/auth/register', userData);
export const resetPassword = (resetData) => API.post('/auth/reset-password', resetData);

// Tasks API
export const getTasks = () => API.get('/tasks');
export const createTask = (taskData) => {
  // Ensure proper FormData handling
  return API.post('/tasks', taskData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    transformRequest: [(data) => data] // Prevent axios from transforming FormData
  });
};
export const updateTask = (id, taskData) => API.patch(`/tasks/${id}`, taskData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export const toggleTask = (id) => API.patch(`/tasks/${id}/toggle`);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);