"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Shield,
  Loader2,
  AlertTriangle,
  X,
  UploadCloud,
  ChevronRight,
  ChevronLeft,
  Users,
  UserCheck,
  UserX,
} from "lucide-react"
import { toast } from "sonner"
import { type IEmpleadoFormValues, type IEmpleadoMti, TD_NivelAcceso } from "@/types/interface/interface-user"
import { useCrud } from "@/hook/useCrud"
import RoleGuard from "@/components/login/RoleGuard"

// CONSTANTES
const CLOUD_NAME = "dc99fxwy2"
const UPLOAD_PRESET = "mi_app_preset"
const ITEMS_PER_PAGE = 5

export default function EmpleadosMtiPage() {
  const { items, createItem, updateItem, deleteItem } = useCrud<IEmpleadoMti>(
    "/empleado-mti",
    "empleados-mti-table-updated",
  )

  // Estados Locales
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("TODOS")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IEmpleadoFormValues>()
  const currentPhotoUrl = watch("url_Foto")

  // --- LÓGICA DE FILTRADO ---
  const filteredItems = items
    .filter((item) => item.nivelAcceso !== TD_NivelAcceso.Gestor_de_cooperativas_y_encargados)
    .filter((i) => {
      const term = searchTerm.toLowerCase()
      const matchesSearch =
        i.nombreCompleto.toLowerCase().includes(term) ||
        i.email.toLowerCase().includes(term) ||
        i.id.toLowerCase().includes(term)
      const matchesRole = roleFilter === "TODOS" || i.nivelAcceso === roleFilter
      return matchesSearch && matchesRole
    })

  // --- Estadísticas ---
  const totalFuncionarios = filteredItems.length
  const activos = filteredItems.filter((e) => e.estadoActivo).length
  const inactivos = filteredItems.filter((e) => !e.estadoActivo).length

  // --- Lógica de Paginación ---
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, roleFilter])

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const paginatedItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  // --- HANDLERS ---
  const handleOpenCreate = () => {
    setIsEditing(false)
    reset({
      esta_activo: true,
      nivel_acceso: TD_NivelAcceso.Gestor_de_bahias,
      url_Foto: "",
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (empleado: IEmpleadoMti) => {
    setIsEditing(true)
    const nameParts = empleado.nombres.split(" ")
    const lastParts = empleado.apellidos.split(" ")
    setValue("id", empleado.id)
    setValue("primer_nombre", nameParts[0] || "")
    setValue("segundo_nombre", nameParts[1] || "")
    setValue("primer_apellido", lastParts[0] || "")
    setValue("segundo_apellido", lastParts[1] || "")
    setValue("email", empleado.email)
    setValue("nivel_acceso", empleado.nivelAcceso)
    setValue("esta_activo", empleado.estadoActivo)
    setValue("url_Foto", empleado.fotoUrl || "")
    setIsModalOpen(true)
  }

  const onSubmit = async (data: IEmpleadoFormValues) => {
    const success = isEditing ? await updateItem(data.id, data) : await createItem(data)
    if (success) {
      setIsModalOpen(false)
      reset()
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", UPLOAD_PRESET)
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data,
      })
      const fileData = await res.json()
      if (fileData.secure_url) {
        setValue("url_Foto", fileData.secure_url)
        toast.success("Imagen cargada")
      }
    } catch (error) {
      toast.error("Error al subir imagen")
    } finally {
      setIsUploading(false)
    }
  }

  const confirmDelete = async () => {
    if (deleteId) {
      await deleteItem(deleteId)
      setDeleteId(null)
    }
  }

  return (
     <RoleGuard 
      allowedRoles={[
        TD_NivelAcceso.Administrador,
      ]}
    >
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER CON STATS EN LA ESQUINA DERECHA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Shield className="w-7 h-7 text-primary" />
              Gestión de Personal MTI
            </h1>
            <p className="text-slate-500 text-sm mt-1">Administración de accesos y roles del sistema.</p>
          </div>

          {/* Stats compactos + Botón nuevo */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-slate-700">{totalFuncionarios}</span>
              <span className="text-xs text-slate-500">Total</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-200 rounded-lg shadow-sm">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">{activos}</span>
              <span className="text-xs text-slate-500">Activos</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 rounded-lg shadow-sm">
              <UserX className="w-4 h-4 text-red-500" />
              <span className="text-sm font-semibold text-red-600">{inactivos}</span>
              <span className="text-xs text-slate-500">Inactivos</span>
            </div>
            <button
              onClick={handleOpenCreate}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-all text-sm font-medium"
            >
              <Plus size={18} />
              Nuevo Funcionario
            </button>
          </div>
        </div>

        {/* FILTROS */}
        <div className="flex flex-col md:flex-row gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 flex-1">
            <Search className="text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre, email o ID..."
              className="bg-transparent outline-none w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full h-full bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-sm"
            >
              <option value="TODOS">Todos los Roles</option>
              {Object.values(TD_NivelAcceso)
                .filter((r) => r !== TD_NivelAcceso.Gestor_de_cooperativas_y_encargados)
                .map((rol) => (
                  <option key={rol} value={rol}>
                    {rol.replace(/_/g, " ")}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* TABLA DE DATOS */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          { (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">Funcionario</th>
                      <th className="px-6 py-4">Detalles Rol</th>
                      <th className="px-6 py-4">Último Acceso</th>
                      <th className="px-6 py-4 text-center">Estado</th>
                      <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedItems.map((empleado) => (
                      <tr key={empleado.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20 shrink-0 overflow-hidden">
                                {empleado.fotoUrl ? (
                                  <img
                                    src={empleado.fotoUrl || "/placeholder.svg"}
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span className="text-base">{empleado.nombres.charAt(0)}</span>
                                )}
                              </div>
                              <span
                                className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                                  empleado.estadoActivo ? "bg-emerald-500" : "bg-red-500"
                                }`}
                              />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800">{empleado.nombreCompleto}</p>
                              <div className="flex flex-col text-xs text-slate-500">
                                <span>{empleado.email}</span>
                                <span className="font-mono text-primary/70">{empleado.id}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-slate-700">
                              {empleado.nivelAcceso.replace(/_/g, " ")}
                            </span>
                            <span className="text-xs text-slate-400">
                              Permisos de {empleado.nivelAcceso.split("_")[0]}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {empleado.ultimoAcceso ? (
                            <div className="text-slate-600 text-xs">
                              <p>{new Date(empleado.ultimoAcceso).toLocaleDateString()}</p>
                              <p>
                                {new Date(empleado.ultimoAcceso).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400 italic">Nunca</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                              empleado.estadoActivo
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                empleado.estadoActivo ? "bg-emerald-500" : "bg-red-500"
                              }`}
                            />
                            {empleado.estadoActivo ? "ACTIVO" : "INACTIVO"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEdit(empleado)}
                              className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => setDeleteId(empleado.id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {paginatedItems.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-10 text-center text-slate-400">
                          No se encontraron registros.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINACIÓN */}
              {filteredItems.length > 0 && (
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Mostrando <span className="font-semibold text-slate-700">{indexOfFirstItem + 1}</span> -{" "}
                    <span className="font-semibold text-slate-700">
                      {Math.min(indexOfLastItem, filteredItems.length)}
                    </span>{" "}
                    de <span className="font-semibold text-slate-700">{filteredItems.length}</span> resultados
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded-lg border border-slate-300 bg-white text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="text-sm font-medium text-slate-600 px-2">
                      Página {currentPage} de {totalPages}
                    </span>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded-lg border border-slate-300 bg-white text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* MODAL CREAR/EDITAR */}
        {isModalOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <h2 className="text-xl font-bold text-slate-800">{isEditing ? "Editar" : "Nuevo"} Funcionario</h2>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Foto */}
                  <div className="md:col-span-4 flex flex-col items-center space-y-3">
                    <div className="relative w-full aspect-square max-w-[200px] rounded-xl overflow-hidden border-2 border-dashed border-slate-300 bg-slate-50 group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer z-20"
                      />
                      {currentPhotoUrl ? (
                        <img
                          src={currentPhotoUrl || "/placeholder.svg"}
                          className="w-full h-full object-cover"
                          alt="Preview"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                          <UploadCloud className="w-10 h-10 mb-2" />
                          <span className="text-xs">Subir foto</span>
                        </div>
                      )}
                      {isUploading && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                      )}
                    </div>
                    {currentPhotoUrl && (
                      <button
                        type="button"
                        onClick={() => setValue("url_Foto", "")}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Eliminar foto
                      </button>
                    )}
                  </div>

                  {/* Campos */}
                  <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-600">ID / Cédula</label>
                      <input
                        {...register("id", { required: true })}
                        disabled={isEditing}
                        placeholder="Ej: 001-123456-0000A"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none disabled:bg-slate-100"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-600">Nivel de Acceso</label>
                      <select
                        {...register("nivel_acceso")}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      >
                        {Object.values(TD_NivelAcceso)
                          .filter((r) => r !== TD_NivelAcceso.Gestor_de_cooperativas_y_encargados)
                          .map((r) => (
                            <option key={r} value={r}>
                              {r.replace(/_/g, " ")}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-600">Primer Nombre</label>
                      <input
                        {...register("primer_nombre", { required: true })}
                        placeholder="Ej: Juan"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-600">Segundo Nombre</label>
                      <input
                        {...register("segundo_nombre")}
                        placeholder="Ej: Carlos"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-600">Primer Apellido</label>
                      <input
                        {...register("primer_apellido", { required: true })}
                        placeholder="Ej: Pérez"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-600">Segundo Apellido</label>
                      <input
                        {...register("segundo_apellido")}
                        placeholder="Ej: García"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-medium text-slate-600">Email</label>
                      <input
                        {...register("email", { required: true })}
                        type="email"
                        placeholder="Ej: juan.perez@mti.gob.ni"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-medium text-slate-600">Estado</label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            {...register("esta_activo")}
                            value="true"
                            defaultChecked
                            className="w-4 h-4 text-primary"
                          />
                          <span className="text-sm text-slate-700">Activo</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            {...register("esta_activo")}
                            value="false"
                            className="w-4 h-4 text-primary"
                          />
                          <span className="text-sm text-slate-700">Inactivo</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Guardar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL ELIMINAR */}
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">¿Eliminar Funcionario?</h3>
              <p className="text-slate-500 text-sm mt-2 mb-6">
                Esta acción es irreversible y eliminará todos los datos asociados.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-5 py-2 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </RoleGuard>
  )
}
