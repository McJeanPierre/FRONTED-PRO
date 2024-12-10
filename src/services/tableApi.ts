import api from './api';
import { Table, TableFormData } from '../types/table';

export const tableApi = {
  getAll: () => 
    api.get(`/admin/mesas`),
  
  create: (data: TableFormData) => 
    api.post(`/admin/mesas`, data),
  
  update: (tableId: number, data: TableFormData) => 
    api.put(`/admin/mesas/${tableId}`, data),
  
  delete: (tableId: number) => 
    api.delete(`/admin/mesas/${tableId}`),
  
  updateAvailability: (tableId: number, disponible: boolean) => 
    api.patch(`/admin/mesas/${tableId}/disponibilidad`, { disponible })
};