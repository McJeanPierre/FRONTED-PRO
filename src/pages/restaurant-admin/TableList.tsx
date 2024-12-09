import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tableApi } from '../../services/tableApi';
import { Table } from '../../types/table';
import toast from 'react-hot-toast';

const TableList = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const restaurantId = 1; // This should come from auth context

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await tableApi.getAll(restaurantId);
      setTables(response.data);
    } catch (error) {
      toast.error('Error al cargar las mesas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tableId: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta mesa?')) {
      try {
        await tableApi.delete(restaurantId, tableId);
        toast.success('Mesa eliminada con éxito');
        fetchTables();
      } catch (error) {
        toast.error('Error al eliminar la mesa');
      }
    }
  };

  const toggleAvailability = async (tableId: number, currentStatus: boolean) => {
    try {
      await tableApi.updateAvailability(restaurantId, tableId, !currentStatus);
      toast.success('Disponibilidad actualizada');
      fetchTables();
    } catch (error) {
      toast.error('Error al actualizar la disponibilidad');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Gestión de Mesas</h1>
        <Link
          to="/restaurant-admin/tables/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Mesa</span>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Número de Mesa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tables.map((table) => (
              <tr key={table.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Mesa {table.numero_mesa}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{table.capacidad} personas</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => table.id && toggleAvailability(table.id, table.disponible || false)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      table.disponible
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {table.disponible ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Disponible
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 mr-1" />
                        No Disponible
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link
                      to={`/restaurant-admin/tables/edit/${table.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => table.id && handleDelete(table.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableList;