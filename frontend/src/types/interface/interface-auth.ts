import { UserRole } from "../enum/enum-rol";

export interface LoginCredentials {
  // El usuario debe enviar un email o username (o ambos), y la contraseña
  username?: string; 
  email?: string;
  password: string;
}

// ⚠️ Esta es la interfaz del objeto fusionado que recibes al loguearte
export interface User {
  // ID numérico principal (mapeado de foundUser.id_usuario)
  id: number; 
  id_usuario: number; // El nombre del PK de la BD (para consistencia)
  
  username: string;
  email: string;
  
  // Datos del perfil (fusionados de la tabla Persona)
  nombre: string;
  apellido?: string; 
  role: UserRole;
  
  // Estado de la sesión (para el seguimiento con WebSocket)
  estaActivo: boolean; 
  
  // Datos del usuario (opcional si existe en el merge)
  nombreCompleto?: string; 
  
  // Opcional: f_ultimo_acceso
  f_ultimo_acceso?: string | Date;
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