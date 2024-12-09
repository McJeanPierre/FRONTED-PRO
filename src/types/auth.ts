export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role_id: number;
}

export interface AuthResponse {
  usuario: User;
  access_token: string;
  token_type: string;
}