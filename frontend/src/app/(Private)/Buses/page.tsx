"use client";

import { useMemo } from "react";
import { CrudPage } from "@/components/crud/crud-page";
import { Bus, User, MapPin, Gauge, AlertTriangle, Calendar } from 'lucide-react';
import { FieldConfig, TableColumn } from "@/types/crud-interface-types";
import { DefaultStylesTableTitle, DefaultStylesTableContent } from "@/types/style-texto-tabla";
import { TypeLevel } from "@/types/type-level";
import { BusBackend, BusFrontend } from "@/types/interface/interface-buses";
import { useCrud } from "@/hook/useCrud";
import RoleGuard from "@/components/login/RoleGuard";
import { TD_NivelAcceso } from "@/types/interface/interface-user";

// ----------------------------------------------------------------------
// 1. MAPAS DE ESTADO (Traducción Frontend <-> Backend)
// ----------------------------------------------------------------------

// Mapa para mostrar en Tabla y Formulario (Backend -> Frontend Style)
const ESTADO_MAP: Record<string, { value: string; label: string; className?: string }> = {
  "ACTIVO": { 
    value: "positive", 
    label: "Activo (Operativo)", 
    className: "bg-green-100 text-green-700 border-green-200" 
  },
  "EN_MANTENIMIENDO": { 
    value: "regular", 
    label: "En Mantenimiento", 
    className: "bg-yellow-100 text-yellow-700 border-yellow-200" 
  },
  "FUERA_DE_SERVICIO": { 
    value: "negative", 
    label: "Fuera de Servicio", 
    className: "bg-red-100 text-red-700 border-red-200" 
  }
};

// Mapa inverso para enviar al Backend (Frontend Style -> Backend Enum)
const REVERSE_ESTADO_MAP: Record<string, string> = {
  "positive": "ACTIVO",
  "regular": "EN_MANTENIMIENDO",
  "negative": "FUERA_DE_SERVICIO"
};

export default function BusesPage() {
  
  // -------------------------------------------------------------------
  // 2. HOOKS (Carga de Datos)
  // -------------------------------------------------------------------
  
  // A. Datos Principales (Buses)
  const { 
    items: rawBuses, 
    loading, 
    createItem, 
    updateItem, 
    deleteItem 
  } = useCrud<BusBackend>("/buses", "buses-table-updated");

  // B. Datos Auxiliares (Conductores Dinámicos) 
  // Conectamos al endpoint real de conductores
  const { items: rawConductores } = useCrud<any>("/conductores", "conductores-table-updated");

  // Opciones estáticas para Selects
  const estadosBus = Object.values(ESTADO_MAP);
  
  const estadosUbicacion = [
      { value: "ACTUAL", label: "Ubicación Actual" },
      { value: "ULTIMA_CONOCIDA", label: "Última Conocida" },
      { value: "DESCONOCIDA", label: "Desconocida" }
  ];

  // -------------------------------------------------------------------
  // 3. TRANSFORMACIÓN DE DATOS (Backend -> Frontend)
  // -------------------------------------------------------------------

  const buses: BusFrontend[] = useMemo(() => {
    // Protección contra undefined
    if (!rawBuses) return [];

    return rawBuses.map((b) => {
      // Obtenemos la configuración de estilo basada en el enum del backend
      // Si el estado no existe en el mapa, usamos uno neutral por defecto
      const configEstado = ESTADO_MAP[b.estadoOperativo] || { 
          value: "neutral", 
          label: b.estadoOperativo 
      };

      return {
        id: b.placa, // La tabla genérica requiere 'id'
        placa: b.placa, // Campo visual
        modelo: b.modelo,
        capacidad: b.capacidad,
        velocidad: b.velocidad,
        
        // Visual: Nombre del conductor o fallback
        conductorNombre: b.conductor?.nombreCompleto || "Sin Conductor",
        
        // Visual: Estado con estilos para la columna 'textRelevante'
        // Pasamos el objeto configEstado completo ({ value, label, className })
        estadoTexto: configEstado as any, 
        
        ubicacionCoords: { lat: b.ubicacion.lat, lng: b.ubicacion.lng },

        // Formulario: Valores para edición
        conductor_id: b.conductor?.id || "",
        estado_bus: configEstado.value, // 'positive', 'negative', etc.
        estado_ubicacion: b.ubicacion.estado,
        fecha_ubicacion: b.ubicacion.ultimaActualizacion
      };
    });
  }, [rawBuses]);

  // 🔥 Generamos las opciones del Select de conductores dinámicamente
  const opcionesConductores = rawConductores 
    ? rawConductores.map((c: any) => ({ 
        value: c.id, 
        label: `${c.nombreCompleto} (${c.id})` 
      }))
    : [];

  // -------------------------------------------------------------------
  // 4. CONFIGURACIÓN DE COLUMNAS
  // -------------------------------------------------------------------
  const columns: TableColumn<BusFrontend>[] = [
    { 
      key: "id", 
      label: "Placa", 
      level: TypeLevel.id, 
      classNameTitle: DefaultStylesTableTitle.normalTitle, 
      classNameText: DefaultStylesTableContent.id, 
      Icon: Bus 
    },
    { 
      key: "modelo", 
      label: "Modelo", 
      level: TypeLevel.titulo, 
      classNameTitle: DefaultStylesTableTitle.normalTitle, 
      classNameText: DefaultStylesTableContent.titulo, 
      Icon: Bus 
    },
    { 
      key: "conductorNombre", 
      label: "Conductor", 
      level: TypeLevel.subtitulo, 
      classNameTitle: DefaultStylesTableTitle.normalTitle, 
      classNameText: DefaultStylesTableContent.subtitulo, 
      Icon: User 
    },
    { 
      key: "estadoTexto", 
      label: "Estado", 
      level: TypeLevel.textRelevante, // Usará los estilos del objeto estadoTexto
      classNameTitle: DefaultStylesTableTitle.normalTitle, 
      classNameText: DefaultStylesTableContent.resaltado, 
      Icon: AlertTriangle 
    },
    { 
      key: "capacidad", 
      label: "Pasajeros", 
      level: TypeLevel.textNormal, 
      classNameTitle: DefaultStylesTableTitle.normalTitle, 
      classNameText: DefaultStylesTableContent.text, 
      Icon: User 
    },
    { 
      key: "velocidad", 
      label: "km/h", 
      level: TypeLevel.textNormal, 
      classNameTitle: DefaultStylesTableTitle.normalTitle, 
      classNameText: DefaultStylesTableContent.text, 
      Icon: Gauge 
    },
    { 
      key: "ubicacionCoords", 
      label: "Ubicación", 
      level: TypeLevel.coordenada, 
      classNameTitle: DefaultStylesTableTitle.normalTitle, 
      classNameText: DefaultStylesTableContent.text, 
      Icon: MapPin 
    },
    { 
      key: "fecha_ubicacion", 
      label: "Ultima Actualizacion", 
      level: TypeLevel.fecha, 
      classNameTitle: DefaultStylesTableTitle.normalTitle, 
      classNameText: DefaultStylesTableContent.text, 
      Icon: Calendar },
    
  ];

  // -------------------------------------------------------------------
  // 5. CONFIGURACIÓN DEL FORMULARIO
  // -------------------------------------------------------------------
  const modalFields: FieldConfig<BusFrontend>[] = [
    { 
      key: "id", 
      isID: true,
      label: "Placa del Bus", 
      placeholder: "Ej. M 145-890", 
      type: "text", 
      layout: "grid", 
      validate: (v) => !v ? "Placa requerida" : null 
    },
    { 
      key: "modelo", 
      label: "Modelo / Marca", 
      placeholder: "Ej. Bluebird 2010", 
      type: "text", 
      layout: "grid", 
      validate: (v) => !v ? "Modelo requerido" : null 
    },
    
    { key: "capacidad", label: "Capacidad", type: "number", layout: "grid", validate: (v) => !v ? "Requerido" : null },
    { key: "velocidad", label: "Velocidad Actual", type: "number", layout: "grid" }, 

    // Estados (Usan los mapas definidos arriba)
    { 
      key: "estado_bus", 
      label: "Estado Operativo", 
      type: "select", 
      layout: "grid", 
      options: estadosBus 
    },
    { 
      key: "estado_ubicacion", 
      label: "Estado GPS", 
      type: "select", 
      layout: "grid", 
      options: estadosUbicacion 
    },

    { 
      key: "ubicacionCoords", 
      label: "Ubicación en Mapa", 
      type: "location", 
      layout: "full", 
      validate: (v: any) => (!v || v.lat === 0) ? "Marque ubicación" : null 
    },
    
    // 🔥 Selector de Conductores (Dinámico)
    { 
      key: "conductor_id", 
      label: "Conductor Asignado", 
      type: "select", 
      layout: "full", 
      options: opcionesConductores,
      validate: (val) => !val ? "Debe asignar un conductor" : null
    },
    
    { key: "fecha_ubicacion", label: "Fecha Ult. Ubi", type: "date", layout: "grid" }
  ];

  const searchKeys: (keyof BusFrontend)[] = ["id", "modelo", "conductorNombre"];

  // -------------------------------------------------------------------
  // 6. HANDLERS (Adaptadores Frontend -> Backend)
  // -------------------------------------------------------------------
  
  const handleCreate = async (formData: any) => {
    // Traducimos 'positive' -> 'ACTIVO' para el Backend
    const estadoBackend = REVERSE_ESTADO_MAP[formData.estado_bus] || "ACTIVO";
    
    const payload = {
      placa: formData.id, // Usamos el campo 'id' del form como 'placa'
      modelo: formData.modelo,
      velocidad: parseFloat(formData.velocidad || 0),
      capacidad_de_pasajeros: parseInt(formData.capacidad),
      latitud_actual: parseFloat(formData.ubicacionCoords?.lat || 0),
      longitud_actual: parseFloat(formData.ubicacionCoords?.lng || 0),
      fecha_hora_ultima_ubicacion: formData.fecha_ubicacion || new Date().toISOString(),
      
      estado_ubicacion: formData.estado_ubicacion || "ACTUAL",
      estado_bus: estadoBackend,
      conductor_id: formData.conductor_id 
    };
    await createItem(payload);
  };

  const handleUpdate = async (formData: any) => {
    // Traducimos 'positive' -> 'ACTIVO' para el Backend
    const estadoBackend = REVERSE_ESTADO_MAP[formData.estado_bus];
    
    const payload = {
      modelo: formData.modelo,
      velocidad: parseFloat(formData.velocidad),
      capacidad_de_pasajeros: parseInt(formData.capacidad),
      latitud_actual: parseFloat(formData.ubicacionCoords?.lat),
      longitud_actual: parseFloat(formData.ubicacionCoords?.lng),
      fecha_hora_ultima_ubicacion: formData.fecha_ubicacion,
      estado_ubicacion: formData.estado_ubicacion,
      estado_bus: estadoBackend,
      conductor_id: formData.conductor_id
    };
    await updateItem(formData.id, payload);
  };

  return (
    <RoleGuard 
      allowedRoles={[
        TD_NivelAcceso.Administrador, 
      ]}
    >
    <CrudPage<BusFrontend>
      title="Gestión de Flota (Buses)"
      subtitle="Monitoreo de unidades y asignación de conductores"
      Icon={Bus}
      identity="Bus"
      items={buses}
      columns={columns}
      searchKeys={searchKeys}
      modalFields={modalFields}
      verUbicacion={true}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={(id) => deleteItem(id)}
    />
    </RoleGuard>
  );
}