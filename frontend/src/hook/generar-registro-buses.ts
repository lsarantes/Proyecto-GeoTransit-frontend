import { Buses, Estados } from "@/types/interface-buses";
import { useState } from "react";

export function useBuses() {

  const id = [
    "ABC-101", "DEF-202", "GHI-303", "JKL-404", "MNO-505", "PQR-606", "STU-707", "VWX-808", "YZA-909", "BCD-010",
    "EFG-111", "HIJ-222", "KLM-333", "NOP-444", "QRS-555", "TUV-666", "WXY-777", "ZAB-888", "CDE-999", "FGH-000", 
  ];

  const modelo = [
    "Volvo 9800", "Mercedes Benz O500RSD", "Irizar i8", "Scania K360", "Busscar Vissta", "Marcopolo Paradiso G8", "King Long XMQ6127", 
    "Yutong ZK6122H", "Man Lion's Coach", "Setra S 517 HD", "Volvo B8R", "Mercedes Benz Sprinter", "Blue Bird Vision", 
    "Freightliner C2", "Navistar IC Bus", "BYD K9", "Foton AUV", "Higer Bus", "Golden Dragon XML6122", "Chevrolet L-Max",
  ];

  const capacidad_de_pasajeros = [
    40, 45, 50, 55, 60, 42, 48, 52, 58, 62, 35, 41, 46, 51, 56, 61, 44, 49, 53, 59
  ];
  
  const latitud_actual = [
    40.4168, 41.3851, 37.3891, 39.4699, 43.2630, 36.7213, 42.8805, 39.5694, 38.3452, 41.6488,
    38.0000, 42.5000, 37.5000, 39.0000, 43.5000, 36.5000, 42.0000, 39.7500, 38.5000, 41.0000,
  ];

  const longitud_actual = [
    -3.7038, 2.1734, -5.9845, -0.3774, -2.9340, -4.4203, -8.5463, 2.6501, -0.4810, -0.8891,
    -1.5000, 0.5000, -6.0000, -0.7500, -3.2500, -5.5000, -9.0000, 2.0000, -1.0000, -0.5000,
  ];
  
  const velocidades = [
    10.5, 35.0, 5.2, 70.1, 85.9, 0.0, 55.4, 22.3, 48.7, 7.6,
    90.1, 15.3, 65.8, 1.1, 30.9, 75.0, 50.2, 88.0, 12.7, 60.5,
  ];

  const estadosBus: Estados[] = [
  { "value": "positive", "label": "OPERATIVO" },
  { "value": "regular", "label": "MANTENIMIENTO" },
  { "value": "negative", "label": "FUERA DE SERVICIO" },
 
];
    

  const estadosUbicacion: Estados[] = [
  { "value": "positive", "label": "ACTIVO" },
  { "value": "negative", "label": "INACTIVO" },
  { "value": "neutral", "label": "DESCONOCIDO" },
];
 
  const fechasUltimaUbicacion = [
    "2025-11-25 17:00:00", "2025-11-25 16:45:00", "2025-11-25 15:30:00", "2025-11-24 12:00:00", "2025-11-23 09:00:00",
    "2025-11-25 18:00:00", "2025-11-25 18:05:00", "2025-11-25 18:10:00", "2025-11-24 19:30:00", "2025-11-25 17:55:00",
    "2025-11-25 17:35:00", "2025-11-25 16:00:00", "2025-11-25 14:00:00", "2025-11-24 10:00:00", "2025-11-23 11:00:00",
    "2025-11-25 18:15:00", "2025-11-25 18:20:00", "2025-11-25 18:25:00", "2025-11-24 20:30:00", "2025-11-25 17:50:00",
  ];

  const conductoresAsociados = [
  { "value": "ID-C001", "label": "Juan Pérez García" },
  { "value": "ID-C002", "label": "María López Torres" },
  { "value": "ID-C003", "label": "Carlos Rodríguez Soto" },
  { "value": "ID-C004", "label": "Ana Martínez Ruiz" },
  { "value": "ID-C005", "label": "Luis González Hernández" },
  { "value": "ID-C006", "label": "Elena Fernández Díaz" },
  { "value": "ID-C007", "label": "Javier Ruiz Castro" },
  { "value": "ID-C008", "label": "Sofía Vargas Moya" },
  { "value": "ID-C009", "label": "Ricardo Mendoza Gil" },
  { "value": "ID-C010", "label": "Patricia Chávez Bravo" }
  ]



const getRandomconductores = () => {
      const shuffled = [...conductoresAsociados].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.floor(Math.random() * 7) + 1);
    };



const stateBuses: Buses[] = [];

    for (let i = 0; i < 150; i++) {

     

      stateBuses.push({
        id: id[i % id.length],
        modelo: modelo[i % modelo.length],
        velocidad: velocidades[i % velocidades.length],
        capacidad_de_pasajeros: capacidad_de_pasajeros[i % capacidad_de_pasajeros.length],
    

        posicion_actual: {
          lat: latitud_actual[i % latitud_actual.length],
          lng: longitud_actual[i % longitud_actual.length],
        },
      
        // Campos nuevos poblados
        estado_bus: estadosBus[i % estadosBus.length],
        conductoresAsociados: getRandomconductores(),
        estado_ubicacion: estadosUbicacion[i % estadosUbicacion.length],
        fecha_hora_ultima_ubicacion:fechasUltimaUbicacion [i % fechasUltimaUbicacion.length]
      
      });
    }

  const [buses, setBuses] = useState<Buses[]>(stateBuses);

  return { buses, setBuses, estadosBus, estadosUbicacion, conductoresAsociados }; 
}