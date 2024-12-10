import { PricingPlan } from '../types/pricing';

export const plans: PricingPlan[] = [
  {
    id: 'premium',
    name: 'Plan Premium',
    description: 'Todo lo que necesitas para gestionar tu restaurante',
    price: 100,
    featured: true,
    features: [
      'Reservas ilimitadas',
      'Panel de administración completo',
      'Soporte técnico 24/7',
      'Reportes en tiempo real',
      'Personalización de marca',
      'Backup diario automático',
      'Estadísticas avanzadas',
      'Integración con POS',
      'Capacitación incluida'
    ]
  }
];