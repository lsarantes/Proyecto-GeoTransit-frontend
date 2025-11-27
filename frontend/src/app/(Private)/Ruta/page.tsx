"use client";

import { useState } from "react";
import { useCooperativas } from "@/hook/generar-registro.tabla";
import { Bone, Building2, BusFront, Calendar, Hash, House, HouseHeart, IdCardIcon, MapPin, Phone, User, Users, Zap } from 'lucide-react';
import { CrudPage } from "@/components/crud/crud-page";
import { DefaultStylesTableTitle, DefaultStylesTableContent } from "@/types/style-texto-tabla";
import { FieldConfig, TableColumn } from "@/types/crud-interface-types";
import { handleValidatedChange, REGEX_NUMBERS_AND_LETTERS_N_LATAM, REGEX_NUMBERS_AND_SYMBOLS, REGEX_ONLY_LETTERS_LATAM, REGEX_ONLY_NUMBERS } from "@/types/regular-expresion";
import { TypeLevel } from "@/types/type-level";
import { rutas } from "@/types/interface-rutas";
import { useRuta } from "@/hook/generar-registro.ruta";





// 👇 Hook de ejemplo (tú ya lo tienes)

export default function RutaPage() {
  // Load items
  const { rutas, setRutas, cooperativaAsociadas, rutasAsociadas } = useRuta();

  // ---------- TABLE COLUMNS ----------
  const columns: TableColumn<rutas>[] = [
    { key: "id", label: "Nombre de Ruta", level: TypeLevel.id, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.id, Icon: IdCardIcon },
    { key: "origen", label: "Origen de la ruta", level: TypeLevel.coordenada, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.titulo, Icon: House },
    { key: "destino", label: "Destino de la ruta", level: TypeLevel.coordenada, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.subtitulo, Icon: HouseHeart },
    { key: "fecha_creacion", label: "Fecha", level: TypeLevel.textNormal, classNameTitle: DefaultStylesTableTitle.centerTitle, classNameText: DefaultStylesTableContent.fecha, Icon: Calendar },
    { key: "cooperativaAsociadas", label: "Cooperativa", level: TypeLevel.textRelevante, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: Users },
    { key: "rutasAsociadas", label: "Ruta", level: TypeLevel.textRelevante, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: BusFront },
  ];

  // ---------- MODAL FIELDS ----------
  const modalFields: FieldConfig<rutas>[] = [
    {
      key: "id",
      label: "Nombre de la Ruta",
      placeholder: "Nombre de la Ruta",
      type: "text",
      layout: "full",
      pattern: REGEX_NUMBERS_AND_LETTERS_N_LATAM.source,
      inputMode: "text",
      validate: (value) => {
        if (!value || typeof value !== "string" || !value.trim()) {
          return "El nombre es requerido";
        }
        return null;
      }
    },
    {
      key: "origen",
      label: "Origen de la ubicacion",
      type: "location",
      layout: "full",
      validate: (val: any) => (!val || val.lat === 0) ? "Debe seleccionar una ubicación de origen en el mapa" : null
    },
    {
      key: "destino",
      label: "Destino de la ubicacion",
      type: "location",
      layout: "full",
      validate: (val: any) => (!val || val.lat === 0) ? "Debe seleccionar una ubicación de destino en el mapa" : null
    },
  {
      key: "fecha_creacion",
      label: "Fecha de Registro",
      type: "date",
      layout: "grid"
    },
    {
      key: "rutasAsociadas", 
      label: "Asociar Rutas ",
      type: "multiselect",
      layout: "full",
      options: rutasAsociadas
    },
    {
      key: "cooperativaAsociadas", 
      label: "Asociar Rutas",
      type: "multiselect",
      layout: "full",
      options: cooperativaAsociadas
    }

  ];

  // ---------- SEARCH KEYS ----------
  const searchKeys: (keyof rutas)[] = ["id"];

  // ---------- HANDLERS ----------
  const onCreate = (data: Omit<rutas, "id">) => {
    console.log("CREAR:", data);
    
    const newItem: rutas = {
      id: (rutas.length +1 ).toString(),
      ...data,
    };
    setRutas((prev) => [...prev, newItem]);
  };

  const onUpdate = (data: rutas) => {
    console.log("UPDATE:", data);
    setRutas((prev) =>
      prev.map((item) => (item.id === data.id ? data : item))
    );
    
  };

  const onDelete = (id: string) => {
    console.log("DELETE:", id);

    setRutas((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CrudPage<rutas>
      title="Gestión de Rutas"
      subtitle="Administra todas tus rutas en un solo lugar"
      Icon={Building2}
      identity="Ruta"
      items={rutas}
      columns={columns}
      searchKeys={searchKeys}
      modalFields={modalFields}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}
