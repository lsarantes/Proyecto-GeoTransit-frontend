import { apiFetch } from "./api"; // Tu apiFetch blindado

export const CrudService = {
  // Obtener todos (GET)
  getAll: async <T>(endpoint: string): Promise<T[]> => {
    return await apiFetch<T[]>(endpoint);
  },

  // Obtener uno por ID (GET)
  getOne: async <T>(endpoint: string, id: string | number): Promise<T> => {
    return await apiFetch<T>(`${endpoint}/${id}`);
  },

  // Crear (POST)
  create: async <T>(endpoint: string, data: any): Promise<T> => {
    return await apiFetch<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Actualizar (PATCH/PUT)
  update: async <T>(endpoint: string, id: string | number, data: any): Promise<T> => {
    return await apiFetch<T>(`${endpoint}/${id}`, {
      method: 'PATCH', // O 'PUT' según tu backend
      body: JSON.stringify(data),
    });
  },

  // Eliminar (DELETE)
  delete: async (endpoint: string, id: string | number): Promise<void> => {
    return await apiFetch<void>(`${endpoint}/${id}`, {
      method: 'DELETE',
    });
  },
};