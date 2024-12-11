export interface Mesa {
  mesa_id: number;
  numero_mesa: string;
  capacidad: number;
  ubicacion:string;
  restaurante_id: number; // La referencia al restaurante al que pertenece la mesa
  disponibilidad: boolean; // Estado de disponibilidad
}

export interface Reserva {
  reserva_id?: number;
  usuario_id?: number;
  mesa_id: number;
  fecha_reserva: string;
  estado: string;
}