"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import { Label } from "@/components/ui/label"

interface ProfileAvatarProps {
  fotoUrl?: string
  nombre: string
  isEditing: boolean
  onPhotoChange: (url: string) => void
}

export function ProfileAvatar({ fotoUrl, nombre, isEditing, onPhotoChange }: ProfileAvatarProps) {
  // Obtener iniciales para el fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // AQUÍ: En un caso real, subirías el archivo a tu backend/S3/Firebase.
      // Por ahora, creamos una URL local temporal para previsualizar.
      const objectUrl = URL.createObjectURL(file)
      onPhotoChange(objectUrl)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <Avatar className="h-32 w-32 border-4 border-background shadow-xl cursor-pointer">
          <AvatarImage src={fotoUrl} alt={nombre} className="object-cover" />
          <AvatarFallback className="text-2xl bg-muted">
            {getInitials(nombre)}
          </AvatarFallback>
        </Avatar>

        {/* Botón de cámara superpuesto (solo visible en edición) */}
        {isEditing && (
          <div className="absolute bottom-0 right-0">
            <Label 
              htmlFor="photo-upload" 
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              <Camera className="h-5 w-5" />
              <input 
                id="photo-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </Label>
          </div>
        )}
      </div>

      <div className="text-center">
        <h3 className="text-lg font-medium text-foreground">Foto de Perfil</h3>
        <p className="text-sm text-muted-foreground">
          {isEditing ? "Toca el icono para cambiar" : "Visible para todos los usuarios"}
        </p>
      </div>
    </div>
  )
}