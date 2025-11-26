"use client"

import { useState } from "react"
import { Save, UserCog, Undo2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Importamos tus componentes locales
import { ProfileForm } from "@/components/configPerfil/profile-form"
import { ProfileAvatar } from "@/components/configPerfil/profile-avatar"

// 👇 1. Interfaz de Datos (Coincide con tu ProfileForm)
interface ProfileData {
  primerNombre: string
  segundoNombre: string
  primerApellido: string
  segundoApellido: string
  codigoPais: string
  telefono: string
  fechaCreacion: string
  fechaActualizacion: string
  rol: string
  fotoUrl?: string // Agregamos campo opcional para la foto
}

export default function ConfiguracionPerfilPage() {
  
  // 👇 2. Estado Inicial (Simulando datos de BD)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [profileData, setProfileData] = useState<ProfileData>({
    primerNombre: "Juan",
    segundoNombre: "Carlos",
    primerApellido: "Pérez",
    segundoApellido: "Rodríguez",
    codigoPais: "+505",
    telefono: "8888-8888",
    fechaCreacion: "2023-01-15T10:00:00",
    fechaActualizacion: "2023-11-20T15:30:00",
    rol: "Administrador",
    fotoUrl: "https://github.com/shadcn.png"
  })

  // Copia de seguridad para cancelar cambios
  const [backupData, setBackupData] = useState<ProfileData>(profileData)

  // 👇 3. Handlers (Manejadores de lógica)

  // Activar modo edición
  const handleStartEdit = () => {
    setBackupData({ ...profileData }) // Guardamos estado actual
    setIsEditing(true)
  }

  // Cancelar edición
  const handleCancel = () => {
    setProfileData(backupData) // Restauramos datos
    setIsEditing(false)
  }

  // Guardar cambios
  const handleSave = async () => {
    setIsLoading(true)
    
    // Simulamos petición al backend
    setTimeout(() => {
      console.log("GUARDANDO PERFIL:", profileData)
      // Aquí iría tu llamada a la API: await updateProfile(profileData)
      
      // Actualizamos la fecha de modificación localmente
      setProfileData(prev => ({
        ...prev,
        fechaActualizacion: new Date().toISOString()
      }))
      
      setIsLoading(false)
      setIsEditing(false)
    }, 1000)
  }

  // Actualizar campos del formulario
  const handleChange = (newData: ProfileData) => {
    setProfileData(newData)
  }

  // Actualizar solo la foto
  const handlePhotoChange = (newUrl: string) => {
    setProfileData(prev => ({ ...prev, fotoUrl: newUrl }))
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de la Página */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Configuración de Perfil</h1>
            <p className="text-muted-foreground mt-1">
              Administra tu información personal y preferencias de cuenta.
            </p>
          </div>
          
          {/* Botones de Acción Principales */}
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel} disabled={isLoading} className="cursor-pointer text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 font-medium">
                  <Undo2 className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
                <Button onClick={handleSave} disabled={isLoading} className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white">
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </>
            ) : (
              <Button onClick={handleStartEdit} className="bg-gradient-to-r from-[var(--colorPrimary)] to-[var(--colorAcentuar)] hover:from-[#1a5a9f] hover:to-[#4a449a] text-white">
                <UserCog className="mr-2 h-4 w-4" />
                Editar Perfil
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: Avatar y Resumen */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <ProfileAvatar 
                  fotoUrl={profileData.fotoUrl}
                  nombre={`${profileData.primerNombre} ${profileData.primerApellido}`}
                  isEditing={isEditing}
                  onPhotoChange={handlePhotoChange}
                />
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Rol del Sistema</h4>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                      {profileData.rol}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Miembro desde</h4>
                    <p className="text-sm font-medium">
                      {new Date(profileData.fechaCreacion).getFullYear()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna Derecha: Formulario Detallado */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>
                  Actualiza tus datos de identificación y contacto.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileForm 
                  data={profileData}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}