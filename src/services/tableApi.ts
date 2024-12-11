import api from './api';
import { TableFormData } from '../types/table';

export const tableApi = {
  getAll: () => api.get('/admin/mesas'),
  getOne: (mesaId: number) => api.get(`/admin/mesas/${mesaId}`),
  create: (data: TableFormData) => api.post(`/admin/mesas`, data),
  update: (mesaId: number, data: TableFormData) => api.put(`/admin/mesas/${mesaId}`, data),
  delete: (mesaId: number) => api.delete(`/admin/mesas/${mesaId}`),
  updateAvailability: (mesaId: number, disponible: boolean) => api.post(`/admin/mesas/${mesaId}/disponibilidad`, { disponible }),
  getAssociatedRestaurant: () => api.get('/admin/restaurante/asociado'), // Nueva función para obtener el restaurante asociado
};