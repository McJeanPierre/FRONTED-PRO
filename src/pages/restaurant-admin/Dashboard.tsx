import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, CalendarDays, Users, Settings } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/restaurant-admin/tables" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <LayoutGrid className="w-8 h-8 text-blue-600 mb-4" />
            <h2 className="text-lg font-semibold text-gray-900">Mesas</h2>
            <p className="text-gray-600 mt-2">Gestiona las mesas y su disponibilidad</p>
          </div>
        </Link>

        <Link to="/restaurant-admin/reservations" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <CalendarDays className="w-8 h-8 text-green-600 mb-4" />
            <h2 className="text-lg font-semibold text-gray-900">Reservaciones</h2>
            <p className="text-gray-600 mt-2">Ver y gestionar las reservaciones</p>
          </div>
        </Link>

        <Link to="/restaurant-admin/settings" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Settings className="w-8 h-8 text-gray-600 mb-4" />
            <h2 className="text-lg font-semibold text-gray-900">Configuración</h2>
            <p className="text-gray-600 mt-2">Configura tu restaurante</p>
          </div>
        </Link>
      </div>
    </div>
  );
};


export default Dashboard;