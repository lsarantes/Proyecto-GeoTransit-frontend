import { Encargado } from "@/types/interface/interface-encargado";
import { useState } from "react";



export function useEncargado() {
  const correo = [
    "edgard@gmail.com",
    "edgard@gmail.com",
    "edgard@gmail.com",
    "edgard@gmail.com",
    "edgard@gmail.com",
    "edgard@gmail.com",
    "edgard@gmail.com",
    "edgard@gmail.com",
    "edgard@gmail.com",
    "edgard@gmail.com",
  ];

  const nombre = [
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

  const URL = [
    "https://robohash.org/edgard2?set=set4",
    "https://robohash.org/edgard2?set=set4",
    "https://robohash.org/edgard2?set=set4",
    "https://robohash.org/edgard2?set=set4",
    "https://robohash.org/edgard2?set=set4",
    "https://robohash.org/edgard2?set=set4",
    "https://robohash.org/edgard2?set=set4",
    "https://robohash.org/edgard2?set=set4",
    "https://robohash.org/edgard2?set=set4",
    "https://robohash.org/edgard2?set=set4",
  ];

  const rol = [
    "Encargado Cooperativa",
    "Gestos Bahias MTI",
    "Empleado MTI",
    "Gestor de rutas",
  ]

  const stateCoops: Encargado[] = [];

  for (let i = 0; i < 150; i++) {
    stateCoops.push({
      id: (i + 1).toString(),
      nombre: nombre[i % nombre.length],
      correo: correo[i % correo.length],
      direccion: direcciones[i % direcciones.length],
      telefono: telefonos[i % telefonos.length],
      foto: URL[i % URL.length], 
      rol: rol[i % rol.length],
    });
  }

  const [encargado, setEncargado] = useState<Encargado[]>(stateCoops);

  return { encargado, setEncargado, rol };
}