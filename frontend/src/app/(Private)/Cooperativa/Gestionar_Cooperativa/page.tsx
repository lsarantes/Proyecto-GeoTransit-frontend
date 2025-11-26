"use client";

import { useState } from "react";
import {  useCooperativas } from "@/hook/generar-registro.tabla";
import { Bone, Building2, Calendar, Camera, Hash, MapIcon, MapPin, Phone, User, Zap } from 'lucide-react';
import { CrudPage } from "@/components/crud/crud-page";
import { DefaultStylesTableTitle, DefaultStylesTableContent } from "@/types/style-texto-tabla";
import { FieldConfig, TableColumn } from "@/types/crud-interface-types";
import { handleValidatedChange, REGEX_NUMBERS_AND_LETTERS_N_LATAM, REGEX_NUMBERS_AND_SYMBOLS, REGEX_ONLY_LETTERS_LATAM, REGEX_ONLY_NUMBERS } from "@/types/regular-expresion";
import { TypeLevel } from "@/types/type-level";

// 👇 Tipo de la entidad
export interface Cooperativa {
  id: string;
  nombre: string;
  encargado: string;
  telefono: string;
  direccion: string;
  ubicacion: { lat: number; lng: number };
  fechaCreacion: string;
  estado?: { value: string; label: string; className?: string };
  rutasAsociadas?: { value: string; label: string }[];
  fotoUrl?: string;
}


// 👇 Hook de ejemplo (tú ya lo tienes)

export default function CooperativasPage() {
  // Load items
   const { cooperativas, setCooperativas , rutasObjPosibles, estadosPosibles} = useCooperativas(); // Usamos el hook integrado
  const rutasDisponibles = rutasObjPosibles;
  const columns: TableColumn<Cooperativa>[] = [
    { key: "id", label: "ID", level: TypeLevel.id, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.id, Icon: Hash },
    { key: "fotoUrl", label: "Foto", level: TypeLevel.foto, classNameTitle: DefaultStylesTableTitle.centerTitle, classNameText: DefaultStylesTableContent.foto, Icon: Camera },
    { key: "nombre", label: "Nombre", level: TypeLevel.titulo, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.titulo, Icon: Building2 },
    { key: "encargado", label: "Encargado", level: TypeLevel.subtitulo, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.subtitulo, Icon: User },
    { key: "estado", label: "Estado", level: TypeLevel.textRelevante, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.resaltado, Icon: Zap },
    { key: "telefono", label: "Teléfono", level: TypeLevel.textNormal, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: Phone },
    { key: "fechaCreacion", label: "Registro", level: TypeLevel.fecha, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: Calendar },
    { key: "ubicacion", label: "Ubicación", level: TypeLevel.coordenada, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: MapIcon },
    { 
    key: "rutasAsociadas", // string[]
    label: "Rutas Asoc.", 
    level: TypeLevel.tags, // Usamos el nuevo nivel
    classNameTitle: "...", 
    classNameText: "..." ,
    Icon: MapIcon 
  },
  ];

  const modalFields: FieldConfig<Cooperativa>[] = [
    {
      key: "fotoUrl",
      label: "Fotografía",
      type: "photo",
      layout: "full"
    },
    {
      key: "nombre",
      label: "Nombre de la Cooperativa",
      placeholder: "Ej. Cooperativa Parrales Vallejos",
      type: "text",
      layout: "grid",
      pattern: REGEX_NUMBERS_AND_LETTERS_N_LATAM.source,
      validate: (val: any) => !val ? "Requerido" : null
    },
    {
      key: "encargado",
      label: "Encargado",
      placeholder: "Nombre completo",
      type: "text",
      layout: "grid"
    },
    {
      key: "fechaCreacion",
      label: "Fecha de Registro",
      type: "date",
      layout: "grid"
    },
    {
      key: "estado",
      label: "Estado Operativo",
      type: "select",
      layout: "grid",
      options: estadosPosibles
    },
    {
      key: "ubicacion",
      label: "Ubicación Geográfica",
      type: "location",
      layout: "full",
      validate: (val: any) => (!val || val.lat === 0) ? "Debe seleccionar una ubicación en el mapa" : null
    },
    {
      key: "rutasAsociadas", 
      label: "Asociar Rutas (Entidad 2)",
      type: "multiselect",
      layout: "full",
      options: rutasDisponibles
    }
  ];
  // ---------- SEARCH KEYS ----------
  const searchKeys: (keyof Cooperativa)[] = ["id", "encargado"];

  // ---------- HANDLERS ----------

  const onCreate = (data: any) => {
    // Generar coords aleatorias cerca de Managua para nuevos items
    const newItem = { 
        id: (cooperativas.length + 1).toString(), 
        ...data,
        ubicacion: data.ubicacion || { lat: 12.136389, lng: -86.251389 }
    };
    setCooperativas((prev) => [...prev, newItem]);
  };

  const onUpdate = (data: any) => {
    setCooperativas((prev) => prev.map((item) => (item.id === data.id ? data : item)));
  };

  const onDelete = (id: string) => {
    setCooperativas((prev) => prev.filter((item) => item.id !== id));
  };


  return (
    <CrudPage<Cooperativa>
      title="Gestión de Cooperativas"
      subtitle="Administra todas tus cooperativas en un solo lugar"
      Icon={Building2}
      identity="Cooperativa"
      items={cooperativas}
      columns={columns}
      searchKeys={searchKeys}
      modalFields={modalFields}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}
