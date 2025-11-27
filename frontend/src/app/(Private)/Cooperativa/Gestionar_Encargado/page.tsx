"use client";

import { useMemo } from "react";
import { CrudPage } from "@/components/crud/crud-page";
import { User, Mail, Building, Hash, Camera, Calendar, UserIcon } from 'lucide-react';
import { FieldConfig, TableColumn } from "@/types/crud-interface-types";
import { DefaultStylesTableTitle, DefaultStylesTableContent } from "@/types/style-texto-tabla";
import { REGEX_ONLY_LETTERS_LATAM } from "@/types/regular-expresion";
import { TypeLevel } from "@/types/type-level";
import { EncargadoBackend, EncargadoFrontend } from "@/types/interface/interface-encargado";
import { useCrud } from "@/hook/useCrud";
import { CooperativaBackend } from "@/types/interface/interface-cooperativa";
import RoleGuard from "@/components/login/RoleGuard";
import { TD_NivelAcceso } from "@/types/interface/interface-user";

export default function EncargadosPage() {
  
  // 1. Hooks
  const { 
    items: rawEncargados, 
    loading, 
    createItem, updateItem, deleteItem 
  } = useCrud<EncargadoBackend>("/encargado", "encargados-table-updated");

  // Traemos cooperativas para asignarlas
  const { items: rawCooperativas } = useCrud<CooperativaBackend>("/cooperativa"); 

  // 2. Transformación
  const encargados: EncargadoFrontend[] = useMemo(() => {
    return rawEncargados.map((e) => {
        // Desglosar nombres para llenar el formulario al editar
        // Nota: Esto es una aproximación, idealmente el backend manda desglosado si se requiere exactitud
        const nameParts = e.nombres.split(' ');
        const surnameParts = e.apellidos.split(' ');

        return {
            id: e.id,
            nombreCompleto: e.nombreCompleto,
            email: e.email,
            fotoUrl: e.fotoUrl || undefined,
            fechaRegistro: e.fechaRegistro,
            
            // Visualización de Tags en tabla
            cooperativasTexto: e.cooperativas.map(c => c.nombre).join(', '),
            
            // Datos para Formulario (Edición)
            primer_nombre: nameParts[0] || '',
            segundo_nombre: nameParts[1] || '',
            tercer_nombre: nameParts[2] || '',
            primer_apellido: surnameParts[0] || '',
            segundo_apellido: surnameParts[1] || '',
            cooperativasIds: e.cooperativas.map(c => c.id)
        };
    });
  }, [rawEncargados]);

  const opcionesCoops = (rawCooperativas || []).map((c: CooperativaBackend) => ({
      value: c.codigoCoop,
      label: c.nombre_cooperativa
  }));

  // 3. Columnas
  const columns: TableColumn<EncargadoFrontend>[] = [
    { key: "id", label: "Cód", level: TypeLevel.id, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.id, Icon: Hash },
    { key: "fotoUrl", label: "Foto", level: TypeLevel.foto, classNameTitle: DefaultStylesTableTitle.centerTitle, classNameText: DefaultStylesTableContent.foto, Icon: Camera },
    { key: "nombreCompleto", label: "Nombre Completo", level: TypeLevel.titulo, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.titulo, Icon: User },
    { key: "email", label: "Usuario Acceso", level: TypeLevel.textNormal, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: Mail },
    { key: "cooperativasTexto", label: "Coops. Asignadas", level: TypeLevel.textRelevante, classNameTitle: DefaultStylesTableTitle.normalTitle, classNameText: DefaultStylesTableContent.text, Icon: Building },
  ];

  // 4. Formulario
  const modalFields: FieldConfig<EncargadoFrontend>[] = [
    {
      key: "id",isID: true, label: "Código Encargado", placeholder: "Ej. ENC-001",
      type: "text", layout: "full", validate: (val) => !val ? "Requerido" : null
    },
    // Nombres
    { key: "primer_nombre", label: "Primer Nombre", type: "text", layout: "grid", pattern: REGEX_ONLY_LETTERS_LATAM.source, validate: (val) => !val ? "Requerido" : null },
    { key: "segundo_nombre", label: "Segundo Nombre", type: "text", layout: "grid", pattern: REGEX_ONLY_LETTERS_LATAM.source },
    { key: "primer_apellido", label: "Primer Apellido", type: "text", layout: "grid", pattern: REGEX_ONLY_LETTERS_LATAM.source, validate: (val) => !val ? "Requerido" : null },
    { key: "segundo_apellido", label: "Segundo Apellido", type: "text", layout: "grid", pattern: REGEX_ONLY_LETTERS_LATAM.source },
    
    // Usuario
    { key: "email", label: "Correo Electrónico (Login)", type: "text", layout: "full", validate: (val) => !val?.includes('@') ? "Correo inválido" : null },
    
    // Relación
    {
      key: "cooperativasIds", label: "Asignar a Cooperativas",
      type: "multiselect", layout: "full",
      options: opcionesCoops
    },
    { key: "fotoUrl", label: "Foto Perfil", type: "photo", layout: "full" },
  ];

  const searchKeys: (keyof EncargadoFrontend)[] = ["id", "nombreCompleto", "email"];

  // 5. Handlers
  const handleCreate = async (formData: any) => {
      await createItem(formData); // El DTO del backend coincide con las keys del form
  };

  const handleUpdate = async (formData: any) => {
      await updateItem(formData.id, formData);
  };

  return (
    <RoleGuard 
          allowedRoles={[
            TD_NivelAcceso.Administrador, 
          ]}
        >
    <CrudPage<EncargadoFrontend>
      title="Gestión de Encargados"
      subtitle="Crea personal y sus credenciales de acceso"
      Icon={User}
      identity="Encargado"
      items={encargados}
      columns={columns}
      searchKeys={searchKeys}
      modalFields={modalFields}
      verUbicacion={false}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={(id) => {
    console.log(id)
    deleteItem(id)}}
    />
    </RoleGuard>
  );
}