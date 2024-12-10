
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PricingCard from '../components/pricing/PricingCard';
import { plans } from '../data/pricingPlans';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            La mejor solución para tu restaurante
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sistema profesional de gestión de reservas con todas las funciones que necesitas
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            ¿Por qué elegir nuestro servicio?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              'Implementación inmediata',
              'Sin costos ocultos',
              'Actualizaciones gratuitas',
              'Soporte técnico premium',
              'Seguridad garantizada',
              'Satisfacción 100%'
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-gray-700"
              >
                <Check className="w-5 h-5 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;