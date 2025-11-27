import { rutas } from "@/types/interface-rutas";
import { useState } from "react";


export function useRuta() {
  const id = [
    "RT-001", "RT-002", "RT-003", "RT-004", "RT-005", "RT-006", "RT-007", "RT-008", "RT-009", "RT-010",
    "RT-011", "RT-012", "RT-013", "RT-014", "RT-015", "RT-016", "RT-017", "RT-018", "RT-019", "RT-020",];

// Latitudes de Origen (Simulación de Managua y ciudades cercanas)
const origen_lat = [
    12.1550, 12.1280, 12.0890, 12.1000, 12.1670, 12.1500, 12.1700, 12.1800, 12.1300, 12.1150,
    12.1450, 12.1600, 12.1050, 12.1100, 12.1750, 12.1350, 12.0950, 12.1850, 12.1200, 12.1400,
];

// Longitudes de Origen
const origen_lng = [
    -86.2690, -86.2750, -86.2400, -86.3000, -86.2950, -86.2500, -86.2600, -86.2700, -86.2800, -86.2550,
    -86.2850, -86.2900, -86.2450, -86.3050, -86.2750, -86.2800, -86.2650, -86.2950, -86.2700, -86.2850,
];

// Latitudes de Destino (Simulación de ciudades nicaragüenses: León, Masaya, Granada, etc.)
const destino_lat  = [
    12.4350, 11.9676, 11.9287, 13.0805, 13.1026, 11.2587, 12.1264, 12.1465, 12.1465, 13.0500,
    12.2000, 13.0000, 11.9000, 12.5000, 13.2000, 11.5000, 12.3000, 12.0000, 13.3000, 11.7000,
];

// Longitudes de Destino
const destino_lng = [
    -86.8819, -86.0827, -85.9897, -85.9877, -86.3986, -85.8506, -86.2926, -86.2536, -86.2536, -87.1000,
    -86.5000, -86.0000, -86.1000, -86.6000, -87.0000, -85.8000, -86.9000, -86.3000, -87.2000, -86.0500,
];

// Fechas de Creación (Recientes y variadas)
const fecha_creacion = [
    "2024-01-15T08:00:00Z", "2024-02-20T09:30:00Z", "2024-03-10T11:00:00Z", "2024-04-05T14:20:00Z", "2024-05-12T16:45:00Z",
    "2024-06-01T10:00:00Z", "2024-07-18T13:30:00Z", "2024-08-25T16:00:00Z", "2024-09-02T10:10:00Z", "2024-10-10T12:00:00Z",
    "2024-10-15T09:00:00Z", "2024-10-20T11:30:00Z", "2024-10-25T14:00:00Z", "2024-11-01T08:30:00Z", "2024-11-05T17:00:00Z",
    "2024-11-10T10:45:00Z", "2024-11-15T12:30:00Z", "2024-11-20T15:00:00Z", "2024-11-25T09:15:00Z", "2024-11-30T16:30:00Z",
];

const cooperativaAsociadas = [
{ value: "COO-A01", label: "Coo. Transporte Metropolitano" },
    { value: "COO-A02", label: "Coo. Interurbana Central" },
    { value: "COO-A03", label: "Coo. Rivas y Frontera" },
    { value: "COO-A04", label: "Coo. Oriental de Managua" },
    { value: "COO-A05", label: "Coo. del Pacífico Norte (León)" },
    { value: "COO-A06", label: "Coo. Masaya y Volcanes" },
    { value: "COO-A07", label: "Coo. Norteña (Estelí)" },
    { value: "COO-A08", label: "Coo. de Jinotega" },
    { value: "COO-A09", label: "Coo. Ciudad Sandino Express" },
    { value: "COO-A10", label: "Coo. Costeña Atlántica" },    
];

const rutasAsociadas = [
    { value: "RUTA-10", label: "Ruta Managua - León (Expreso)" },
    { value: "RUTA-43", label: "Ruta Managua - Masaya (Local)" },
    { value: "RUTA-30", label: "Ruta Managua - Granada (Directo)" },
    { value: "RUTA-45", label: "Ruta Managua - Estelí" },
    { value: "RUTA-52", label: "Ruta Managua - Chinandega" },
    { value: "RUTA-60", label: "Ruta Managua - Rivas" },
    { value: "RUTA-77", label: "Ruta Managua - Juigalpa" },
    { value: "RUTA-81", label: "Ruta Managua - Jinotega" },
    { value: "RUTA-90", label: "Ruta Managua - Tipitapa" },
    { value: "RUTA-15", label: "Ruta Carretera Vieja León" },   
];



const getRandomcooperativas = () => {
      const shuffled = [...cooperativaAsociadas].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.floor(Math.random() * 7) + 1);
    };


const getRandomrutas = () => {
      const shuffled = [...rutasAsociadas].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.floor(Math.random() * 7) + 1);
    };

const stateRutas: rutas[] = [];

    for (let i = 0; i < 150; i++) {

     

      stateRutas.push({
        id: id[i % id.length]+i,
        origen: {
          lat: origen_lat[i % origen_lat.length],
          lng: origen_lng[i % origen_lng.length],
        },

        destino: {
          dlat: destino_lat[i % destino_lat.length],
          dlng: destino_lng[i % destino_lng.length],
        },
      
        // Campos nuevos poblados
        cooperativaAsociadas: getRandomcooperativas(),
        rutasAsociadas: getRandomrutas(),
        fecha_creacion: fecha_creacion [i % fecha_creacion.length],

      
      });
    }
  const [rutas, setRutas] = useState<rutas[]>(stateRutas);

  return { rutas, setRutas, cooperativaAsociadas, rutasAsociadas };
}
