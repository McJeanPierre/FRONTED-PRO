import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: number[]; // Roles permitidos para esta ruta
  redirectPath?: string;  // Ruta a la que redirigir si no tiene acceso
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, redirectPath = '/login' }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // O un spinner mientras se carga el usuario
  }

  if (!user || !allowedRoles.includes(user.role_id)) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
