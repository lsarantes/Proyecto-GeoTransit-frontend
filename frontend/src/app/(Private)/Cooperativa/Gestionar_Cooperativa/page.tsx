"use client";

import { useMemo } from "react";
import { CrudPage } from "@/components/crud/crud-page";
import { 
  Building2, Hash, MapIcon, Phone, User, Calendar, Camera, MapPin 
} from 'lucide-react';

// Tipos y Estilos
import { FieldConfig, TableColumn } from "@/types/crud-interface-types";
import { DefaultStylesTableTitle, DefaultStylesTableContent } from "@/types/style-texto-tabla";
import { REGEX_NUMBERS_AND_LETTERS_N_LATAM } from "@/types/regular-expresion";
import { TypeLevel } from "@/types/type-level";
import { CooperativaBackend, CooperativaFrontend } from "@/types/interface/interface-cooperativa";
import { useCrud } from "@/hook/useCrud";

export default function CooperativasPage() {
  
  // ---------------------------------------------------------------------------
  // 1. CARGA DE DATOS (Hooks)
  // ---------------------------------------------------------------------------
  
  // A. Datos Principales (Cooperativas)
  const { 
    items: rawCooperativas, 
    loading, 
    createItem, 
    updateItem, 
    deleteItem 
  } = useCrud<CooperativaBackend>("/cooperativa", "cooperativas-table-updated");

  // B. Datos Auxiliares (Para los Selects del Formulario)
  // Asumimos que existen estos endpoints. Si no, vendrán vacíos y no rompen nada.
  const { items: rawEncargados } = useCrud<any>("/encargado"); 
  const { items: rawRutas } = useCrud<any>("/rutas"); 

  // ---------------------------------------------------------------------------
  // 2. TRANSFORMACIÓN DE DATOS (Backend -> Frontend)
  // ---------------------------------------------------------------------------

  // Mapeamos los datos crudos a la estructura plana que usa tu tabla
  const cooperativas: CooperativaFrontend[] = useMemo(() => {
    return rawCooperativas.map((coop) => ({
      id: coop.codigoCoop,
      nombre: coop.nombre_cooperativa,
      direccion: coop.direccion,
      telefono: coop.contacto.telefono.toString(),
      ubicacion: coop.ubicacion,
      fechaCreacion: coop.fechaCreacion,
      fotoUrl: coop.fotoUrl || undefined,
      
      // Aplanamos objetos para mostrar texto en la tabla
      encargadoNombre: coop.encargado?.nombreCompleto || "Sin Asignar",
      
      // Preparamos datos para el formulario (Edición)
      id_encargado: coop.encargado?.id || "",
      rutasIds: coop.rutas.map(r => r.id),
      
      // Etiquetas visuales para la columna tipo 'tags'
      rutasNombres: coop.rutas.map(r => ({ value: r.id, label: r.nombre }))
    }));
  }, [rawCooperativas]);

  // Preparamos opciones para los Selects
  const opcionesEncargados = rawEncargados.map((e: any) => ({
    value: e.id, // ID del Encargado (ej. ENC001)
    label: `${e.nombreCompleto} - ${e.personaId || 'S/ID'}`
}));

  const opcionesRutas = rawRutas.map((r: any) => ({
    value: r.nombre_ruta, // Asumiendo que nombre_ruta es el ID
    label: r.nombre_ruta,
  }));

  // ---------------------------------------------------------------------------
  // 3. CONFIGURACIÓN DE LA TABLA (Columnas)
  // ---------------------------------------------------------------------------
  
  const columns: TableColumn<CooperativaFrontend>[] = [
    { 
      key: "id", 
      label: "Cód", 
      level: TypeLevel.id, 
      classNameTitle: DefaultStylesTableTitle.normalTitle, 
      classNameText: DefaultStylesTableContent.id, 
      Icon: Hash 
    },
    { 
      key: "fotoUrl", 
      label: "Logo", 
      level: TypeLevel.foto, 
      classNameTitle: DefaultStylesTableTitle.centerTitle, 
      classNameText: DefaultStylesTableContent.foto, 
      Icon: Camera 
    },
    { 
      key: "nombre", 
      label: "Cooperativa", 
      level: TypeLevel.titulo, 
      classNameTitle: DefaultStylesTableTitle.normalTitle, 
      classNameText: DefaultStylesTableContent.titulo, 
      Icon: Building2 
    },
    { 
      key: "encargadoNombre", // Usamos el campo aplanado
      label: "Encargado", 
      level: TypeLevel.subtitulo, 
      classNameTitle: DefaultStylesTableTitle.normalTitle, 
      classNameText: DefaultStylesTableContent.subtitulo, 
      Icon: User 
    },
    { 
      key: "telefono", 
      label: "Contacto", 
      level: TypeLevel.textNormal, 
      classNameTitle: DefaultStylesTableTitle.normalTitle, 
      classNameText: DefaultStylesTableContent.text, 
      Icon: Phone 
    },
    { 
      key: "rutasNombres", // Array de {value, label}
      label: "Rutas", 
      level: TypeLevel.tags, // Tu nuevo nivel para arrays
      classNameTitle: DefaultStylesTableTitle.normalTitle, 
      classNameText: "...", 
      Icon: MapIcon 
    },
    { 
      key: "ubicacion", 
      label: "Ubicación", 
      level: TypeLevel.coordenada, 
      classNameTitle: DefaultStylesTableTitle.normalTitle, 
      classNameText: DefaultStylesTableContent.text, 
      Icon: MapPin 
    },
  ];

  // ---------------------------------------------------------------------------
  // 4. CONFIGURACIÓN DEL FORMULARIO (Campos Modal)
  // ---------------------------------------------------------------------------

  const modalFields: FieldConfig<CooperativaFrontend>[] = [
    {
      key: "id", // codigoCoop
      label: "Código Cooperativa",
      placeholder: "Ej. COOP-001",
      type: "text",
      layout: "grid",
      validate: (val) => !val ? "Código requerido" : null
    },
    {
      key: "nombre", // nombre_cooperativa
      label: "Nombre Oficial",
      placeholder: "Ej. Cooperativa Parrales Vallejos",
      type: "text",
      layout: "grid",
      pattern: REGEX_NUMBERS_AND_LETTERS_N_LATAM.source,
      validate: (val) => !val ? "Nombre requerido" : null
    },
    {
      key: "telefono", // no_telefonico
      label: "Teléfono",
      type: "number", // Input numérico
      layout: "grid",
      validate: (val) => !val ? "Requerido" : null
    },
    {
      key: "direccion", 
      label: "Dirección Física",
      type: "text",
      layout: "full",
    },
    {
      key: "id_encargado", // Enviamos el ID al backend
      label: "Encargado Asignado",
      type: "select",
      layout: "grid",
      options: opcionesEncargados // 🔥 Cargado dinámicamente
    },
    {
      key: "rutasIds", // Enviamos array de IDs al backend
      label: "Rutas Asignadas",
      type: "multiselect",
      layout: "full",
      options: opcionesRutas // 🔥 Cargado dinámicamente
    },
    {
      key: "ubicacion", // latitud_ubicacion, logitud_ubicacion
      label: "Ubicación de la Sede",
      type: "location",
      layout: "full",
      validate: (val: any) => (!val || val.lat === 0) ? "Seleccione ubicación" : null
    },
    {
      key: "fotoUrl", // url_foto_perfil
      label: "Logo / Foto",
      type: "photo",
      layout: "full"
    },
    {
      key: "fechaCreacion",
      label: "Fecha Fundación",
      type: "date",
      layout: "grid"
    }
  ];

  // Llaves para el buscador
  const searchKeys: (keyof CooperativaFrontend)[] = ["id", "nombre", "encargadoNombre"];

  // ---------------------------------------------------------------------------
  // 5. HANDLERS (Adaptadores Frontend -> Backend DTO)
  // ---------------------------------------------------------------------------

  const handleCreate = async (formData: any) => {
    // Convertimos los datos del Formulario al DTO que espera NestJS
    const payload = {
      codigoCoop: formData.id,
      nombre_cooperativa: formData.nombre,
      direccion: formData.direccion || "Sin dirección",
      cod_pais: "+505", // Default o campo extra
      latitud_ubicacion: parseFloat(formData.ubicacion?.lat || 0),
      logitud_ubicacion: parseFloat(formData.ubicacion?.lng || 0),
      no_telefonico: parseInt(formData.telefono),
      url_foto_perfil: formData.fotoUrl || "",
      fecha_de_creacion: formData.fechaCreacion || new Date().toISOString(),
      
      id_encargado: formData.id_encargado,
      rutasIds: formData.rutasIds // Array de strings
    };

    await createItem(payload);
  };

  const handleUpdate = async (formData: any) => {
    const payload = {
      nombre_cooperativa: formData.nombre,
      direccion: formData.direccion,
      latitud_ubicacion: parseFloat(formData.ubicacion?.lat),
      logitud_ubicacion: parseFloat(formData.ubicacion?.lng),
      no_telefonico: parseInt(formData.telefono),
      url_foto_perfil: formData.fotoUrl,
      fecha_de_creacion: formData.fechaCreacion,
      id_encargado: formData.id_encargado,
      rutasIds: formData.rutasIds
    };

    // formData.id es el 'codigoCoop' (PK)
    await updateItem(formData.id, payload);
  };

  return (
    <CrudPage<CooperativaFrontend>
      title="Gestión de Cooperativas"
      subtitle="Administra las empresas de transporte y sus recursos"
      Icon={Building2}
      identity="Cooperativa"
      items={cooperativas} // Datos procesados
      columns={columns}
      searchKeys={searchKeys}
      modalFields={modalFields}
      verUbicacion={true}
      // Conectamos los handlers adaptados
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={(id) => deleteItem(id)}
    />
  );
}