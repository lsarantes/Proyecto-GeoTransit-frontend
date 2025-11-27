"use client";

import { useState, useEffect } from "react";
import { Save, UserCog, Undo2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/service/api";
import { User } from "@/types/interface/interface-auth";

import { ProfileAvatar } from "@/components/configPerfil/profile-avatar";
import { ProfileForm } from "@/components/configPerfil/profile-form";

// Usamos la misma interfaz que definiste en ProfileForm
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
    fechaCreacion?: string; // Nuevo campo para la fecha de creación si existe
    email: string;
}


export default function ConfiguracionPerfilPage() {
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const [profileDataState, setProfileDataState] = useState<ProfileDataState | null>(null);
  const [backupData, setBackupData] = useState<ProfileDataState | null>(null);

  // --- 1. CARGA INICIAL DE DATOS DEL CONTEXTO ---
  useEffect(() => {
    if (user && user.persona) {
      const persona = user.persona;
      const rolDisplay = user.detalles_rol?.nivel || user.role;
      const telefonoDisplay = persona.telefonos && persona.telefonos.length > 0
          ? persona.telefonos[0].no_telefonico
          : '';
      
      const initialData: ProfileDataState = {
        // Datos editables
        primer_nombre: persona.primer_nombre || "",
        segundo_nombre: persona.segundo_nombre || null,
        primer_apellido: persona.primer_apellido || "",
        segundo_apellido: persona.segundo_apellido || null,
        url_Foto: persona.fotoUrl || null,
        telefono: telefonoDisplay,

        // Datos de UI (solo lectura)
        rol: rolDisplay,
        email: user.email,
        fecha: user.lastLogin,
        fechaCreacion: user.lastLogin?.toString() || '2023-01-01', // Asume que tienes un `createdAt` en `User`
      };

      setProfileDataState(initialData);
      setBackupData(initialData);
      setIsProfileLoading(false);
    } else if (!user) {
        if (isProfileLoading) setIsProfileLoading(false); 
    }
  }, [user]);

  // Manejador de cambios local
  const handleChange = (newData: ProfileDataState) => {
    setProfileDataState(newData);
  };
  
  // Manejador de cambio de foto (actualiza solo la URL)
  const handlePhotoChange = (newUrl: string) => {
    setProfileDataState(prev => ({ ...prev!, url_Foto: newUrl }));
  };

  // Prevenir renderizado si la información de sesión no está lista
  if (isProfileLoading || !profileDataState) {
    return (
      <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-4 text-muted-foreground">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        <p className="ml-3 text-lg">Cargando perfil...</p>
      </div>
    );
  }
  
  const handleStartEdit = () => {
    setBackupData({ ...profileDataState! }); 
    setIsEditing(true);
  };

  const handleCancel = () => {
    setProfileDataState(backupData); 
    setIsEditing(false);
  };

  // --- 3. CONEXIÓN AL BACKEND (GUARDAR) ---

  const handleSave = async () => {
    if (!profileDataState) return;
    setIsSaving(true);

    const dto = { // Payload para el backend
        primer_nombre: profileDataState.primer_nombre,
        segundo_nombre: profileDataState.segundo_nombre,
        primer_apellido: profileDataState.primer_apellido,
        segundo_apellido: profileDataState.segundo_apellido,
        url_Foto: profileDataState.url_Foto,
        //telefono: profileDataState.telefono, // Asegúrate de que tu backend lo maneje
    };
    
    try {
        await apiFetch<User>('/auth/profile', {
            method: 'PATCH',
            body: JSON.stringify(dto),
            headers: { 'Content-Type': 'application/json' },
        });

        toast.success("Perfil actualizado con éxito.");
        
        //await refreshUser(); 

        setIsEditing(false);

    } catch (error: any) {
        console.error("Error al guardar perfil:", error);
        toast.error("Error al actualizar. Intente de nuevo.");
        setProfileDataState(backupData); // Restaurar datos
    } finally {
        setIsSaving(false);
    }
  }

  // --- RENDERIZADO ---
  
  const displayProfile = profileDataState; 
  const displayNombres = `${displayProfile.primer_nombre} ${displayProfile.segundo_nombre || ''}`.trim();
  const displayApellidos = `${displayProfile.primer_apellido} ${displayProfile.segundo_apellido || ''}`.trim();


  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de la Página y Botones */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Configuración de Perfil</h1>
            <p className="text-slate-500 mt-1">
              Administra tu información personal y datos de contacto.
            </p>
          </div>
          
          {/* Botones de Acción Principales */}
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel} disabled={isSaving} className="text-slate-600 hover:text-slate-800 border-slate-300">
                  <Undo2 className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
                <Button onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  {isSaving ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                  {isSaving ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </>
            ) : (
              <Button onClick={handleStartEdit} className="bg-slate-800 hover:bg-slate-700 text-white shadow-md">
                <UserCog className="mr-2 h-4 w-4" />
                Editar Perfil
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Columna Izquierda: Avatar (Lg: 1/4) */}
          <div className="lg:col-span-1">
            <ProfileAvatar 
                fotoUrl={displayProfile.url_Foto}
                nombres={displayNombres}
                apellidos={displayApellidos}
                email={displayProfile.email}
                rol={displayProfile.rol}
                lastLogin={displayProfile.fecha}
                isEditing={isEditing}
                onPhotoChange={handlePhotoChange}
            />
          </div>

          {/* Columna Derecha: Formulario Detallado (Lg: 3/4) */}
          <div className="lg:col-span-3">
            <ProfileForm 
                data={displayProfile}
                isEditing={isEditing}
                onChange={handleChange}
            />
          </div>

        </div>
      </div>
    </div>
  )
}