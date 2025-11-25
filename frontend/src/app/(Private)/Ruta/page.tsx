"use client";

import { useState } from "react";
import { useCooperativas } from "@/hook/generar-registro.tabla";
import { Bone, Building2, Hash, MapPin, Phone, User, Zap } from 'lucide-react';
import { CrudPage } from "@/components/crud/crud-page";
import { DefaultStylesTableTitle, DefaultStylesTableContent } from "@/types/style-texto-tabla";
import { FieldConfig, TableColumn } from "@/types/crud-interface-types";
import { handleValidatedChange, REGEX_NUMBERS_AND_LETTERS_N_LATAM, REGEX_NUMBERS_AND_SYMBOLS, REGEX_ONLY_LETTERS_LATAM, REGEX_ONLY_NUMBERS } from "@/types/regular-expresion";
import { TypeLevel } from "@/types/type-level";
import { userRuta } from "@/hook/generar-registro.ruta";


// 👇 Tipo de la entidad
interface Ruta {
  id: string;
  origen_latitud: number;
  origen_longitud: number;
  destino_latitud: number;
  destino_longitud: number;
  fecha_de_creacion: string;

}


// 👇 Hook de ejemplo (tú ya lo tienes)

export default function RutaPage() {
  // Load items
  const { rutas, setRutas } = userRuta();

  // ---------- TABLE COLUMNS ----------
  const columns: TableColumn<Ruta>[] = [
    { key: "id", label: "ID", level: TypeLevel.id, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.id, Icon: Hash },
    { key: "origen_latitud", label: "Origen Y", level: TypeLevel.textNormal, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.titulo, Icon: Building2 },
    { key: "origen_longitud", label: "Origen X", level: TypeLevel.textNormal, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.subtitulo, Icon: User },
    { key: "destino_latitud", label: "Destino Y", level: TypeLevel.textNormal, classNameTitle: DefaultStylesTableTitle.centerTitle, classNameText: DefaultStylesTableContent.resaltado, Icon: Zap },
    { key: "destino_longitud", label: "Destino X", level: TypeLevel.textNormal, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: Phone },
    { key: "fecha_de_creacion", label: "Fecha", level: TypeLevel.titulo, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: MapPin },
  ];

  // ---------- MODAL FIELDS ----------
  const modalFields: FieldConfig<Ruta>[] = [
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
      key: "origen_latitud",
      label: "latitud",
      placeholder: "40N°",
      type: "number",
      layout: "grid",
      pattern: "",
      inputMode: "text",
      validate: (value) => {
        if (!value || typeof value !== "string" || !value.trim()) {
          return "La latitud es requerido";
        }
        return null;
      }
    },
    {
      key: "origen_longitud",
      label: "longitud",
      placeholder: "60E°",
      type: "text",
      layout: "grid",
      pattern: "",
      inputMode: "text",
      validate: (value) => {
        if (value === null || value === undefined || value <= 0) {
          return "La longitud es requerido";
        }
        return null;
      }
    },
    {
      key: "destino_latitud",
      label: "latitud",
      placeholder: "60N°",
      type: "text",
      layout: "grid",
      pattern: "",
      inputMode: "text",
      validate: (value) => {
        if (!value || typeof value !== "string" || !value.trim()) {
          return "La latitud es requerido";
        }
        return null;
      }
    },
    {
      key: "destino_longitud",
      label: "longitud",
      placeholder: "50E°",
      type: "text",
      layout: "grid",
      pattern: "",
      inputMode: "text",
      validate: (value) => {
        if (!value || typeof value !== "string" || !value.trim()) {
          return "La longitud es requerida";
        }
        return null;
      }
    },
     {
      key: "fecha_de_creacion",
      label: "fecha",
      placeholder: "25/11/2025",
      type: "text",
      layout: "grid",
      pattern: "",
      inputMode: "text",
      validate: (value) => {
        if (!value || typeof value !== "string" || !value.trim()) {
          return "La fecha es requerida";
        }
        return null;
      }
    }

  ];

  // ---------- SEARCH KEYS ----------
  const searchKeys: (keyof Ruta)[] = ["id"];

  // ---------- HANDLERS ----------
  const onCreate = (data: Omit<Ruta, "id">) => {
    console.log("CREAR:", data);
    
    const newItem: Ruta = {
      id: (rutas.length +1 ).toString(),
      ...data,
    };
    setRutas((prev) => [...prev, newItem]);
  };

  const onUpdate = (data: Ruta) => {
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
    <CrudPage<Ruta>
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
