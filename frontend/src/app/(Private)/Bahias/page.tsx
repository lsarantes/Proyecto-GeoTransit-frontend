"use client";

import { useState } from "react";
import { useCooperativas } from "@/hook/generar-registro.tabla";
import { Bone, Building2, Hash, MapPin, Phone, User, Zap } from 'lucide-react';
import { CrudPage } from "@/components/crud/crud-page";
import { DefaultStylesTableTitle, DefaultStylesTableContent } from "@/types/style-texto-tabla";
import { FieldConfig, TableColumn } from "@/types/crud-interface-types";
import { handleValidatedChange, REGEX_NUMBERS_AND_LETTERS_N_LATAM, REGEX_NUMBERS_AND_SYMBOLS, REGEX_ONLY_LETTERS_LATAM, REGEX_ONLY_NUMBERS } from "@/types/regular-expresion";
import { TypeLevel } from "@/types/type-level";
import {useBahias} from "@/hook/generar-registro-bahias"

// 👇 Tipo de la entidad
interface Bahias {
  id: string;
  ubicacion_latitud: number;
  ubicacion_longitud: number;
  url_foto: string;
  fecha_creada: string;
  direccion: string;
}


// 👇 Hook de ejemplo (tú ya lo tienes)

export default function BahiasPage() {
  // Load items
  const { bahias, setBahias } = useBahias();

  // ---------- TABLE COLUMNS ----------
  const columns: TableColumn<Bahias>[] = [
    { key: "id", label: "ID", level: TypeLevel.id, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.id, Icon: Hash },
    { key: "ubicacion_latitud", label: "Origen Y", level: TypeLevel.titulo, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.titulo, Icon: Building2 },
    { key: "ubicacion_longitud", label: "Origen X", level: TypeLevel.subtitulo, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.subtitulo, Icon: User },
    { key: "url_foto", label: "Foto", level: TypeLevel.textRelevante, classNameTitle: DefaultStylesTableTitle.centerTitle, classNameText: DefaultStylesTableContent.resaltado, Icon: Zap },
    { key: "fecha_creada", label: "Fecha", level: TypeLevel.textNormal, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: Phone },
    { key: "direccion", label: "Dirección", level: TypeLevel.textNormal, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: MapPin },
  ];

  // ---------- MODAL FIELDS ----------
  const modalFields: FieldConfig<Bahias>[] = [
    {
      key: "id",
      label: "Nombre de la Bahia",
      placeholder: "Nombre de la Bahia",
      type: "number",
      layout: "grid",
      pattern: REGEX_NUMBERS_AND_LETTERS_N_LATAM.source,
      inputMode: "text",
      validate: (value) => {
        if (!value || typeof value !== "string" || !value.trim()) {
          return "El nombre de la bahia es requerido";
        }
        return null;
      }
    },
    {
      key: "ubicacion_latitud",
      label: "latitud",
      placeholder: "40N°",
      type: "text",
      layout: "grid",
      pattern: "",
      inputMode: "text",
      validate: (value) => {
        if (!value || typeof value !== "string" || !value.trim()) {
          return "La ubicacion de latitud es requerido";
        }
        return null;
      }
    },
    {
      key: "ubicacion_longitud",
      label: "longitud",
      placeholder: "30E°",
      type: "text",
      layout: "grid",
      pattern: "",
      inputMode: "text",
      validate: (value) => {
        if (value === null || value === undefined || value <= 0) {
          return "La ubicacion de longitud es requerida";
        }
        return null;
      }
    },
       {
      key: "url_foto",
      label: "Seleccione su foto",
      placeholder: "",
      type: "text",
      pattern:"",
      layout: "grid",
      inputMode:"search",
      validate: (value) =>{
        return null;
      }
    
    },
    {
      key: "direccion",
      label: "Dirección",
      placeholder: "Calle Principal 123, Ciudad",
      type: "text",
      layout: "full",
      pattern: "",
      inputMode: "text",
      validate: (value) => {
        if (!value || typeof value !== "string" || !value.trim()) {
          return "La dirección es requerida";
        }
        return null;
      }
    }
  ];

  // ---------- SEARCH KEYS ----------
  const searchKeys: (keyof Bahias)[] = ["id", "direccion"];

 const onCreate = (data: Omit<Bahias, "id">) => {
 console.log("CREAR:", data);
 
 const newItem: Bahias = {
 id: (bahias.length +1 ).toString(),
 ...data,
};
 // Tipado de 'prev'
 setBahias((prev: Bahias[]) => [...prev, newItem]);
 };
 const onUpdate = (data: Bahias) => {
 console.log("UPDATE:", data);
  setBahias((prev: Bahias[]) => // Tipado de 'prev'
   prev.map((item: Bahias) => (item.id === data.id ? data : item)) // Tipado de 'item'
 );
 };

 const onDelete = (id: string) => {
 console.log("DELETE:", id);

  setBahias((prev: Bahias[]) => prev.filter((item: Bahias) => item.id !== id)); // Tipado de 'prev' y 'item'
 };
// ... (código posterior)

  return (
    <CrudPage<Bahias>
      title="Gestión de Bahias"
      subtitle="Administra todas tus bahias en un solo lugar"
      Icon={Building2}
      identity="Bahias"
      items={bahias}
      columns={columns}
      searchKeys={searchKeys}
      modalFields={modalFields}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}
