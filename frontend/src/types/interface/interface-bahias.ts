export interface BahiaBackend {
  id: string;
  nombre: string;
  ubicacion: { lat: number; lng: number };
  fotoUrl: string | null;
  fechaCreacion: string;
  
  creadoPor: { id: string; nombre: string } | null;
  rutas: { id: string; nombre: string }[];
}

export interface BahiaFrontend {
  id: string;
  nombre: string;
  ubicacion: { lat: number; lng: number };
  fechaCreacion: string;
  fotoUrl?: string;

  // Visualización
  creadoPorNombre: string;
  rutasTexto: string;

  // Formulario
  empleado_mti_id: string; // Select
  rutasIds: string[];      // Multiselect
  
  // Tags
  rutasTags: { value: string; label: string }[];
}