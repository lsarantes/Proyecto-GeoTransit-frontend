// src/services/api.ts

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// Función wrapper para fetch que maneja la URL base y los headers por defecto
export const apiFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }), 
    ...options.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  // Aseguramos que la petición siempre inicie con /api para el proxy de Next.js
  const finalEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
  console.log(finalEndpoint)
  console.log(config)

  try {
    const response = await fetch(finalEndpoint, config);

    // Manejo de errores HTTP (400, 401, 500, etc.)
    if (!response.ok) {
      // Intentamos leer el cuerpo del error si existe, si no, devolvemos un objeto vacío
      const errorData = await response.json().catch(() => ({})); 
      throw new ApiError(errorData.message || 'Error en la petición', response.status);
    }

    // ✅ CORRECCIÓN FINAL: Si el backend envía 204 (Logout), retornamos null sin leer el cuerpo
    if (response.status === 204) return null as T;
    
    // Para todos los demás éxitos (200, 201), esperamos un cuerpo JSON
    return await response.json(); 
  } catch (error) {
    // Definimos qué errores NO son bugs (ej. contraseña incorrecta)
    const isExpectedError = error instanceof ApiError && (error.status === 401 || error.status === 403);

    if (!isExpectedError) {
      // Solo mostramos en consola los errores inesperados (red, 500, bug)
      console.error('API Error:', error); 
    }
    throw error;
  }
};