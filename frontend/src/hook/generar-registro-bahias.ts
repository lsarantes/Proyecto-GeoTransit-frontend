import { useState } from "react";

// --- TIPOS ADICIONALES (Prisma Enums) ---
type TD_Estado_Ubicacion = "ACTIVO" | "INACTIVO" | "DESCONOCIDO";
type TD_Estado_Bus = "OPERATIVO" | "MANTENIMIENTO" | "FUERA_DE_SERVICIO";

// Interfaz de la entidad Bus
interface Bus {
  id: string; // Placa/ID
  modelo: string;
  velocidad: number;
  capacidad_de_pasajeros: number;
  latitud_actual: number;
  longitud_actual: number;
  fecha_hora_ultima_ubicacion: Date; 
  estado_ubicacion: TD_Estado_Ubicacion;
  estado_bus: TD_Estado_Bus;
}

export function useBuses() {
  // --- 1. Arrays de Datos de Ejemplo (20 Elementos c/u) ---

  const busIds = [
    "ABC-101", "DEF-202", "GHI-303", "JKL-404", "MNO-505", "PQR-606", "STU-707", "VWX-808", "YZA-909", "BCD-010",
    "EFG-111", "HIJ-222", "KLM-333", "NOP-444", "QRS-555", "TUV-666", "WXY-777", "ZAB-888", "CDE-999", "FGH-000", 
  ];

  const modelos = [
    "Volvo 9800", "Mercedes Benz O500RSD", "Irizar i8", "Scania K360", "Busscar Vissta", "Marcopolo Paradiso G8", "King Long XMQ6127", 
    "Yutong ZK6122H", "Man Lion's Coach", "Setra S 517 HD", "Volvo B8R", "Mercedes Benz Sprinter", "Blue Bird Vision", 
    "Freightliner C2", "Navistar IC Bus", "BYD K9", "Foton AUV", "Higer Bus", "Golden Dragon XML6122", "Chevrolet L-Max",
  ];

  const capacidades = [
    40, 45, 50, 55, 60, 42, 48, 52, 58, 62, 35, 41, 46, 51, 56, 61, 44, 49, 53, 59
  ];
  
  // Coordenadas iniciales variadas (Latitud)
  const latitud_actual = [
    40.4168, 41.3851, 37.3891, 39.4699, 43.2630, 36.7213, 42.8805, 39.5694, 38.3452, 41.6488,
    38.0000, 42.5000, 37.5000, 39.0000, 43.5000, 36.5000, 42.0000, 39.7500, 38.5000, 41.0000,
  ];

  // Coordenadas iniciales variadas (Longitud)
  const longitud_actual = [
    -3.7038, 2.1734, -5.9845, -0.3774, -2.9340, -4.4203, -8.5463, 2.6501, -0.4810, -0.8891,
    -1.5000, 0.5000, -6.0000, -0.7500, -3.2500, -5.5000, -9.0000, 2.0000, -1.0000, -0.5000,
  ];
  
  const velocidades = [
    10.5, 35.0, 5.2, 70.1, 85.9, 0.0, 55.4, 22.3, 48.7, 7.6,
    90.1, 15.3, 65.8, 1.1, 30.9, 75.0, 50.2, 88.0, 12.7, 60.5,
  ];

  // Alternamos entre estados del bus
  const estadosBus: TD_Estado_Bus[] = [
    "OPERATIVO", "OPERATIVO", "MANTENIMIENTO", "FUERA_DE_SERVICIO", "OPERATIVO", "OPERATIVO", "OPERATIVO", "MANTENIMIENTO", "OPERATIVO", "OPERATIVO",
    "OPERATIVO", "OPERATIVO", "FUERA_DE_SERVICIO", "MANTENIMIENTO", "OPERATIVO", "OPERATIVO", "OPERATIVO", "OPERATIVO", "FUERA_DE_SERVICIO", "OPERATIVO",
  ];
  
  // Alternamos entre estados de ubicación (GPS)
  const estadosUbicacion: TD_Estado_Ubicacion[] = [
    "ACTIVO", "ACTIVO", "INACTIVO", "ACTIVO", "ACTIVO", "INACTIVO", "ACTIVO", "DESCONOCIDO", "ACTIVO", "ACTIVO",
    "ACTIVO", "INACTIVO", "ACTIVO", "INACTIVO", "ACTIVO", "ACTIVO", "ACTIVO", "DESCONOCIDO", "ACTIVO", "ACTIVO",
  ];

  // Fechas recientes variadas
  const fechasUltimaUbicacionString = [
    "2025-11-25T17:00:00Z", "2025-11-25T16:45:00Z", "2025-11-25T15:30:00Z", "2025-11-24T12:00:00Z", "2025-11-23T09:00:00Z",
    "2025-11-25T18:00:00Z", "2025-11-25T18:05:00Z", "2025-11-25T18:10:00Z", "2025-11-24T19:30:00Z", "2025-11-25T17:55:00Z",
    "2025-11-25T17:35:00Z", "2025-11-25T16:00:00Z", "2025-11-25T14:00:00Z", "2025-11-24T10:00:00Z", "2025-11-23T11:00:00Z",
    "2025-11-25T18:15:00Z", "2025-11-25T18:20:00Z", "2025-11-25T18:25:00Z", "2025-11-24T20:30:00Z", "2025-11-25T17:50:00Z",
  ];

  // --- 2. Generación de Registros (15,000) ---

  const stateBuses: Bus[] = [];

  const ARRAY_LENGTH = busIds.length; // Usaremos 20

  for (let i = 0; i < 15000; i++) {
    const index = i % ARRAY_LENGTH;
    
    // Convertir el string de fecha a un objeto Date antes de asignarlo
    const dateString = fechasUltimaUbicacionString[index];
    const ultimaUbicacionDate = new Date(dateString);
    
    stateBuses.push({
      id: busIds[index] + "-" + String(i + 1).padStart(5, '0'), 
      modelo: modelos[index],
      velocidad: velocidades[index],
      capacidad_de_pasajeros: capacidades[index],
      
      // Coordenadas
      latitud_actual: latitud_actual[index],
      longitud_actual: longitud_actual[index],
      
      // Conversión resuelta
      fecha_hora_ultima_ubicacion: ultimaUbicacionDate, 
      
      // Estados
      estado_ubicacion: estadosUbicacion[index],
      estado_bus: estadosBus[index],
    });
  }

  // --- 3. Hook de Estado ---

  const [buses, setBuses] = useState<Bus[]>(stateBuses);

  return { buses, setBuses }; 
}