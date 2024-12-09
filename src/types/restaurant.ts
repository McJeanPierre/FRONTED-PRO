export interface Restaurant {
  id?: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  user_id?: number;
}

export interface RestaurantFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  user_id?: number;
}