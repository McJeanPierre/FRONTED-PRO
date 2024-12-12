import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Utensils, Clock, Users, Star } from 'lucide-react';
import { clientApi } from '../../services/api';
import { Restaurant } from '../../types/restaurant';
import toast from 'react-hot-toast';

const ClientRestaurantList = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await clientApi.getRestaurants();
      setRestaurants(response.data);
    } catch (error) {
      toast.error('Error al cargar los restaurantes');
    } finally {
      setLoading(false);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Restaurantes Disponibles</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <motion.div
              key={restaurant.restaurante_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
              onClick={() => navigate(`/client/restaurants/${restaurant.restaurante_id}/tables`)}
            >
              <div className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <Utensils className="w-10 h-10 text-blue-600" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{restaurant.nombre_restaurante}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="text-sm">{restaurant.direccion}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="text-sm">{restaurant.direccion}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="text-sm">{restaurant.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="text-sm">Abierto: 12:00 PM - 11:00 PM</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="text-sm">Capacidad: 50 personas</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="w-5 h-5 mr-3 text-yellow-500 fill-current" />
                    <span className="text-sm">4.5/5 (120 reseñas)</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/client/restaurants/${restaurant.restaurante_id}/tables`);
                    }}
                  >
                    <span>Ver Mesas Disponibles</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientRestaurantList;