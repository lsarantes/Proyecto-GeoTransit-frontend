"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { X, User, Loader2, Camera } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { IEmpleadoFormValues, IEmpleadoMti, TD_NivelAcceso } from "@/types/interface/interface-user"
import { Switch } from "@radix-ui/react-switch"

const CLOUD_NAME = "dc99fxwy2"
const UPLOAD_PRESET = "mi_app_preset"

interface EmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: IEmpleadoFormValues) => Promise<boolean>
  employee?: IEmpleadoMti | null
}

export function EmployeeModal({ isOpen, onClose, onSubmit, employee }: EmployeeModalProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!employee

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IEmpleadoFormValues>({
    defaultValues: {
      esta_activo: true,
      nivel_acceso: TD_NivelAcceso.Gestor_de_bahias,
      url_Foto: "",
    },
  })

  const currentPhotoUrl = watch("url_Foto")
  const currentNivelAcceso = watch("nivel_acceso")
  const isActive = watch("esta_activo")

  useEffect(() => {
    if (employee) {
      const nameParts = employee.nombres.split(" ")
      const lastParts = employee.apellidos.split(" ")
      setValue("id", employee.id)
      setValue("primer_nombre", nameParts[0] || "")
      setValue("segundo_nombre", nameParts[1] || "")
      setValue("primer_apellido", lastParts[0] || "")
      setValue("segundo_apellido", lastParts[1] || "")
      setValue("email", employee.email)
      setValue("nivel_acceso", employee.nivelAcceso)
      setValue("esta_activo", employee.estadoActivo)
      setValue("url_Foto", employee.fotoUrl || "")
    } else {
      reset({
        esta_activo: true,
        nivel_acceso: TD_NivelAcceso.Gestor_de_bahias,
        url_Foto: "",
      })
    }
  }, [employee, setValue, reset])

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
        toast.success("Imagen cargada correctamente")
      }
    } catch (error) {
      toast.error("Error al subir la imagen")
    } finally {
      setIsUploading(false)
    }
  }

  const handleFormSubmit = async (data: IEmpleadoFormValues) => {
    setIsSubmitting(true)
    const success = await onSubmit(data)
    setIsSubmitting(false)
    if (success) {
      onClose()
      reset()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slide-in-up border border-border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {isEditing ? "Editar Funcionario" : "Nuevo Funcionario"}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isEditing ? "Modifica los datos del funcionario" : "Completa la información del nuevo funcionario"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Photo Upload & ID Section */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Photo */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-2xl bg-muted border-2 border-dashed border-border overflow-hidden flex items-center justify-center">
                    {currentPhotoUrl ? (
                      <img
                        src={currentPhotoUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-muted-foreground/50" />
                    )}
                  </div>
                  <label className="absolute inset-0 flex items-center justify-center bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                    {isUploading ? (
                      <Loader2 className="w-6 h-6 text-primary-foreground animate-spin" />
                    ) : (
                      <Camera className="w-6 h-6 text-primary-foreground" />
                    )}
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">Click para subir foto</p>
              </div>

              {/* ID and Role */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="id">ID del Funcionario</Label>
                    <Input
                      id="id"
                      {...register("id", { required: "El ID es requerido" })}
                      disabled={isEditing}
                      placeholder="Ej: EMP-001"
                      className="bg-input"
                    />
                    {errors.id && <p className="text-xs text-destructive">{errors.id.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Nivel de Acceso</Label>
                    <Select
                      value={currentNivelAcceso}
                      onValueChange={(value) => setValue("nivel_acceso", value as TD_NivelAcceso)}
                    >
                      <SelectTrigger className="bg-input">
                        <SelectValue placeholder="Seleccionar rol" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(TD_NivelAcceso)
                          .filter((r) => r !== TD_NivelAcceso.Gestor_de_cooperativas_y_encargados)
                          .map((rol) => (
                            <SelectItem key={rol} value={rol}>
                              {rol.replace(/_/g, " ")}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Status Toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">Estado del funcionario</p>
                    <p className="text-xs text-muted-foreground">
                      {isActive ? "El funcionario puede acceder al sistema" : "El funcionario no puede acceder"}
                    </p>
                  </div>
                  <Switch checked={isActive} onCheckedChange={(checked) => setValue("esta_activo", checked)} />
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Información Personal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primer_nombre">Primer Nombre *</Label>
                  <Input
                    id="primer_nombre"
                    {...register("primer_nombre", {
                      required: "El nombre es requerido",
                    })}
                    placeholder="Juan"
                    className="bg-input"
                  />
                  {errors.primer_nombre && <p className="text-xs text-destructive">{errors.primer_nombre.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="segundo_nombre">Segundo Nombre</Label>
                  <Input
                    id="segundo_nombre"
                    {...register("segundo_nombre")}
                    placeholder="Carlos"
                    className="bg-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primer_apellido">Primer Apellido *</Label>
                  <Input
                    id="primer_apellido"
                    {...register("primer_apellido", {
                      required: "El apellido es requerido",
                    })}
                    placeholder="García"
                    className="bg-input"
                  />
                  {errors.primer_apellido && (
                    <p className="text-xs text-destructive">{errors.primer_apellido.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="segundo_apellido">Segundo Apellido</Label>
                  <Input
                    id="segundo_apellido"
                    {...register("segundo_apellido")}
                    placeholder="López"
                    className="bg-input"
                  />
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Contacto</h3>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "El email es requerido",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email inválido",
                    },
                  })}
                  placeholder="juan.garcia@geotransit.com"
                  className="bg-input"
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/30">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isUploading || isSubmitting} className="bg-primary hover:bg-primary/90">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : isEditing ? (
                "Guardar Cambios"
              ) : (
                "Crear Funcionario"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
