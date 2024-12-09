export interface Table {
  id?: number;
  numero_mesa: number;
  capacidad: number;
  restaurante_id: number;
  disponible?: boolean;
}

export interface TableFormData {
  numero_mesa: number;
  capacidad: number;
  disponible?: boolean;
}