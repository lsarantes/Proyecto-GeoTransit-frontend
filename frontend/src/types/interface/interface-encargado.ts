export interface EncargadoBackend {
  id: string; // ID Encargado
  personaId: string;
  nombreCompleto: string;
  nombres: string;
  apellidos: string;
  email: string;
  fotoUrl: string | null;
  fechaRegistro: string;
  cooperativas: { id: string; nombre: string }[];
}

export interface EncargadoFrontend {
  id: string; // id
  nombreCompleto: string; // Visual
  email: string;
  cooperativasTexto: string; // "Coop A, Coop B" (Para la tabla)
  fotoUrl?: string;
  
  // Para el formulario (Desglose de Persona)
  primer_nombre: string;
  segundo_nombre: string;
  tercer_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  
  cooperativasIds: string[]; // Para el multiselect
}