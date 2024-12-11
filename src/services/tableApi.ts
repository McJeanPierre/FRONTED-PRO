import api from './api';
import { TableFormData } from '../types/table';

export const tableApi = {
  getAll: () => api.get('/admin/mesas'),
  getOne: (mesaId: number) => api.get(`/admin/mesas/${mesaId}`),
  create: (data: TableFormData) => api.post('/admin/mesas', data),
  update: (mesaId: number, data: TableFormData) => api.put(`/admin/mesas/${mesaId}`, data),
  delete: (mesaId: number) => api.delete(`/admin/mesas/${mesaId}`),
  updateAvailability: (mesaId: number, disponibilidad: boolean) => api.patch(`/admin/mesas/${mesaId}/disponibilidad`, { disponibilidad }), // Cambiar a PATCH
};