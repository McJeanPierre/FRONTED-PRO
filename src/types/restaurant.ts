export interface Restaurant {
  restaurante_id?: number;
  nombre_restaurante: string;
  direccion: string;
  telefono: string;
  email: string;
  descripcion: string;
  user_id?: number;
}

export interface RestaurantFormData {
  restaurante_id?: number
  nombre_restaurante: string;
  direccion: string;
  telefono: string;
  email: string;
  descripcion: string;
  user_id?: number;
}