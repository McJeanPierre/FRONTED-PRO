
import { ChefHat, Calendar, Clock, Star } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import TestimonialSection from '../components/TestimonialSection';
import { motion } from 'framer-motion';

const HomePage = () => {
  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Gestión Simple",
      description: "Sistema intuitivo para manejar todas tus reservaciones en un solo lugar"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Tiempo Real",
      description: "Actualizaciones instantáneas y confirmaciones automáticas"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Experiencia Premium",
      description: "Mejora la experiencia de tus clientes con un sistema profesional"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          ¿Por qué elegir ReserveTable?
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1000+", label: "Restaurantes" },
              { number: "50K+", label: "Reservas Mensuales" },
              { number: "98%", label: "Satisfacción" },
              { number: "24/7", label: "Soporte" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-white"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <TestimonialSection />
    </div>
  );
};

export default HomePage;