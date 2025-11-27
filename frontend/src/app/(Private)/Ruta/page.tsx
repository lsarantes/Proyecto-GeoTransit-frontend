"use client";

import { useMemo } from "react";
import { CrudPage } from "@/components/crud/crud-page";
import { Map, MapPin, Calendar, Bus, Warehouse } from 'lucide-react';
import { FieldConfig, TableColumn } from "@/types/crud-interface-types";
import { DefaultStylesTableTitle, DefaultStylesTableContent } from "@/types/style-texto-tabla";
import { TypeLevel } from "@/types/type-level";
import { RutaBackend, RutaFrontend } from "@/types/interface/interface-rutas";
import { useCrud } from "@/hook/useCrud";
import { CooperativaBackend } from "@/types/interface/interface-cooperativa";
import { BahiaBackend } from "@/types/interface/interface-bahias";
import RoleGuard from "@/components/login/RoleGuard";
import { TD_NivelAcceso } from "@/types/interface/interface-user";

export default function RutasPage() {
  
  // 1. HOOKS (Datos principales y auxiliares)
  const { items: rawRutas, loading, createItem, updateItem, deleteItem } = 
    useCrud<RutaBackend>("/rutas", "rutas-table-updated");

  const { items: rawCoops } = useCrud<CooperativaBackend>("/cooperativa");
  const { items: rawBahias } = useCrud<BahiaBackend>("/bahias"); // Asegúrate que exista este endpoint en backend cuando hagamos Bahias

  // 2. TRANSFORMACIÓN
  const rutas: RutaFrontend[] = useMemo(() => {
    return rawRutas.map((r) => ({
      id: r.id,
      nombre: r.nombre,
      origen: r.origen,
      destino: r.destino,
      fechaCreacion: r.fechaCreacion 
          ? r.fechaCreacion.split('T')[0] // Convierte "2025-11-27T04..." en "2025-11-27"
          : "",
      
      // Texto plano para tabla
      cooperativasTexto: r.cooperativas.map(c => c.nombre).join(', '),
      bahiasTexto: r.bahias.map(b => b.nombre).join(', '),

      // Datos para formulario
      cooperativasIds: r.cooperativas.map(c => c.id),
      bahiasIds: r.bahias.map(b => b.id),

      // Tags para tabla visual
      cooperativasTags: r.cooperativas.map(c => ({ value: c.id, label: c.nombre })),
      bahiasTags: r.bahias.map(b => ({ value: b.id, label: b.nombre })),
    }));
  }, [rawRutas]);

 

  // Opciones para Selects
  const opcionesCoops = (rawCoops || []).map((c: CooperativaBackend) => ({ value: c.codigoCoop, label: c.nombre_cooperativa }));
  const opcionesBahias = (rawBahias || []).map((b: BahiaBackend) => ({ value: b.id, label: b.nombre }));

  // 3. COLUMNAS
  const columns: TableColumn<RutaFrontend>[] = [
    { key: "id", label: "Ruta", level: TypeLevel.id, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.id, Icon: Bus },
    { key: "nombre", label: "Descripción", level: TypeLevel.titulo, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.titulo, Icon: Map },
    
    // Tags para Cooperativas
    { key: "cooperativasTags", label: "Cooperativas", level: TypeLevel.tags, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: "", Icon: Bus },
    { key: "fechaCreacion", label: "Registro", level: TypeLevel.fecha, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: Calendar },
    
    // Tags para Bahías (Opcional, o texto si son muchas)
    { key: "bahiasTags", label: "Paradas (Bahías)", level: TypeLevel.tags, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: "", Icon: Warehouse },
    
    { key: "origen", label: "Origen", level: TypeLevel.coordenada, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: MapPin },
    { key: "destino", label: "Destino", level: TypeLevel.coordenada, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: MapPin },
  ];

  // 4. FORMULARIO
  const modalFields: FieldConfig<RutaFrontend>[] = [
    { key: "id",isID: true, label: "N° Ruta", placeholder: "Ej. 104", type: "text", layout: "grid", validate: (v) => !v ? "Requerido" : null },
    { key: "nombre", label: "Nombre Descriptivo", placeholder: "Ej. UCA - Subasta", type: "text", layout: "grid", validate: (v) => !v ? "Requerido" : null },
    
    // Ubicaciones
    { key: "origen", label: "Punto de Origen (Inicio)", type: "location", layout: "full", validate: (v: any) => (!v || v.lat === 0) ? "Marque origen" : null },
    { key: "destino", label: "Punto de Destino (Final)", type: "location", layout: "full", validate: (v: any) => (!v || v.lat === 0) ? "Marque destino" : null },
    
    // Relaciones
    { key: "cooperativasIds", label: "Cooperativas Asignadas", type: "multiselect", layout: "full", options: opcionesCoops },
    { key: "bahiasIds", label: "Bahías (Paradas) de la Ruta", type: "multiselect", layout: "full", options: opcionesBahias },
    
    { key: "fechaCreacion", label: "Fecha Registro", type: "date", layout: "grid" }
  ];

  const searchKeys: (keyof RutaFrontend)[] = ["id", "nombre", "cooperativasTexto"];

  // 5. HANDLERS
  const handleCreate = async (formData: any) => {
    const payload = {
      id: formData.id,
      nombre_ruta: formData.nombre,
      origen_latitud: parseFloat(formData.origen?.lat || 0),
      origen_longitud: parseFloat(formData.origen?.lng || 0),
      destino_latitud: parseFloat(formData.destino?.lat || 0),
      destino_longitud: parseFloat(formData.destino?.lng || 0),
      fecha_creacion: formData.fechaCreacion || new Date().toISOString(),
      cooperativasIds: formData.cooperativasIds,
      bahiasIds: formData.bahiasIds
    };
    await createItem(payload);
  };

  const handleUpdate = async (formData: any) => {
    const payload = {
      nombre_ruta: formData.nombre,
      origen_latitud: parseFloat(formData.origen?.lat),
      origen_longitud: parseFloat(formData.origen?.lng),
      destino_latitud: parseFloat(formData.destino?.lat),
      destino_longitud: parseFloat(formData.destino?.lng),
      fecha_creacion: formData.fechaCreacion,
      cooperativasIds: formData.cooperativasIds,
      bahiasIds: formData.bahiasIds
    };
    await updateItem(formData.id, payload);
  };

  return (
     <RoleGuard 
          allowedRoles={[
            TD_NivelAcceso.Administrador, 
            TD_NivelAcceso.Gestor_de_rutas, 
          ]}
        >
    <CrudPage<RutaFrontend>
      title="Gestión de Rutas"
      subtitle="Administra trayectos, orígenes, destinos y asignaciones"
      Icon={Map}
      identity="Ruta"
      items={rutas}
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