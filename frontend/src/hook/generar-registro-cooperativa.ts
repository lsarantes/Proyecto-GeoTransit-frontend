import { useState } from "react";

interface Cooperativa {
  id: string;
  nombre: string;
  encargado: string;
  rutas: number;
  telefono: string;
  direccion: string;
}

export function useCooperativas() {
  const baseCoops = [
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

  const encargados = [
    "Juan Pérez",
    "María García",
    "Carlos López",
    "Ana Rodríguez",
    "Roberto Martínez",
    "Isabel Santos",
    "Fernando Gómez",
    "Elena Fernández",
    "Diego Iglesias",
    "Sofía Herrera",
  ];

  const telefonos = [
    "+34 912 345 678",
    "+34 934 567 890",
    "+34 955 123 456",
    "+34 963 234 567",
    "+34 957 654 321",
    "+34 973 456 789",
    "+34 981 567 234",
    "+34 974 321 654",
    "+34 965 123 789",
    "+34 921 654 987",
  ];

  const direcciones = [
    "Calle Principal 123, Madrid",
    "Avenida del Norte 456, Barcelona",
    "Calle Sur 789, Sevilla",
    "Paseo Marítimo 234, Valencia",
    "Avenida de la Paz 567, Córdoba",
    "Calle Mayor 890, Zaragoza",
    "Playa de Riazor 111, La Coruña",
    "Carretera de Francia 222, Huesca",
    "Puerto Deportivo 333, Alicante",
    "Plaza Mayor 444, Segovia",
  ];

  const stateCoops: Cooperativa[] = [];

  for (let i = 0; i < 150; i++) {
    stateCoops.push({
      id: (i + 1).toString(),
      nombre: `Cooperativa ${baseCoops[i % baseCoops.length]}`,
      encargado: encargados[i % encargados.length],
      rutas: Math.floor(Math.random()*1000) + 1, // rutas entre 1 y 1000
      telefono: telefonos[i % telefonos.length],
      direccion: direcciones[i % direcciones.length],
    });
  }

  const [cooperativas, setCooperativas] = useState<Cooperativa[]>(stateCoops);

  return { cooperativas, setCooperativas };
}
