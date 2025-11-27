import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Camera, CalendarDays, Mail, ShieldCheck } from "lucide-react";
import { useRef } from "react";

interface ProfileAvatarProps {
  fotoUrl: string | null | undefined;
  nombres: string; // Recibirá "primer_nombre segundo_nombre"
  apellidos: string; // Recibirá "primer_apellido segundo_apellido"
  email: string;
  rol: string;
  lastLogin: string | Date; // Fecha del último login
  isEditing: boolean;
  onPhotoChange: (url: string) => void;
}

export function ProfileAvatar({
  fotoUrl,
  nombres,
  apellidos,
  email,
  rol,
  lastLogin,
  isEditing,
  onPhotoChange,
}: ProfileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      onPhotoChange(objectUrl);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const initials = getInitials(nombres, apellidos);
  const fullName = `${nombres} ${apellidos}`.trim();

  return (
    <Card className="overflow-hidden border-slate-200 shadow-lg">
      <div className="h-32 bg-gradient-to-r from-indigo-600 to-blue-500 relative">
        {isEditing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white text-sm opacity-0 hover:opacity-100 transition-opacity">
            Cambiar portada (Proximamente)
          </div>
        )}
      </div>
      
      <CardContent className="relative pt-0 pb-8 text-center px-4">
        
        {/* Avatar Container */}
        <div className="relative -mt-16 mb-4 inline-block">
          <Avatar className="w-32 h-32 border-4 border-white shadow-lg bg-white">
            <AvatarImage src={fotoUrl || ""} className="object-cover" />
            <AvatarFallback className="text-2xl font-bold bg-indigo-50 text-indigo-600">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          {/* Botón de editar foto (Solo visible en modo edición) */}
          {isEditing && (
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 rounded-full shadow-md hover:bg-slate-200 bg-white border border-slate-200"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="w-4 h-4 text-slate-700" />
            </Button>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
          />
        </div>

        {/* Nombres y Rol */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-slate-900">{fullName}</h2>
          <Badge variant="secondary" className="mt-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
            <ShieldCheck className="w-3 h-3 mr-1" />
            {rol || "Usuario"}
          </Badge>
        </div>

        <Separator className="my-4" />

        {/* Detalles Informativos */}
        <div className="space-y-3 text-sm text-left px-2">
          <div className="flex items-center gap-3 text-slate-600">
            <Mail className="w-4 h-4 text-indigo-500" />
            <span className="truncate" title={email}>{email}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <CalendarDays className="w-4 h-4 text-indigo-500" />
            <span>Último acceso: {new Date(lastLogin).toLocaleDateString("es-ES", { dateStyle: "medium" })}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
