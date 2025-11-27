import { Bahias, empleado } from "@/types/interface/interface-bahias";
import { useState } from "react";

// --- TIPOS ADICIONALES (Prisma Enums) ---
type TD_Estado_Ubicacion = "ACTIVO" | "INACTIVO" | "DESCONOCIDO";
type TD_Estado_Bus = "OPERATIVO" | "MANTENIMIENTO" | "FUERA_DE_SERVICIO";

// Interfaz de la entidad Bus


export function useBahias() {
  // --- 1. Arrays de Datos de Ejemplo (20 Elementos c/u) ---

// 1. Identificadores únicos de las bahías (20 elementos)
const id: string[] = [
    "BAH-A01", "BAH-B02", "BAH-C03", "BAH-D04", "BAH-E05", "BAH-F06", "BAH-G07", "BAH-H08", "BAH-I09", "BAH-J10",
    "BAH-K11", "BAH-L12", "BAH-M13", "BAH-N14", "BAH-O15", "BAH-P16", "BAH-Q17", "BAH-R18", "BAH-S19", "BAH-T20",
];

// 2. Coordenadas de ubicación (Latitud)
// Nota: La estructura final es { lat: number; lng: number }
const latitud_actual: number[] = [
    12.1550, 12.1280, 12.0890, 12.1000, 12.1670, 12.1500, 12.1700, 12.1800, 12.1300, 12.1150,
    12.1450, 12.1600, 12.1050, 12.1100, 12.1750, 12.1350, 12.0950, 12.1850, 12.1200, 12.1400,
];

// 3. Coordenadas de ubicación (Longitud)
// Nota: La estructura final es { lat: number; lng: number }
const longitud_actual: number[] = [
    -86.2690, -86.2750, -86.2400, -86.3000, -86.2950, -86.2500, -86.2600, -86.2700, -86.2800, -86.2550,
    -86.2850, -86.2900, -86.2450, -86.3050, -86.2750, -86.2800, -86.2650, -86.2950, -86.2700, -86.2850,
];

// 4. URL de la foto de la bahía (20 elementos)
const url_foto: string[] = [
    "https://mifoto.com/bahia/mga-central.jpg", "https://mifoto.com/bahia/oriental-norte.jpg", "https://mifoto.com/bahia/nicaragua-libertad.jpg", 
    "https://mifoto.com/bahia/puerto-salida.jpg", "https://mifoto.com/bahia/metrocentro-parada.jpg", "https://mifoto.com/bahia/terminal-sur.jpg", 
    "https://mifoto.com/bahia/aeropuerto.jpg", "https://mifoto.com/bahia/universidad-1.jpg", "https://mifoto.com/bahia/mercado-huembes.jpg", 
    "https://mifoto.com/bahia/centro-historico.jpg", "https://mifoto.com/bahia/costanera.jpg", "https://mifoto.com/bahia/central-park.jpg", 
    "https://mifoto.com/bahia/city-mall.jpg", "https://mifoto.com/bahia/lago-xolotlan.jpg", "https://mifoto.com/bahia/puerto-cabezas.jpg", 
    "https://mifoto.com/bahia/san-juan-sur.jpg", "https://mifoto.com/bahia/masaya-park.jpg", "https://mifoto.com/bahia/leon-terminal.jpg", 
    "https://mifoto.com/bahia/granada-bus.jpg", "https://mifoto.com/bahia/chinandega.jpg",
];

// 5. Fecha de creación (20 elementos, formato string ISO)
const fecha_creada: string[] = [
    "2024-10-20T10:00:00Z", "2024-10-21T11:30:00Z", "2024-10-22T14:45:00Z", "2024-10-23T08:20:00Z", "2024-10-24T17:15:00Z",
    "2024-10-25T09:00:00Z", "2024-10-26T13:30:00Z", "2024-10-27T16:00:00Z", "2024-10-28T10:10:00Z", "2024-10-29T12:00:00Z",
    "2024-10-30T07:45:00Z", "2024-10-31T15:00:00Z", "2024-11-01T11:00:00Z", "2024-11-02T16:30:00Z", "2024-11-03T08:00:00Z",
    "2024-11-04T14:00:00Z", "2024-11-05T09:30:00Z", "2024-11-06T17:00:00Z", "2024-11-07T13:45:00Z", "2024-11-08T10:20:00Z",
];

// 6. Rutas Asociadas (20 elementos, tipo Array de objetos)
const rutasAsociadas = [
    { value: "R-101", label: "Managua - León" },
    { value: "R-102", label: "Managua - Granada" },
    { value: "R-103", label: "Managua - Masaya" },
    { value: "R-104", label: "Managua - Estelí" },
    { value: "R-105", label: "Managua - Chinandega" },
    { value: "R-106", label: "Managua - Rivas" },
    { value: "R-107", label: "Managua - Bluefields" },
    { value: "R-108", label: "Managua - Juigalpa" },
    { value: "R-109", label: "Managua - Puerto Cabezas" },
    { value: "R-110", label: "Managua - Jinotega" },
];



// 8. Nombre del Empleado MTI (20 elementos)
const empleado_mti: empleado[] = [
    { label: "Martín Alfonso D.", value: "EMP-365"  },
    { label: "Silvia Rosa E." , value: "EMP-366" },
 
    
];
// 9. Conteo de pasajeros (simulando cantidad en un día, 20 elementos)
const pasajeros: string[] = [
    "120", "95", "210", "55", "300", "150", "40", "88", "190", "65",
    "110", "135", "180", "70", "250", "160", "50", "105", "175", "90",
];
  // --- 2. Generación de Registros (15,000) ---


const getRandomrutas = () => {
      const shuffled = [...rutasAsociadas].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.floor(Math.random() * 7) + 1);
    };

  const stateBahias: Bahias[] = [];

  const ARRAY_LENGTH = id.length; // Usaremos 20

  for (let i = 0; i < 15000; i++) {
    const index = i % ARRAY_LENGTH;
    
    // Convertir el string de fecha a un objeto Date antes de asignarlo
    const dateString = fecha_creada[index];
    const ultimaUbicacionDate = new Date(dateString);
    
    stateBahias.push({
      id: id[index] + "-" + String(i + 1).padStart(5, '0'), 
      url_foto: url_foto[i % url_foto.length],
      pasajeros: pasajeros[i %pasajeros.length],
      empleado_mti: empleado_mti[Math.floor(Math.random() * empleado_mti.length)],
      // Coordenadas
      posicion_ubicacion:{
      lat: latitud_actual[i % latitud_actual.length],
      lng: longitud_actual[i % longitud_actual.length],
      },
      // Conversión resuelta
      fecha_creada: fecha_creada[i % fecha_creada.length], 
      rutasAsociadas: getRandomrutas(),
      
    });
  }

  // --- 3. Hook de Estado ---

  const [bahias, setBahias] = useState<Bahias[]>(stateBahias);

  return { bahias, setBahias, rutasAsociadas, empleado_mti,  }; 
}