"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Calendar, ShieldCheck } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface ProfileDataState {
    // Editables
    primer_nombre: string;
    segundo_nombre: string | null | undefined;
    primer_apellido: string;
    segundo_apellido: string | null | undefined;
    url_Foto: string | null | undefined;
    telefono?: string;
    
    // Solo lectura
    rol: string; 
    fecha: string | Date; // lastLogin
    fechaCreacion?: string; 
    email: string;
}


interface ProfileFormProps {
  data:  ProfileDataState
  isEditing: boolean
  onChange: (data:  ProfileDataState) => void
}


export function ProfileForm({ data, isEditing, onChange }: ProfileFormProps) {
  const handleChange = (field: keyof  ProfileDataState, value: string) => {
    onChange({ ...data, [field]: value })
  }

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
  
  const inputClass = "bg-white border-slate-300 disabled:bg-slate-50 disabled:cursor-default transition-colors";

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Datos Personales Editables</CardTitle>
        <CardDescription>
          Modifica tu información de identificación. Los campos marcados no son editables.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
      
        {/* Sección de Edición de Nombres y Apellidos */}
        <div className="space-y-6">
            {/* Nombres */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="primerNombre" className="text-slate-600 font-medium">
                  Primer Nombre
                </Label>
                <Input
                  id="primerNombre"
                  value={data.primer_nombre}
                  onChange={(e) => handleChange("primer_nombre", e.target.value)}
                  disabled={!isEditing}
                  className={inputClass}
                  placeholder="Ej. Juan"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="segundoNombre" className="text-slate-600 font-medium">
                  Segundo Nombre
                </Label>
                <Input
                  id="segundoNombre"
                  value={data.segundo_nombre ?? ""}
                  onChange={(e) => handleChange("segundo_nombre", e.target.value)}
                  disabled={!isEditing}
                  className={inputClass}
                  placeholder="Ej. Carlos"
                />
              </div>
            </div>

            {/* Apellidos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="primerApellido" className="text-slate-600 font-medium">
                  Primer Apellido
                </Label>
                <Input
                  id="primerApellido"
                  value={data.primer_apellido}
                  onChange={(e) => handleChange("primer_apellido", e.target.value)}
                  disabled={!isEditing}
                  className={inputClass}
                  placeholder="Ej. Pérez"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="segundoApellido" className="text-slate-600 font-medium">
                  Segundo Apellido
                </Label>
                <Input
                  id="segundoApellido"
                  value={data.segundo_apellido ?? ""}
                  onChange={(e) => handleChange("segundo_apellido", e.target.value)}
                  disabled={!isEditing}
                  className={inputClass}
                  placeholder="Ej. González"
                />
              </div>
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-slate-600 font-medium">Teléfono de Contacto</Label>
              <Input
                id="telefono"
                value={data.telefono}
                onChange={(e) => handleChange("telefono", e.target.value)}
                disabled={!isEditing}
                placeholder="Número de teléfono"
                className={inputClass}
              />
            </div>
          </div>
          
          <Separator />
          
          {/* Sección de Información de Cuenta (Solo Lectura) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-700">Detalles de Cuenta</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Email */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center text-slate-500 text-sm">
                  <Mail className="w-4 h-4 mr-2" /> Email
                </div>
                <p className="font-medium text-slate-800 break-all">{data.email}</p>
              </div>

              {/* Rol */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center text-slate-500 text-sm">
                  <ShieldCheck className="w-4 h-4 mr-2" /> Rol
                </div>
                <Badge className="w-fit bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                  {data.rol}
                </Badge>
              </div>
              
              {/* Fecha Creación */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center text-slate-500 text-sm">
                  <Calendar className="w-4 h-4 mr-2" /> Fecha de Creación
                </div>
                <p className="font-medium text-slate-800">{formatDate(data.fechaCreacion)}</p>
              </div>
            </div>

            {/* Último Login (como nota) */}
            <p className="text-xs text-slate-400 pt-2 border-t mt-4">
              Último Inicio de Sesión: {new Date(data.fecha.toString()).toLocaleString()}
            </p>
          </div>
      </CardContent>
    </Card>
  )
}