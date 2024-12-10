export interface Table {
  mesa_id: number; // El identificador único de la mesa
  numero_mesa: number;
  capacidad: number;
  restaurante_id: number; // La referencia al restaurante al que pertenece la mesa
  disponible?: boolean; // Estado opcional de disponibilidad
}

export interface TableFormData {
  mesa_id?: number; // Opcional para identificar la mesa en caso de edición
  numero_mesa: number;
  capacidad: number;
  disponible?: boolean;
}