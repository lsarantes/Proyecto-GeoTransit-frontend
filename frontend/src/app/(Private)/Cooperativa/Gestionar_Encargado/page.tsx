"use client";

import { useEncargado } from "@/hook/generar-registro-encargado";
import {
  BookImage,
  CircleUser,
  Hash,
  Mail,
  MapPin,
  Phone,
  User,
  UsersRound,
  Zap,
} from "lucide-react";
import { CrudPage } from "@/components/crud/crud-page";
import {
  DefaultStylesTableTitle,
  DefaultStylesTableContent,
} from "@/types/style-texto-tabla";
import { FieldConfig, TableColumn } from "@/types/crud-interface-types";
import {
  REGEX_EMAIL,
  REGEX_NUMBERS_AND_LETTERS_N_LATAM,
  REGEX_NUMBERS_AND_SYMBOLS,
  REGEX_ONLY_LETTERS_LATAM,
  REGEX_ONLY_NUMBERS,
} from "@/types/regular-expresion";
import { TypeLevel } from "@/types/type-level";
import { useState } from "react";

// Tipo de la entidad
interface Encargado {
  id: string;
  nombre: string;
  correo: string;
  direccion: string;
  telefono: string;
  foto: string;
}

// Hook de ejemplo (tú ya lo tienes)

export default function EncargadoPage() {
  // Load items
  const {encargado, setEncargado} = useEncargado();

  // ---------- TABLE COLUMNS ----------
  const columns: TableColumn<Encargado>[] = [
    {
      key: "id",
      label: "ID",
      level: TypeLevel.id,
      classNameTitle: DefaultStylesTableTitle.idTitle,
      classNameText: DefaultStylesTableContent.id,
      Icon: Hash,
    },
    {
      key: "foto",
      label: "Foto",
      level: TypeLevel.textRelevante,
      classNameTitle: DefaultStylesTableTitle.centerTitle,
      classNameText: DefaultStylesTableContent.resaltado,
      Icon: BookImage,
    },
    {
      key: "nombre",
      label: "Nombre",
      level: TypeLevel.titulo,
      classNameTitle: DefaultStylesTableTitle.normalTitle,
      classNameText: DefaultStylesTableContent.titulo,
      Icon: CircleUser,
    },
    {
      key: "correo",
      label: "Correo",
      level: TypeLevel.subtitulo,
      classNameTitle: DefaultStylesTableTitle.normalTitle,
      classNameText: DefaultStylesTableContent.subtitulo,
      Icon: Mail,
    },
    {
      key: "direccion",
      label: "Dirección",
      level: TypeLevel.textNormal,
      classNameTitle: DefaultStylesTableTitle.normalTitle,
      classNameText: DefaultStylesTableContent.text,
      Icon: MapPin,
    },
    {
      key: "telefono",
      label: "Teléfono",
      level: TypeLevel.textNormal,
      classNameTitle: DefaultStylesTableTitle.normalTitle,
      classNameText: DefaultStylesTableContent.text,
      Icon: Phone,
    },
  ];

  // ---------- MODAL FIELDS ----------
  const modalFields: FieldConfig<Encargado>[] = [
    {
      key: "id",
      label: "Id del Encargado",
      placeholder: "Ej: E0001",
      type: "text",
      layout: "grid",
      pattern: REGEX_NUMBERS_AND_LETTERS_N_LATAM.source,
      inputMode: "text",
      validate: (value) => {
        if (!value || typeof value !== "string" || !value.trim()) {
          return "El id es requerido";
        }
        return null;
      },
    },
    {
      key: "nombre",
      label: "Nombre Completo",
      placeholder: "Ej: Edgard Antonio Rodriguez",
      type: "text",
      layout: "grid",
      pattern: REGEX_ONLY_LETTERS_LATAM.source,
      inputMode: "text",
      validate: (value) => {
        if (!value || typeof value !== "string" || !value.trim()) {
          return "El nombre es requerido";
        }
        return null;
      },
    },
    {
      key: "correo",
      label: "Correo",
      placeholder: "Ej: ejemplo@ejemplo.com",
      type: "email",
      layout: "full",
      pattern: "",
      inputMode: "email",
      validate: (value) => {
        if (!value) {
          return "El correo electrónico es obligatorio";
        }
        if (!REGEX_EMAIL.test(value)) {
          return "El formato del correo no es válido";
        }
        return null;
      },
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
      },
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
      },
    },
    {
      key: "foto",
      label: "Seleccione su foto",
      placeholder: "",
      type: "number",
      pattern: "",
      layout: "grid",
      inputMode: "search",
      validate: (value) => {
        return null;
      },
    },
  ];

  // ---------- SEARCH KEYS ----------
  const searchKeys: (keyof Encargado)[] = ["id", "nombre"];

  // ---------- HANDLERS ----------
  const onCreate = (data: Encargado) => {
    console.log("CREAR:", data);
    setEncargado((prev) => [...(prev || []), data]);
  };

  const onUpdate = (data: Encargado) => {
    console.log("UPDATE:", data);
    setEncargado((prev) =>
      (prev || []).map((item) => (item.id === data.id ? data : item))
    );
  };

  const onDelete = (id: string) => {
    console.log("DELETE:", id);

    setEncargado((prev) => (prev || []).filter((item) => item.id !== id));
  };

  return (
    <CrudPage<Encargado>
      title="Gestión de Encargados"
      subtitle="Administra todas tus Encargados en un solo lugar"
      Icon={UsersRound}
      identity="Encargado"
      items={encargado || []}
      columns={columns}
      searchKeys={searchKeys}
      modalFields={modalFields}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}
