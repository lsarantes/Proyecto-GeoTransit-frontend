"use client";

import { useMemo } from "react";
import { CrudPage } from "@/components/crud/crud-page";
import { Warehouse, MapPin, Bus, UserCheck, Camera, Calendar } from 'lucide-react';
import { FieldConfig, TableColumn } from "@/types/crud-interface-types";
import { DefaultStylesTableTitle, DefaultStylesTableContent } from "@/types/style-texto-tabla";
import { TypeLevel } from "@/types/type-level";
import { BahiaBackend, BahiaFrontend } from "@/types/interface/interface-bahias";
import { useCrud } from "@/hook/useCrud";
import { RutaBackend } from "@/types/interface/interface-rutas";
import { IEmpleadoMti, TD_NivelAcceso } from "@/types/interface/interface-user";
import RoleGuard from "@/components/login/RoleGuard";

export default function BahiasPage() {
  
  // 1. HOOKS
  const { items: rawBahias, loading, createItem, updateItem, deleteItem } = 
    useCrud<BahiaBackend>("/bahias", "bahias-table-updated");

  // Auxiliares para Selects
  const { items: rawRutas } = useCrud<RutaBackend>("/rutas"); 
  // TODO: Crear endpoint de empleados MTI o usar usuario actual. 
  // Usamos array vacío temporalmente para no romper.
  const { items: rawEmpleados } =  useCrud<IEmpleadoMti>("/empleado-mti"); 

  // 2. TRANSFORMACIÓN
  const bahias: BahiaFrontend[] = useMemo(() => {
    return rawBahias.map((b) => ({
      id: b.id,
      nombre: b.nombre,
      ubicacion: b.ubicacion,
      fechaCreacion: b.fechaCreacion 
          ? b.fechaCreacion.split('T')[0] // Convierte "2025-11-27T04..." en "2025-11-27"
          : "",
      fotoUrl: b.fotoUrl || undefined,
      
      // Visual
      creadoPorNombre: b.creadoPor?.nombre || "Sistema",
      rutasTexto: b.rutas.map(r => r.nombre).join(', '),

      // Formulario
      empleado_mti_id: b.creadoPor?.id || "",
      rutasIds: b.rutas.map(r => r.id),

      // Tags
      rutasTags: b.rutas.map(r => ({ value: r.id, label: r.nombre })),
    }));
  }, [rawBahias]);

  const opcionesRutas = (rawRutas || []).map((r: RutaBackend) => ({ value: r.id, label: r.nombre }));
  const opcionesEmpleados = (rawEmpleados || []).map((e: IEmpleadoMti) => ({ value: e.id, label: e.nombreCompleto }));

  // 3. COLUMNAS
  const columns: TableColumn<BahiaFrontend>[] = [
    { key: "id", label: "ID", level: TypeLevel.id, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.id, Icon: Warehouse },
    { key: "fotoUrl", label: "Foto", level: TypeLevel.foto, classNameTitle: DefaultStylesTableTitle.centerTitle, classNameText: DefaultStylesTableContent.foto, Icon: Camera },
    { key: "nombre", label: "Nombre de Bahía", level: TypeLevel.titulo, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.titulo, Icon: Warehouse },
    { key: "creadoPorNombre", label: "Registrado Por", level: TypeLevel.subtitulo, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.subtitulo, Icon: UserCheck },
    { key: "rutasTags", label: "Rutas que pasan", level: TypeLevel.tags, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: "", Icon: Bus },
    { key: "ubicacion", label: "Ubicación", level: TypeLevel.coordenada, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: MapPin },
    { key: "fechaCreacion", label: "Registro", level: TypeLevel.fecha, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: Calendar },
    
  ];

  // 4. FORMULARIO
  const modalFields: FieldConfig<BahiaFrontend>[] = [
    { key: "id",isID: true, label: "Código Bahía", placeholder: "Ej. BAH-NTE-01", type: "text", layout: "grid", validate: (v) => !v ? "Requerido" : null },
    { key: "nombre", label: "Nombre del Punto", placeholder: "Ej. Parada UCA", type: "text", layout: "grid", validate: (v) => !v ? "Requerido" : null },
    
    { key: "ubicacion", label: "Ubicación Geográfica", type: "location", layout: "full", validate: (v: any) => (!v || v.lat === 0) ? "Marque en mapa" : null },
    
    // Select de Empleado (Temporalmente manual, luego puede ser automático del token)
    { key: "empleado_mti_id", label: "Empleado Responsable", type: "select", layout: "grid", options: opcionesEmpleados },
    
    { key: "rutasIds", label: "Rutas Asignadas", type: "multiselect", layout: "full", options: opcionesRutas },
    
    { key: "fotoUrl", label: "Fotografía", type: "photo", layout: "full" },
    { key: "fechaCreacion", label: "Fecha Registro", type: "date", layout: "grid" }
  ];

  const searchKeys: (keyof BahiaFrontend)[] = ["id", "nombre", "creadoPorNombre"];

  // 5. HANDLERS
  const handleCreate = async (formData: any) => {
    const payload = {
      id: formData.id,
      nombre_bahia: formData.nombre,
      ubicacion_latitud: parseFloat(formData.ubicacion?.lat || 0),
      ubicacion_longitud: parseFloat(formData.ubicacion?.lng || 0),
      fecha_creada: formData.fechaCreacion || new Date().toISOString(),
      url_foto: formData.fotoUrl || "",
      empleado_mti_id: formData.empleado_mti_id?.value || formData.empleado_mti_id, // Valor default si no hay select
      rutasIds: formData.rutasIds
    };
    await createItem(payload);
  };

  const handleUpdate = async (formData: any) => {
    const payload = {
      nombre_bahia: formData.nombre,
      ubicacion_latitud: parseFloat(formData.ubicacion?.lat),
      ubicacion_longitud: parseFloat(formData.ubicacion?.lng),
      fecha_creada: formData.fechaCreacion,
      url_foto: formData.fotoUrl,
      empleado_mti_id: formData.empleado_mti_id?.value || formData.empleado_mti_id,
      rutasIds: formData.rutasIds
    };
    await updateItem(formData.id, payload);
  };

  return (
    <RoleGuard 
      allowedRoles={[
        TD_NivelAcceso.Administrador, 
        TD_NivelAcceso.Gestor_de_bahias, 
      ]}
    >
    <CrudPage<BahiaFrontend>
      title="Gestión de Bahías"
      subtitle="Puntos de parada y abordaje autorizados"
      Icon={Warehouse}
      identity="Bahía"
      items={bahias}
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