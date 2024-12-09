import api from './api';
import { Table, TableFormData } from '../types/table';

export const tableApi = {
  getAll: (restaurantId: number) => 
    api.get(`/restaurantes/${restaurantId}/mesas`),
  
  create: (restaurantId: number, data: TableFormData) => 
    api.post(`/restaurantes/${restaurantId}/mesas`, data),
  
  update: (restaurantId: number, tableId: number, data: TableFormData) => 
    api.put(`/restaurantes/${restaurantId}/mesas/${tableId}`, data),
  
  delete: (restaurantId: number, tableId: number) => 
    api.delete(`/restaurantes/${restaurantId}/mesas/${tableId}`),
  
  updateAvailability: (restaurantId: number, tableId: number, disponible: boolean) => 
    api.patch(`/restaurantes/${restaurantId}/mesas/${tableId}/disponibilidad`, { disponible })
};