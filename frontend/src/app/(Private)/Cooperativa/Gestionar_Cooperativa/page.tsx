"use client";

import { useState } from "react";
import { useCooperativas } from "@/hook/generar-registro.tabla";
import { Bone, Building2, Hash, MapPin, Phone, User, Zap } from 'lucide-react';
import { CrudPage } from "@/components/crud/crud-page";
import { DefaultStylesTableTitle, DefaultStylesTableContent } from "@/types/style-texto-tabla";
import { FieldConfig, TableColumn } from "@/types/crud-interface-types";
import { handleValidatedChange, REGEX_NUMBERS_AND_LETTERS_N_LATAM, REGEX_NUMBERS_AND_SYMBOLS, REGEX_ONLY_LETTERS_LATAM, REGEX_ONLY_NUMBERS } from "@/types/regular-expresion";
import { TypeLevel } from "@/types/type-level";

// 👇 Tipo de la entidad
interface Cooperativa {
  id: string;
  nombre: string;
  encargado: string;
  rutas: number;
  telefono: string;
  direccion: string;
}


// 👇 Hook de ejemplo (tú ya lo tienes)

export default function CooperativasPage() {
  // Load items
  const { cooperativas, setCooperativas } = useCooperativas();

  // ---------- TABLE COLUMNS ----------
  const columns: TableColumn<Cooperativa>[] = [
    { key: "id", label: "ID", level: TypeLevel.id, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.id, Icon: Hash },
    { key: "nombre", label: "Nombre", level: TypeLevel.titulo, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.titulo, Icon: Building2 },
    { key: "encargado", label: "Encargado", level: TypeLevel.subtitulo, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.subtitulo, Icon: User },
    { key: "rutas", label: "Ruta", level: TypeLevel.textRelevante, classNameTitle: DefaultStylesTableTitle.centerTitle, classNameText: DefaultStylesTableContent.resaltado, Icon: Zap },
    { key: "telefono", label: "Teléfono", level: TypeLevel.textNormal, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: Phone },
    { key: "direccion", label: "Dirección", level: TypeLevel.textNormal, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: MapPin },
  ];

  // ---------- MODAL FIELDS ----------
  const modalFields: FieldConfig<Cooperativa>[] = [
    {
      key: "nombre",
      label: "Nombre de la Cooperativa",
      placeholder: "Nombre de la cooperativa",
      type: "text",
      layout: "grid",
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
      key: "encargado",
      label: "Encargado",
      placeholder: "Nombre del encargado",
      type: "text",
      layout: "grid",
      pattern: REGEX_ONLY_LETTERS_LATAM.source,
      inputMode: "text",
      validate: (value) => {
        if (!value || typeof value !== "string" || !value.trim()) {
          return "El encargado es requerido";
        }
        return null;
      }
    },
    {
      key: "rutas",
      label: "Cantidad de Rutas",
      placeholder: "0",
      min: 1,
      type: "text",
      layout: "grid",
      pattern: REGEX_ONLY_NUMBERS.source,
      inputMode: "numeric",
      validate: (value) => {
        if (value === null || value === undefined || value <= 0) {
          return "La cantidad de rutas debe ser mayor que 0";
        }
        return null;
      }
    },
    {
      key: "telefono",
      label: "Teléfono",
      placeholder: "+505 2255-0000",
      type: "tel",
      layout: "grid",
      pattern: REGEX_NUMBERS_AND_SYMBOLS.source,
      inputMode: "tel",
      validate: (value) => {
        if (!value || typeof value !== "string" || !value.trim()) {
          return "El teléfono es requerido";
        }
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
  const searchKeys: (keyof Cooperativa)[] = ["id", "encargado"];

  // ---------- HANDLERS ----------
  const onCreate = (data: Omit<Cooperativa, "id">) => {
    console.log("CREAR:", data);
    
    const newItem: Cooperativa = {
      id: (cooperativas.length +1 ).toString(),
      ...data,
    };
    setCooperativas((prev) => [...prev, newItem]);
  };

  const onUpdate = (data: Cooperativa) => {
    console.log("UPDATE:", data);
    setCooperativas((prev) =>
      prev.map((item) => (item.id === data.id ? data : item))
    );
    
  };

  const onDelete = (id: string) => {
    console.log("DELETE:", id);

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
