// 1. Lo que llega DIRECTAMENTE del Backend (NestJS)
export interface CooperativaBackend {
  codigoCoop: string; // PK
  nombre_cooperativa: string;
  direccion: string;
  ubicacion: {
    lat: number;
    lng: number;
  };
  contacto: {
    telefono: number;
    pais: string | null;
  };
  fotoUrl: string | null;
  fechaCreacion: string; // ISO Date
  
  // Objetos anidados (Relaciones)
  encargado: {
    id: string;
    nombreCompleto: string;
    fotoUrl: string | null;
  };
  rutas: {
    id: string;
    nombre: string;
  }[];
}

// 2. Lo que tu Tabla Genérica y Formulario esperan (Aplanado)
export interface CooperativaFrontend {
  id: string; // Mapeado de codigoCoop
  nombre: string;
  direccion: string;
  telefono: string;
  ubicacion: { lat: number; lng: number };
  fechaCreacion: string;
  fotoUrl?: string;

  // Campos visuales aplanados
  encargadoNombre: string; 
  
  // Campos lógicos para el Formulario (IDs)
  id_encargado: string; // Para el Select
  rutasIds: string[];   // Para el Multiselect (IDs)
  
  // Visualización de etiquetas
  rutasNombres: { value: string; label: string }[]; 
}