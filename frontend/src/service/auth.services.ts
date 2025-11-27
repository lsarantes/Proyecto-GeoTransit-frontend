// src/services/auth.service.ts

import { AuthResponse, LoginCredentials, User } from "@/types/interface/interface-auth";
import { apiFetch } from "./api";

// Claves para guardar en localStorage
const TOKEN_KEY = 'token';
const USER_KEY = 'user_data';

export const AuthService = {
  /**
   * Inicia sesión con credenciales
   */
  login: async (credentials: string, password: string): Promise<AuthResponse> => {
    const payload: LoginCredentials = {
      password: password,
      email: credentials
    };

    const data = await apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (data.token) {
      AuthService.setSession(data);
    }

    return data;
  },

  /**
   * Cierra sesión
   */
  logout: async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.warn("No se pudo notificar al servidor del logout", error);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
  },

  /**
   * Obtiene el perfil actualizado desde la BD (NO desde LocalStorage)
   */
  getProfile: async (): Promise<User> => {
    // Asume que apiFetch inyecta el token automáticamente
    return await apiFetch<User>('/auth/profile', { 
        method: 'GET' 
    });
  },

  /**
   * Guarda token y usuario (Login inicial)
   */
  setSession: (data: AuthResponse) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
  },

  /**
   * Actualiza solo los datos del usuario en LocalStorage (Sincronización)
   */
  updateLocalUser: (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  getUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem(USER_KEY);
      if (!userStr) return null;
      try {
        return JSON.parse(userStr) as User;
      } catch (error) {
        return null;
      }
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    const token = AuthService.getToken();
    return !!token; 
  }
};