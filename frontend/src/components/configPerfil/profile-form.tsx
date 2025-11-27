"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Phone } from "lucide-react"

interface ProfileData {
  primerNombre: string
  segundoNombre: string
  primerApellido: string
  segundoApellido: string
  codigoPais: string
  fechaCreacion: string
  fechaActualizacion: string
  rol: string
  telefono: string
}

interface ProfileFormProps {
  data: ProfileData
  isEditing: boolean
  onChange: (data: ProfileData) => void
}


export function ProfileForm({ data, isEditing, onChange }: ProfileFormProps) {
  const handleChange = (field: keyof ProfileData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Nombres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="primerNombre" className="text-foreground font-medium">
            Primer Nombre
          </Label>
          <Input
            id="primerNombre"
            value={data.primerNombre}
            onChange={(e) => handleChange("primerNombre", e.target.value)}
            disabled={!isEditing}
            className="bg-card border-border disabled:bg-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="segundoNombre" className="text-foreground font-medium">
            Segundo Nombre
          </Label>
          <Input
            id="segundoNombre"
            value={data.segundoNombre}
            onChange={(e) => handleChange("segundoNombre", e.target.value)}
            disabled={!isEditing}
            className="bg-card border-border disabled:bg-gray-100"
          />
        </div>
      </div>

      {/* Apellidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="primerApellido" className="text-foreground font-medium">
            Primer Apellido
          </Label>
          <Input
            id="primerApellido"
            value={data.primerApellido}
            onChange={(e) => handleChange("primerApellido", e.target.value)}
            disabled={!isEditing}
            className="bg-card border-border disabled:bg-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="segundoApellido" className="text-foreground font-medium">
            Segundo Apellido
          </Label>
          <Input
            id="segundoApellido"
            value={data.segundoApellido}
            onChange={(e) => handleChange("segundoApellido", e.target.value)}
            disabled={!isEditing}
            className="bg-card border-border disabled:bg-gray-100"
          />
        </div>
      </div>

      {/* Código de País*/}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="codigoPais" className="text-foreground font-medium">
            Código de País
          </Label>
          
          <Input
            id="codigoPais"
            value={data.codigoPais}
            onChange={(e) => handleChange("codigoPais", e.target.value)}
            disabled={!isEditing}
            placeholder="+505"
            className="bg-card border-border disabled:bg-gray-100"
          />
        </div>
       <div className="space-y-2">
        <Label className="text-foreground font-medium">Teléfono</Label>
        <div className="flex items-center gap-2">
          
          <Input
            value={data.telefono}
            onChange={(e) => handleChange("telefono", e.target.value)}
            disabled={!isEditing}
            placeholder="Número de teléfono"
            className="bg-card border-border disabled:bg-gray-100"
          />
        </div>
      </div>
      </div>

      

      {/* Fechas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
        <div className="space-y-2">
          <Label className="text-muted-foreground text-sm">Fecha de Creación</Label>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              {formatDate(data.fechaCreacion)}
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground text-sm">Última Actualización</Label>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              {formatDate(data.fechaActualizacion)}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
