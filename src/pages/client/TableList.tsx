import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, MapPin } from 'lucide-react';
import { clientApi } from '../../services/api';
import { Mesa } from '../../types/mesa';
import ReservationModal from '../../components/client/ReservationModal';
import toast from 'react-hot-toast';

const TableList = () => {
  const { restaurantId } = useParams();
  const [tables, setTables] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState<Mesa | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (restaurantId) {
      fetchTables();
    }
  }, [restaurantId]);

  const fetchTables = async () => {
    try {
      const response = await clientApi.getTables(Number(restaurantId));
      setTables(response.data);
    } catch (error) {
      toast.error('Error al cargar las mesas');
    } finally {
      setLoading(false);
    }
  };

  const handleTableClick = (table: Mesa) => {
    if (table.disponibilidad && table.estado_mesa) {
      setSelectedTable(table);
      setIsModalOpen(true);
    } else {
      toast.error('Esta mesa no está disponible');
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mesas Disponibles</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tables.map((table) => (
            <motion.div
              key={table.mesa_id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className={`
                bg-white rounded-xl shadow-lg p-6 cursor-pointer
                ${table.disponibilidad && table.estado_mesa ? 'hover:shadow-xl' : 'opacity-60'}
              `}
              onClick={() => handleTableClick(table)}
            >
              <div className="flex flex-col items-center">
                <div className={`
                  w-24 h-24 rounded-full flex items-center justify-center mb-4
                  ${table.disponibilidad && table.estado_mesa ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                `}>
                  <Users className="w-12 h-12" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Mesa {table.numero_mesa}
                </h3>
                
                <div className="text-gray-600 text-center space-y-2">
                  <p>Capacidad: {table.capacidad} personas</p>
                  <div className="flex items-center justify-center text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{table.ubicacion}</span>
                  </div>
                  <p className="mt-2">
                    <span className={`
                      px-3 py-1 rounded-full text-sm
                      ${table.disponibilidad && table.estado_mesa ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                    `}>
                      {table.disponibilidad && table.estado_mesa ? 'Disponible' : 'No Disponible'}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedTable && (
          <ReservationModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedTable(null);
            }}
            table={selectedTable}
            onSuccess={() => {
              fetchTables();
              setIsModalOpen(false);
              setSelectedTable(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TableList;