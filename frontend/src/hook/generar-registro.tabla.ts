import { EstadoOption } from "@/types/crud-interface-types";
import { EstadosDefinidos } from "@/types/types-stule-estado";
import { useState, useEffect } from "react";

// 1. Interfaz sincronizada con App.tsx
export interface Cooperativa {
  id: string;
  nombre: string;
  encargado: string;
  telefono: string;
  direccion: string;
  ubicacion: {
    lat: number;
    lng: number;
  };
  fotoUrl?: string;
  fechaCreacion: string;
  // Campos adicionales para las funciones avanzadas
  estado?: { label: string; value: EstadosDefinidos; className?: string };
  rutasAsociadas?: { value: string; label: string }[];
}


export function useCooperativas() {
  // Estado inicial vacío para evitar problemas de hidratación en Next.js
  const [cooperativas, setCooperativas] = useState<Cooperativa[]>([]);
  const rutasObjPosibles = [
      { value: "101", label: "Ruta 101 - Pista Suburbana" },
      { value: "102", label: "Ruta 102 - Carretera Norte" },
      { value: "114", label: "Ruta 114 - Mayoreo" },
      { value: "120", label: "Ruta 120 - Batahola" },
      { value: "133", label: "Ruta 133 - Mercado Ivan" },
      { value: "154", label: "Ruta 154 - Ciudad Sandino" }
    ];

    const estadosPosibles : EstadoOption[]=[
    { label: "Activo", value: "positive" },
    { label: "Mantenimiento", value: "regular" },
    { label: "Fuera de Servicio", value: "negative" },
    { label: "Desconectado", value: "neutral" },
    // Ejemplo personalizado
    { label: "VIP", value: "personalizado", className: "bg-purple-100 text-purple-700 border-purple-200" } 
];
  useEffect(() => {
    // Generación de datos solo en el cliente
    const baseCoops = [
      "Central", "del Norte", "del Sur", "del Levante", "Andaluza",
      "del Este", "Atlántica", "Pirenaica", "Mediterránea", "Castellana",
    ];

    const encargados = [
      "Juan Pérez", "María García", "Carlos López", "Ana Rodríguez", "Roberto Martínez",
      "Isabel Santos", "Fernando Gómez", "Elena Fernández", "Diego Iglesias", "Sofía Herrera",
    ];

    const telefonos = [
      "+34 912 345 678", "+34 934 567 890", "+34 955 123 456", "+34 963 234 567", "+34 957 654 321",
      "+34 973 456 789", "+34 981 567 234", "+34 974 321 654", "+34 965 123 789", "+34 921 654 987",
    ];

    const direcciones = [
      "Calle Principal 123, Madrid", "Avenida del Norte 456, Barcelona", "Calle Sur 789, Sevilla",
      "Paseo Marítimo 234, Valencia", "Avenida de la Paz 567, Córdoba", "Calle Mayor 890, Zaragoza",
      "Playa de Riazor 111, La Coruña", "Carretera de Francia 222, Huesca", "Puerto Deportivo 333, Alicante",
      "Plaza Mayor 444, Segovia",
    ];

    
    const getRandomRutas = () => {
      const shuffled = [...rutasObjPosibles].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.floor(Math.random() * 7) + 1);
    };



    // Helper para fechas
    const getRandomDate = () => {
      const start = new Date(2020, 0, 1);
      const end = new Date();
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0];
    };



    const stateCoops: Cooperativa[] = [];

    for (let i = 0; i < 150; i++) {
      // Centro aprox España: 40.41, -3.70 con dispersión
      const latBase = 40.4168;
      const lngBase = -3.7038;
      const randomLat = latBase + (Math.random() - 0.5) * 5;
      const randomLng = lngBase + (Math.random() - 0.5) * 5;

      stateCoops.push({
        id: (i + 1).toString(),
        nombre: `Cooperativa ${baseCoops[i % baseCoops.length]} ${i + 1}`,
        encargado: encargados[i % encargados.length],
        telefono: telefonos[i % telefonos.length],
        direccion: direcciones[i % direcciones.length],

        ubicacion: {
          lat: randomLat,
          lng: randomLng
        },
        // Foto estable basada en ID
        fotoUrl: `https://picsum.photos/seed/${i + 500}/200/200`,
        fechaCreacion: getRandomDate(),

        // Campos nuevos poblados
        estado: estadosPosibles[Math.floor(Math.random() * estadosPosibles.length)],
        rutasAsociadas: getRandomRutas()
      });
    }

    setCooperativas(stateCoops);
  }, []);

  return { cooperativas, setCooperativas, rutasObjPosibles, estadosPosibles };
}