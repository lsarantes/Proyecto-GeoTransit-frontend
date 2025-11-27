export interface BusBackend {
  placa: string;
  modelo: string;
  capacidad: number;
  velocidad: number;
  ubicacion: {
    lat: number;
    lng: number;
    ultimaActualizacion: string;
    estado: "ACTUAL" | "ULTIMA_CONOCIDA" | "DESCONOCIDA";
  };
  estadoOperativo: "ACTIVO" | "EN_MANTENIMIENDO" | "FUERA_DE_SERVICIO";
  conductor: { id: string; nombreCompleto: string } | null;
}

export interface BusFrontend {
  id: string; // Placa (Mapeado para la tabla genérica que espera 'id')
  placa: string; // Visual
  modelo: string;
  capacidad: number;
  velocidad: number;
  
  // Visual
  conductorNombre: string;
  estadoTexto: string;
  ubicacionCoords: { lat: number; lng: number };
  
  // Formulario
  conductor_id: string;
  estado_bus: string;
  estado_ubicacion: string;
  fecha_ubicacion: string;
}