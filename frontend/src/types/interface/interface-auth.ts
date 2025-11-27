import { UserRole } from "../enum/enum-rol";

export interface LoginCredentials {
  // El usuario debe enviar un email o username (o ambos), y la contraseña
  username?: string; 
  email?: string;
  password: string;
}

// src/types/interface/interface-user.ts (Interfaz Unificada del Usuario de Sesión)

export interface IRolDetalle {
  tipo: 'MTI' | 'COOPERATIVA' | string;
  nivel?: string;
}

export interface ITelefono {
  id: number;
  no_telefonico: string;
  compania: string;
  persona_id: string;
}

export interface IPersonaProfile {
  id: string;
  nombres: string;
  apellidos: string;
  
  primer_nombre: string;
  segundo_nombre?: string | null;
  primer_apellido: string;
  segundo_apellido?: string | null;

  fotoUrl?: string | null;
  telefonos: ITelefono[];
}

export interface User {
  id_usuario: number;
  username: string;
  email: string;
  isActive: boolean;
  lastLogin: Date | string;
  
  role: string;
  detalles_rol: IRolDetalle | null; 

  persona: IPersonaProfile;
}



export interface AuthResponse {
  token: string; // El JWT
  user: User;    // Los datos del usuario (el objeto fusionado de arriba)
}

// Interfaz para manejar errores HTTP en el Frontend
export interface ApiError {
  message: string;
  // Usamos 'status' para que coincida con la propiedad que agregamos
  status: number; 
  error?: string;
}