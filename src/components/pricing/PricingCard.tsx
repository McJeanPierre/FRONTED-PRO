import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PricingPlan } from '../../types/pricing';

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, index }) => {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    navigate(`/checkout/${plan.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="rounded-2xl p-8 bg-white shadow-xl border-2 border-blue-600"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
        <Star className="w-6 h-6 text-blue-600 fill-current" />
      </div>
      
      <p className="text-gray-600 mb-6">{plan.description}</p>
      
      <div className="mb-6">
        <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
        <span className="text-gray-600">/mes</span>
      </div>

      <div className="border-t border-gray-200 pt-6 mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Todo incluido:</h4>
        <ul className="space-y-4">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleSubscribe}
        className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <span>Comenzar ahora</span>
      </button>
      
      <p className="text-center text-sm text-gray-500 mt-4">
        Prueba gratuita de 14 días, sin compromiso
      </p>
    </motion.div>
  );
};

export default PricingCard;