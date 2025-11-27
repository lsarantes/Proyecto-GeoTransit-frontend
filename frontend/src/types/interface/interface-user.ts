// src/types/empleado.ts

export function NivelLable(nivel: string){
  if(TD_NivelAcceso.Administrador === nivel) {return "Administrador"}
  if(TD_NivelAcceso.Gestor_de_bahias === nivel){return "Gestor de Bahias"}
  if(TD_NivelAcceso.Gestor_de_cooperativas_y_encargados === nivel){return "Gestor de Cooperativas y encargasdos"}
  if(TD_NivelAcceso.Gestor_de_rutas === nivel){return "Gestor de Rutas"}
  return null
}

export enum TD_NivelAcceso {
  Administrador = "Administrador",
  Gestor_de_cooperativas_y_encargados = "Gestor_de_cooperativas_y_encargados",
  Gestor_de_rutas = "Gestor_de_rutas",
  Gestor_de_bahias = "Gestor_de_bahias",
}


export interface IEmpleadoMti {
  id: string; // ID manual (MTI-XXX)
  personaId: string;
  
  // Datos visuales
  nombreCompleto: string;
  nombres: string; // Primer + Segundos
  apellidos: string;
  email: string;
  username: string;
  fotoUrl?: string;
  
  // Control
  nivelAcceso: TD_NivelAcceso;
  estadoActivo: boolean; // El switch
  ultimoAcceso?: string;
  fechaRegistro: string;
}

// Para el formulario (lo que enviamos al crear/editar)
export interface IEmpleadoFormValues {
  id: string;
  primer_nombre: string;
  segundo_nombre?: string;
  tercer_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  email: string;
  nivel_acceso: TD_NivelAcceso;
  esta_activo?: boolean;
  password?: string; // Opcional (solo si queremos resetear)
  url_Foto?: string; // Opcional (solo si queremos resetear)
}