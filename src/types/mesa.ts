export interface Mesa {
  mesa_id: number;
  numero_mesa: string;
  capacidad: number;
  ubicacion:string;
  estado_mesa:boolean;
  restaurante_id: number; // La referencia al restaurante al que pertenece la mesa
  disponibilidad: boolean; // Estado de disponibilidad
}

export interface Reserva {
  fecha: string;
  hora: string;
  numero_personas: number;
  mesa_id: number;
  restaurante_id: number;
}