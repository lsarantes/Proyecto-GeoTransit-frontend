"use client";

import { useState } from "react";
import { useCooperativas } from "@/hook/generar-registro.tabla";
import { Bone, Building2, BusFront, Calendar1, Camera, CircleUser, Hash, IdCard, IdCardLanyard, MapPin, OctagonPause, Phone, User, UsersRound, Zap } from 'lucide-react';
import { CrudPage } from "@/components/crud/crud-page";
import { DefaultStylesTableTitle, DefaultStylesTableContent } from "@/types/style-texto-tabla";
import { FieldConfig, TableColumn } from "@/types/crud-interface-types";
import { handleValidatedChange, REGEX_NUMBERS_AND_LETTERS_N_LATAM, REGEX_NUMBERS_AND_SYMBOLS, REGEX_ONLY_LETTERS_LATAM, REGEX_ONLY_NUMBERS } from "@/types/regular-expresion";
import { TypeLevel } from "@/types/type-level";
import { Bahias } from "@/types/interface/interface-bahias";
import { useBahias } from "@/hook/generar-registro-bahias";


// 👇 Tipo de la entidad



// 👇 Hook de ejemplo (tú ya lo tienes)

export default function BahiasPage() {
  // Load items
  const { bahias, setBahias, rutasAsociadas, empleado_mti } = useBahias();

  // ---------- TABLE COLUMNS ----------
const columns: TableColumn<Bahias>[] = [
    { key: "id", label: "Nombre Bahia", level: TypeLevel.id, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.id, Icon: IdCardLanyard },
    { key: "posicion_ubicacion", label: "Ubicacion", level: TypeLevel.coordenada, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.titulo, Icon: OctagonPause },
    { key: "url_foto", label: "Foto", level: TypeLevel.foto, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.foto, Icon: Camera },
    { key: "fecha_creada", label: "Fecha creacion de bus", level: TypeLevel.fecha, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.fecha, Icon: Calendar1 },
    { key: "empleado_mti", label: "Empleado Mti", level: TypeLevel.textRelevante, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: CircleUser },    
    { key: "pasajeros", label: "Numero de usuario esperando", level: TypeLevel.textNormal, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: UsersRound },
    { 
    key: "rutasAsociadas", // string[]
    label: "rutas Asoc.", 
    level: TypeLevel.tags, // Usamos el nuevo nivel
    classNameTitle: "...", 
    classNameText: "..." ,
    Icon: BusFront 
  },

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
      key: "posicion_ubicacion",
      label: "latitud",
      placeholder: "40N°",
      type: "text",
      layout: "grid",
      validate: (value) => {
        if (!value || typeof value !== "string" || !value.trim()) {
          return "La ubicacion es requerido";
        }
        return null;
      }
    },
    {
      key: "url_foto",
      label: "Foto",
      type: "photo",
      layout: "full",
    },
       {
      key: "fecha_creada",
      label: "Fechas de integracion de bahia",
      placeholder: "20/02/2022",
      type: "date",
      layout: "grid",
    },
    {
      key: "empleado_mti",
      label: "Nombre del empleado",
      placeholder: "Jose jacinto Octavo",
      type: "select",
      layout: "grid",
      options:empleado_mti
    },
     {
      key: "pasajeros",
      label: "Gente en la bahia",
      placeholder: "23",
      type: "text",
      layout: "grid",
    },
    {
      key: "rutasAsociadas", 
      label: "Asociar Bahias",
      type: "multiselect",
      layout: "full",
      options: rutasAsociadas
    }


  ];

  // ---------- SEARCH KEYS ----------
  const searchKeys: (keyof Bahias)[] = ["id"];

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
