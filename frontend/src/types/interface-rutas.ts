export interface rutas {
    id: string;
    origen: { lat: number; lng: number };
    destino: { dlat: number; dlng: number };
    fecha_creacion: string;
    cooperativaAsociadas?:{ value: string; label: string }[];
    rutasAsociadas?: { value: string; label: string }[];
}