import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include token in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const restaurantApi = {
  getAll: () => api.get('/superadmin/restaurante'),
  getOne: (id: number) => api.get(`/superadmin/restaurante/${id}`),
  create: (data: any) => api.post('/restaurantes', data),
  update: (id: number, data: any) => api.put(`/restaurantes/${id}`, data),
  delete: (id: number) => api.delete(`/superadmin/restaurante/${id}`),
};

export default api;