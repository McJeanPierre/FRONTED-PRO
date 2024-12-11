export interface Reserva {
  reserva_id: number;
  usuario_id: number;
  mesa_id: number;
  fecha_reserva: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  mesa?: {
    numero_mesa: string;
    capacidad: number;
    ubicacion: string;
  };
  usuario?: {
    nombre: string;
    email: string;
  };
}