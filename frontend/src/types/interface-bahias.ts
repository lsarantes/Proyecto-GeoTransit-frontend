
export interface Bahias {
    id: string;
    posicion_ubicacion: { lat: number; lng: number };
    url_foto: string;
    fecha_creada: string;
    rutasAsociadas?: {value: string, label: string}[];
    empleado_mti?: empleado;
    pasajeros: string;
}



export interface empleado{
    value: string;
    label: string;
}