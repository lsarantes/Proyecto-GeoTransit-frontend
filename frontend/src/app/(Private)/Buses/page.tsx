"use client";

import { useState } from "react";
import { Bone, Building2, Bus, BusFront, ChartNetwork, ChartScatter, Clock, Gauge, Hash, MapPin, Phone, User, UserRound, Zap } from 'lucide-react';
import { CrudPage } from "@/components/crud/crud-page";
import { DefaultStylesTableTitle, DefaultStylesTableContent } from "@/types/style-texto-tabla";
import { FieldConfig, TableColumn } from "@/types/crud-interface-types";
import { handleValidatedChange, REGEX_NUMBERS_AND_LETTERS_N_LATAM, REGEX_NUMBERS_AND_SYMBOLS, REGEX_ONLY_LETTERS_LATAM, REGEX_ONLY_NUMBERS } from "@/types/regular-expresion";
import { TypeLevel } from "@/types/type-level";
import { useBuses } from "@/hook/generar-registro-buses";
import { Buses } from "@/types/interface-buses";





export default function BusesPage() {
  // Load items
  const { buses, setBuses,  estadosBus, estadosUbicacion, conductoresAsociados} = useBuses();

  // ---------- TABLE COLUMNS ----------
  const columns: TableColumn<Buses>[] = [
    { key: "id", label: "Placa", level: TypeLevel.id, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.id, Icon: BusFront },
    { key: "modelo", label: "Modelo", level: TypeLevel.titulo, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.titulo, Icon: Bus },
    { key: "velocidad", label: "Velocidad", level: TypeLevel.textNormal, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: Gauge },
    { key: "capacidad_de_pasajeros", label: "Capacidad", level: TypeLevel.textRelevante, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: Hash },
    { key: "fecha_hora_ultima_ubicacion", label: "Fecha ultima ubicacion", level: TypeLevel.subtitulo, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.subtitulo, Icon: Clock },
    { key: "estado_ubicacion", label: "Estado ubicacion", level: TypeLevel.textRelevante, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.resaltado, Icon: ChartScatter },    
    { key: "estado_bus", label: "Estado Bus", level: TypeLevel.textRelevante, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.resaltado, Icon: ChartNetwork },
    { key: "posicion_actual", label: "Ubicación", level: TypeLevel.coordenada, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: MapPin },
    { 
    key: "conductoresAsociados", // string[]
    label: "Conductores Asoc.", 
    level: TypeLevel.tags, // Usamos el nuevo nivel
    classNameTitle: "...", 
    classNameText: "..." ,
    Icon: UserRound 
  },
  
  ];

  // ---------- MODAL FIELDS (Patterns restaurados) ----------
  const modalFields: FieldConfig<Buses>[] = [
    {
      key: "id",
      label: "Numero de placa",
      placeholder: "MT 48328",
      type: "number",
      layout: "grid",
      pattern: REGEX_NUMBERS_AND_LETTERS_N_LATAM.source, // Pattern restaurado
      inputMode: "text",
      validate: (value) => {
        if (!value || typeof value !== "string" || !value.trim()) {
          return "El numero de placa es requerido";
        }
        return null;
      }
    },
    {
      key: "modelo",
      label: "Modelo de autobus",
      placeholder: "Yutong°",
      type: "text",
      layout: "grid",
      pattern: REGEX_NUMBERS_AND_LETTERS_N_LATAM.source, // Pattern restaurado
      inputMode: "text",
      validate: (value) => {
        if (!value || typeof value !== "string" || !value.trim()) {
          return "El modelo es requerido";
        }
        return null;
      }
    },
    {
      key: "velocidad",
      label: "Velocidad maxima",
      placeholder: "120",
      type: "number",
      min: 20,
      layout: "grid",
      pattern: REGEX_ONLY_NUMBERS.source, // Pattern restaurado
      inputMode: "numeric",
      validate: (value) => {
        if (value === null || value === undefined || value <= 0) {
          return "La velocidad maxima es requerida";
        }
        return null;
      }
    },
    {
      key: "capacidad_de_pasajeros",
      label: "Cantidad maximo de pasajeros",
      placeholder: "20",
      min: 12,
      type: "number",
      pattern: REGEX_ONLY_NUMBERS.source, // Pattern restaurado
      layout: "grid",
      inputMode: "numeric",

    },
    {
      key: "posicion_actual",
      label: "Ubicación Geográfica",
      type: "location",
      layout: "full",
      validate: (val: any) => (!val || val.lat === 0) ? "Debe seleccionar una ubicación en el mapa" : null
    },
    {
      key: "fecha_hora_ultima_ubicacion",
      label: "Fecha ultima ubicacion",
      placeholder: "20/02/2022 2:30",
      type: "date",
      layout: "grid",
    },
    {
      key: "estado_ubicacion",
      label: "Estado ubicacion",
      placeholder: "Circulando",
      type: "select",
      layout: "grid",
      options: estadosUbicacion
    },
    // Nuevos campos obligatorios para el modal:
    {
      key: "estado_bus",
      label: "Estado Bus",
      placeholder: "Operativo",
      type: "select",
      layout: "grid",
     options: estadosBus
    },
    
    {
      key: "conductoresAsociados", 
      label: "Asociar Conductores",
      type: "multiselect",
      layout: "full",
      options: conductoresAsociados
    }




  ];

  // ---------- SEARCH KEYS ----------
    const searchKeys: (keyof Buses)[] = ["id", "modelo"];
  
    // ---------- HANDLERS ----------
  
    const onCreate = (data: any) => {
      // Generar coords aleatorias cerca de Managua para nuevos items
      const newItem = { 
          id: (buses.length + 1).toString(), 
          ...data,
          ubicacion: data.ubicacion || { lat: 12.136389, lng: -86.251389 }
      };
      setBuses((prev) => [...prev, newItem]);
    };
  
    const onUpdate = (data: any) => {
      setBuses((prev) => prev.map((item) => (item.id === data.id ? data : item)));
    };
  
    const onDelete = (id: string) => {
      setBuses((prev) => prev.filter((item) => item.id !== id));
    };
  
  
    return (
      <CrudPage<Buses>
        title="Gestión de Buses"
        subtitle="Administra todos tus Buses en un solo lugar"
        Icon={Building2}
        identity="Bus"
        items={buses}
        columns={columns}
        searchKeys={searchKeys}
        modalFields={modalFields}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    );
}