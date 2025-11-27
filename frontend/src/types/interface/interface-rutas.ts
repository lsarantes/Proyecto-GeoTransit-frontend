export interface RutaBackend {
  id: string;
  nombre: string;
  origen: { lat: number; lng: number };
  destino: { lat: number; lng: number };
  fechaCreacion: string;
  cooperativas: { id: string; nombre: string }[];
  bahias: { id: string; nombre: string }[];
}

export interface RutaFrontend {
  id: string;
  nombre: string;
  origen: { lat: number; lng: number };
  destino: { lat: number; lng: number };
  fechaCreacion: string;

  // Visualización
  cooperativasTexto: string; 
  bahiasTexto: string;

  // Para formularios
  cooperativasIds: string[];
  bahiasIds: string[];
  
  // Tags visuales
  cooperativasTags: { value: string; label: string }[];
  bahiasTags: { value: string; label: string }[];
}