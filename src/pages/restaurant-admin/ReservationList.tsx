import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Check, X } from 'lucide-react';
import { reservaApi } from '../../services/api';
import { Reserva } from '../../types/reserva';
import toast from 'react-hot-toast';

const ReservationList = () => {
  const [reservations, setReservations] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await reservaApi.getAll();
      const reservationsData = response.data?.data || response.data || [];
      if (Array.isArray(reservationsData)) {
        setReservations(reservationsData);
      } else {
        toast.error('Formato inesperado en la respuesta de la API');
        setReservations([]);
      }
    } catch (error) {
      console.error('Error al obtener las reservaciones:', error);
      toast.error('Error al cargar las reservaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reservaId: number, newStatus: string) => {
    try {
      await reservaApi.updateStatus(reservaId, newStatus); // Uso correcto del método updateStatus
      toast.success('Estado actualizado con éxito');
      fetchReservations();
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      toast.error('Error al actualizar el estado');
    }
  };

  const handleDeleteReservation = async (reservaId: number) => {
    try {
      await reservaApi.delete(reservaId); // Uso correcto del método delete
      toast.success('Reservación eliminada con éxito');
      fetchReservations();
    } catch (error) {
      console.error('Error al eliminar reservación:', error);
      toast.error('Error al eliminar la reservación');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      case 'completada':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Gestión de Reservaciones</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha y Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mesa
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
                {reservations.map((reservation) => (
                  <motion.tr
                    key={reservation.reserva_id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">
                          {new Date(reservation.fecha_reserva).toLocaleDateString()}
                        </div>
                        <Clock className="w-5 h-5 text-gray-400 ml-4 mr-2" />
                        <div className="text-sm text-gray-900">
                          {new Date(reservation.fecha_reserva).toLocaleTimeString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Mesa {reservation.mesa_id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          reservation.estado
                        )}`}
                      >
                        {reservation.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        {reservation.estado === 'pendiente' && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(reservation.reserva_id, 'confirmada')
                              }
                              className="text-green-600 hover:text-green-900"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(reservation.reserva_id, 'cancelada')
                              }
                              className="text-red-600 hover:text-red-900"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        {reservation.estado === 'confirmada' && (
                          <button
                            onClick={() =>
                              handleStatusChange(reservation.reserva_id, 'completada')
                            }
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteReservation(reservation.reserva_id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
