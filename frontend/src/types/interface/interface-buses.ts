import { EstadosDefinidos } from "../types-stule-estado";

export interface Buses {
  id: string;
  modelo: string;
  velocidad: number;
  capacidad_de_pasajeros: number;
  posicion_actual: { lat: number; lng: number };
  fecha_hora_ultima_ubicacion: string;
  estado_ubicacion: Estados;
  estado_bus: Estados;
  conductoresAsociados?: { value: string; label: string }[];
}


export interface Estados{
  value: EstadosDefinidos;
  label: string;
  classname?: string;
}
