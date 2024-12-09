import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/authApi';
import { User } from '../types/auth';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await authApi.me();
        const { user } = response.data;
  
        setUser(user);
  
        // Redirigir según el rol
        if (user.role_id === 1) { // SuperAdmin
          navigate('/admin/restaurants');
        } else if (user.role_id === 2) { // Admin
          navigate('/restaurant-admin');
        } else { // Cliente
          navigate('/');
        }
      }
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };
  

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      const { token, user } = response.data;
  
      // Guardar el token en localStorage
      localStorage.setItem('token', token);
  
      // Establecer el usuario en el contexto
      setUser(user);
  
      // Redirigir según el rol
      if (user.role_id === 3) { // SuperAdmin
        navigate('/admin/restaurants');
      } else if (user.role_id === 2) { // Admin
        navigate('/restaurant-admin');
      } else { // Cliente
        navigate('/');
      }
  
      toast.success('Inicio de sesión exitoso');
    } catch (error) {
      toast.error('Credenciales inválidas');
      throw error;
    }
  };
  

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await authApi.register({ username, email, password });
      localStorage.setItem('token', response.data.access_token);
      setUser(response.data.usuario);
      navigate('/');
      toast.success('Registro exitoso');
    } catch (error) {
      toast.error('Error en el registro');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
      toast.success('Sesión cerrada');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};