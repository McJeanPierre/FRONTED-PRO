import api from './api';
import { LoginCredentials, RegisterData } from '../types/auth';

export const authApi = {
  login: (credentials: LoginCredentials) => 
    api.post('/login', credentials),
  
  register: (data: RegisterData) => 
    api.post('/register', data),
  
  
  me: () => 
    api.get('/me'),
  
  logout: () => 
    api.post('/logout')
};