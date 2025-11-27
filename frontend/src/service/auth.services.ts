// src/services/auth.service.ts

import { AuthResponse, LoginCredentials, User } from "@/types/interface/interface-auth";
import { apiFetch } from "./api";

// Claves para guardar en localStorage
const TOKEN_KEY = 'token';
const USER_KEY = 'user_data';

export const AuthService = {
  /**
   * Inicia sesión con credenciales (email/username + password)
   */
  login: async (credentials: string, password: string): Promise<AuthResponse> => {
    const payload: LoginCredentials = {
      password: password,
      email: credentials
    };

    // Llamada a la API usando nuestro wrapper
    // Nota: apiFetch ya maneja la URL base y errores HTTP
    const data = await apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    // Guardar la sesión automáticamente si el login es exitoso
    if (data.token) {
      AuthService.setSession(data);
    }

    return data;
  },

  /**
   * Cierra sesión limpiando el almacenamiento
   */
  logout: async () => {
    try {
      // 1. PRIMERO: Avisamos al servidor mientras aún tenemos el token
      // Usamos apiFetch que ya inyecta el token automáticamente
      await apiFetch('/auth/logout', { method: 'POST' });
      
    } catch (error) {
      // Si falla (ej. servidor caído o sin internet), no importa.
      // Solo lo logueamos y seguimos adelante para borrar los datos locales.
      console.warn("No se pudo notificar al servidor del logout", error);
    } finally {
      // 2. SEGUNDO: Limpiamos el navegador (ESTO SIEMPRE DEBE OCURRIR)
      if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
  },

  /**
   * Guarda el token y usuario en LocalStorage
   */
  setSession: (data: AuthResponse) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
  },

  /**
   * Obtiene el token actual (útil para interceptores o headers)
   */
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  /**
   * ✅ NUEVO MÉTODO: Obtiene el objeto Usuario ya parseado
   * Esto evita tener que hacer JSON.parse en el Contexto
   */
  getUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem(USER_KEY);
      if (!userStr) return null;
      
      try {
        return JSON.parse(userStr) as User;
      } catch (error) {
        console.error("Error al leer datos del usuario", error);
        return null;
      }
    }
    return null;
  },

  /**
   * Verifica si hay una sesión activa básica
   */
  isAuthenticated: (): boolean => {
    const token = AuthService.getToken();
    // Aquí podrías agregar lógica futura para verificar expiración del JWT
    return !!token; 
  }
};