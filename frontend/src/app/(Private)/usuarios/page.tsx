"use client";

import { useState } from "react";
import { useUsuarios, Usuario } from "@/hook/generar-registro-usuarios";
import {
  User,
  Mail,
  Calendar,
  Camera,
  Hash,
  Shield,
  Activity,
  Contact,
  KeyRound,
  IdCard,
  Phone,
  Globe,
  RefreshCw,
  Clock,
} from "lucide-react";
import { CrudPage } from "@/components/crud/crud-page-sm"; 
import {
  DefaultStylesTableTitle,
  DefaultStylesTableContent,
} from "@/types/style-texto-tabla";
import { FieldConfig, TableColumn } from "@/types/crud-interface-types";
import { REGEX_EMAIL } from "@/types/regular-expresion";
import { TypeLevel } from "@/types/type-level";

type UsuarioTableItem = Omit<Usuario, "esta_activo"> & {
  id: string;
  esta_activo: any;
  rol: string;
  nombre_completo: string;
  telefono: string;
  codigo_pais: string;
  f_actualizacion: string;
  f_creacion: string;
};

const ROLES_OPTIONS = [
  { value: "PASAJERO", label: "Pasajero" },
  { value: "CONDUCTORES", label: "Conductor" },
  { value: "GESTOR_DE_RUTAS", label: "Gestor de Rutas" },
  { value: "EMPLEADO_MTI", label: "Empleado MTI" },
  { value: "ENCARGADO_COOPERATIVA", label: "Encargado Cooperativa" },
  { value: "GESTOR_BAHIAS_MTI", label: "Gestor Bahías MTI" },
];

export default function UsuariosPage() {
  const { usuarios, setUsuarios } = useUsuarios();

  const items: UsuarioTableItem[] = usuarios.map((u) => ({
    ...u,
    id: u.id_usuario.toString(),
    rol: (u as any).rol || "Pasajero",
    nombre_completo: (u as any).nombre_completo || "Usuario Sin Nombre",
    telefono: (u as any).telefono || "8888-8888",

    codigo_pais: (u as any).codigo_pais || "+505",
    f_creacion:
      (u as any).f_creacion || new Date(Date.now() - 100000000).toISOString(),
    f_actualizacion: (u as any).f_actualizacion || new Date().toISOString(),

    esta_activo: u.esta_activo
      ? { label: "Activo", value: "positive" }
      : { label: "Inactivo", value: "negative" },
  }));

  // ---------- COLUMNAS DE LA TABLA ----------
  const columns: TableColumn<UsuarioTableItem>[] = [
    {
      key: "id_usuario",
      label: "ID",
      level: TypeLevel.id,
      classNameTitle: DefaultStylesTableTitle.normalTitle,
      classNameText: DefaultStylesTableContent.id,
      Icon: Hash,
    },
    {
      key: "foto",
      label: "Foto",
      level: TypeLevel.foto,
      classNameTitle: DefaultStylesTableTitle.centerTitle,
      classNameText: DefaultStylesTableContent.foto,
      Icon: Camera,
    },
    {
      key: "nombre_completo",
      label: "Nombre Completo",
      level: TypeLevel.titulo,
      classNameTitle: DefaultStylesTableTitle.normalTitle,
      classNameText: DefaultStylesTableContent.titulo,
      Icon: IdCard,
    },
    {
      key: "username",
      label: "Usuario",
      level: TypeLevel.subtitulo,
      classNameTitle: DefaultStylesTableTitle.normalTitle,
      classNameText: DefaultStylesTableContent.subtitulo,
      Icon: User,
    },

    {
      key: "rol",
      label: "Rol",
      level: TypeLevel.textNormal,
      classNameTitle: DefaultStylesTableTitle.normalTitle,
      classNameText: DefaultStylesTableContent.subtitulo,
      Icon: KeyRound,
    },
    {
      key: "esta_activo",
      label: "Estado",
      level: TypeLevel.textRelevante,
      classNameTitle: DefaultStylesTableTitle.normalTitle,
      classNameText: DefaultStylesTableContent.text,
      Icon: Activity,
    },
    {
      key: "email",
      label: "Correo",
      level: TypeLevel.textNormal,
      classNameTitle: DefaultStylesTableTitle.normalTitle,
      classNameText: DefaultStylesTableContent.text,
      Icon: Mail,
    },
    {
      key: "telefono",
      label: "Teléfono",
      level: TypeLevel.textNormal,
      classNameTitle: DefaultStylesTableTitle.normalTitle,
      classNameText: DefaultStylesTableContent.text,
      Icon: Phone,
    },
    // --- CAMPOS OCULTOS EN TABLA (Solo para Modal) ---
    {
      key: "codigo_pais",
      label: "Cód. País",
      level: TypeLevel.textNormal,
      classNameTitle: "hidden",
      classNameText: "hidden",
      Icon: Globe,
    },
    

    {
      key: "f_creacion",
      label: "Fecha Creación",
      level: TypeLevel.fecha,
      classNameTitle: "hidden",
      classNameText: "hidden",
      Icon: Clock,
    },
    {
      key: "f_actualizacion",
      label: "Última Edición",
      level: TypeLevel.fecha,
      classNameTitle: "hidden",
      classNameText: "hidden",
      Icon: RefreshCw,
    },
  ];

  // ---------- CAMPOS DEL MODAL (FORMULARIO) ----------
  const modalFields: FieldConfig<UsuarioTableItem>[] = [
    {
      key: "nombre_completo",
      label: "Nombre Completo",
      placeholder: "Ej. Juan Pérez",
      type: "text",
      layout: "full",
      validate: (val: any) => (!val ? "El nombre es requerido" : null),
    },
    {
      key: "codigo_pais",
      label: "Cód. País",
      placeholder: "+505",
      type: "text",
      layout: "grid", 
      validate: (val: any) => (!val ? "Req." : null),
    },
    {
      key: "telefono",
      label: "Número Telefónico",
      placeholder: "8888-8888",
      type: "text",
      layout: "grid", 
      validate: (val: any) => (!val ? "El teléfono es requerido" : null),
    },

    {
      key: "username",
      label: "Nombre de Usuario",
      placeholder: "Ej. usuario_01",
      type: "text",
      layout: "grid",
      validate: (val: any) => (!val ? "El usuario es requerido" : null),
    },
    {
      key: "rol",
      label: "Rol de Usuario",
      type: "select",
      layout: "grid",
      options: ROLES_OPTIONS,
      validate: (val: any) => (!val ? "Debes seleccionar un rol" : null),
    },
    {
      key: "email",
      label: "Correo Electrónico",
      placeholder: "ejemplo@correo.com",
      layout: "full",
      validate: (val: any) =>
        !REGEX_EMAIL.test(val) ? "Formato de correo inválido" : null,
    },
    {
      key: "password" as keyof UsuarioTableItem,
      label: "Contraseña",
      placeholder: "Escribe para cambiar",
      type: "text",
      layout: "grid",
      validate: (val: any) => (val && val.length < 4 ? "Muy corta" : null),
    },
    {
      key: "esta_activo",
      label: "Estado de la Cuenta",
      type: "select",
      layout: "grid",
      options: [
        { value: "true", label: "Activo" },
        { value: "false", label: "Inactivo" },
      ],
    },
    {
      key: "foto",
      label: "Fotografía de Perfil",
      type: "photo",
      layout: "full",
    },
    {
      key: "f_creacion",
      label: "Fecha de Creación",
      type: "text",
      layout: "grid",
      disabled: true,
      placeholder: "Automático"
    },
    {
      key: "f_actualizacion",
      label: "Última Actualización",
      type: "text",
      layout: "grid",
      disabled: true, 
      placeholder: "Automático"
    }
  ];

  // ---------- SEARCH KEYS ----------
  const searchKeys: (keyof UsuarioTableItem)[] = [
    "nombre_completo",
    "username",
    "email",
    "rol",
    "telefono",
  ];

  // ---------- HANDLERS ----------

  const onCreate = (data: any) => {
   const nuevoUsuario: Usuario & { 
      rol: string, 
      nombre_completo: string,
      telefono: string,
      codigo_pais: string,
      f_actualizacion: string,
      f_creacion: string
    } = {
      id_usuario: usuarios.length + 1, 
      username: data.username,
      email: data.email,
      password: data.password,
      f_ultimo_acceso: new Date().toISOString(),
      esta_activo: data.esta_activo === "true",
      foto: data.foto || "https://github.com/shadcn.png",

      rol: data.rol,
      nombre_completo: data.nombre_completo,
      telefono: data.telefono,
      codigo_pais: data.codigo_pais,
      f_creacion: new Date().toISOString(),
      f_actualizacion: new Date().toISOString()
    };

    setUsuarios((prev) => [nuevoUsuario, ...prev]);
  };

  const onUpdate = (data: any) => {
    let estadoBooleano = false;

    if (typeof data.esta_activo === "object" && data.esta_activo !== null) {
      estadoBooleano = data.esta_activo.value === "positive";
    } else {
      estadoBooleano = data.esta_activo === "true";
    }

    const usuarioActualizado: Usuario & {
      rol: string;
      nombre_completo: string;
      telefono: string;
      codigo_pais: string;
      f_actualizacion: string;
      f_creacion: string
    } = {
      id_usuario: Number(data.id),
        username: data.username,
        email: data.email,
        password: data.password,
        f_ultimo_acceso: data.f_ultimo_acceso,
        foto: data.foto,
        esta_activo: estadoBooleano,
        
        rol: data.rol,
        nombre_completo: data.nombre_completo,
        telefono: data.telefono,
        codigo_pais: data.codigo_pais,
        f_creacion: data.f_creacion, 
        f_actualizacion: new Date().toISOString() 
    };

    setUsuarios((prev) =>
      prev.map((item) =>
        item.id_usuario === usuarioActualizado.id_usuario
          ? usuarioActualizado
          : item
      )
    );
  };

  const onDelete = (id: string) => {
    setUsuarios((prev) =>
      prev.filter((item) => item.id_usuario !== Number(id))
    );
  };

  return (
    <CrudPage<UsuarioTableItem>
      title="Gestión de Usuarios"
      subtitle="Administra el acceso, roles y datos de contacto de los usuarios"
      Icon={Shield}
      identity="Usuario"
      items={items} 
      columns={columns}
      searchKeys={searchKeys}
      modalFields={modalFields}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}
