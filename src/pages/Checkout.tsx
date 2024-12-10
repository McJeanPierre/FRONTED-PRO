import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { plans } from '../data/pricingPlans';
import { CreditCard, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { paymentApi } from '../services/api';

const Checkout = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const plan = plans.find((p) => p.id === planId);

  useEffect(() => {
    if (!plan) {
      navigate('/pricing');
    }
  }, [plan, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const paymentData = {
        numero_tarjeta: formData.cardNumber.replace(/\s/g, ''), // Elimina espacios en blanco
        fecha_expiracion: formData.expiryDate, // Envía directamente como YYYY-MM-DD
        cvc: formData.cvv,
        servicio_id: '1', // ID del servicio o plan
      };
      console.log(paymentData);


      const response = await paymentApi.processPayment(paymentData);

      if (response.data.message === 'Compra realizada con éxito') {
        toast.success('¡Suscripción realizada con éxito!');
        if (response.data.restaurante?.restaurante_id) {
          localStorage.setItem(
            'restaurantId',
            response.data.restaurante.restaurante_id
          );
        }
        navigate('/admin/restaurants');
      } else {
        toast.error(response.data.message || 'Error al procesar el pago');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al procesar el pago';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (e.target.name === 'cardNumber') {
      // Formato de número de tarjeta: Espacios cada 4 dígitos
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    if (e.target.name === 'cvv') {
      // Limitar CVV a 3 dígitos
      value = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  if (!plan) return null;


  
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:w-1/2 p-8 bg-blue-600 text-white">
              <h2 className="text-2xl font-bold mb-6">Resumen de la orden</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="text-blue-100">{plan.description}</p>
                </div>
                <div className="border-t border-blue-500 pt-4">
                  <div className="flex justify-between">
                    <span>Precio mensual</span>
                    <span className="font-bold">${plan.price}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>Impuestos</span>
                    <span className="font-bold">${(plan.price * 0.16).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mt-4 text-lg font-bold border-t border-blue-500 pt-4">
                    <span>Total</span>
                    <span>${(plan.price * 1.16).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de pago</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Número de tarjeta
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                    />
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fecha de expiración
                    </label>
                    <input
                      type="date" // Cambiado a un campo tipo date
                      name="expiryDate"
                      required
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type="text"
                        name="cvv"
                        required
                        maxLength={3}
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Procesando...' : 'Pagar ahora'}
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  Pago seguro con encriptación SSL de 256 bits
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
