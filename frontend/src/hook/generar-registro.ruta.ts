import { useState } from "react";

interface Ruta {
  id: string;
  origen_latitud: number;
  origen_longitud: number;
  destino_latitud: number;
  destino_longitud: number;
  fecha_de_creacion: string;
}


export function userRuta() {
  const id = [
    "Central",
    "del Norte",
    "del Sur",
    "del Levante",
    "Andaluza",
    "del Este",
    "Atlántica",
    "Pirenaica",
    "Mediterránea",
    "Castellana",
  ];

 const origen_latitud = [
  40.4168, // Madrid
  41.3851, // Barcelona
  37.3891, // Sevilla
  39.4699, // Valencia
  43.2630, // Bilbao
  36.7213, // Málaga
  42.8805, // Santiago de Compostela
  39.5694, // Palma de Mallorca
  38.3452, // Alicante
  41.6488, // Zaragoza
];

const origen_longitud = [
  -3.7038, // Madrid
  2.1734,  // Barcelona
  -5.9845, // Sevilla
  -0.3774, // Valencia
  -2.9340, // Bilbao
  -4.4203, // Málaga
  -8.5463, // Santiago de Compostela
  2.6501,  // Palma de Mallorca
  -0.4810, // Alicante
  -0.8891, // Zaragoza
];

const destino_latitud = [
  40.4168, // Madrid (mismo origen)
  39.5694, // Palma de Mallorca (destino diferente)
  41.6488, // Zaragoza (destino diferente)
  40.4168, // Madrid (destino diferente)
  37.3891, // Sevilla (destino diferente)
  42.8805, // Santiago de Compostela (destino diferente)
  39.4699, // Valencia (destino diferente)
  43.2630, // Bilbao (destino diferente)
  41.3851, // Barcelona (destino diferente)
  38.3452, // Alicante (destino diferente)
];

const destino_longitud = [
  -3.7038, // Madrid (mismo origen)
  2.6501,  // Palma de Mallorca (destino diferente)
  -0.8891, // Zaragoza (destino diferente)
  -3.7038, // Madrid (destino diferente)
  -5.9845, // Sevilla (destino diferente)
  -8.5463, // Santiago de Compostela (destino diferente)
  -0.3774, // Valencia (destino diferente)
  -2.9340, // Bilbao (destino diferente)
  2.1734,  // Barcelona (destino diferente)
  -0.4810, // Alicante (destino diferente)
];

const fecha_de_creacion = [
  "2023-11-01T10:00:00Z",
  "2023-11-05T14:30:00Z",
  "2023-11-10T08:15:00Z",
  "2023-11-15T19:45:00Z",
  "2023-11-18T12:00:00Z",
  "2023-11-20T21:05:00Z",
  "2023-11-22T06:50:00Z",
  "2023-11-25T17:25:00Z",
  "2023-11-28T09:00:00Z",
  "2023-12-01T11:10:00Z",
];




  const stateCoops: Ruta[] = [];

  for (let i = 0; i < 15000; i++) {
    // 1. Obtener la cadena de fecha usando el módulo
    const dateString = fecha_de_creacion[i % fecha_de_creacion.length];
    const dateObject = new Date(dateString);
    stateCoops.push({
      id: id[i % id.length]+i,
      origen_latitud: origen_latitud[i % origen_latitud.length],
      origen_longitud: origen_longitud[i % origen_longitud.length],
      destino_latitud: destino_latitud[i % destino_latitud.length],
      destino_longitud: destino_longitud[i % destino_longitud.length],
      fecha_de_creacion: dateString ,
    });
  }

  const [rutas, setRutas] = useState<Ruta[]>(stateCoops);

  return { rutas, setRutas };
}
