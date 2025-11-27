"use client";


import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, ShieldAlert } from "lucide-react";
import { TD_NivelAcceso } from "@/types/interface/interface-user";
import { useAuth } from "@/context/AuthContext";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: TD_NivelAcceso[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user, isLoading } = useAuth(); // Asumo que 'user' tiene la propiedad 'nivelAcceso'
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // 1. Si no está logueado, mandar al login
      if (!user) {
        router.push("/login");
        return;
      }

      // 2. Si es Administrador, tiene pase libre (Opcional, pero recomendado)
      if (user.detalles_rol?.nivel === TD_NivelAcceso.Administrador) {
        return;
      }

      // 3. Verificar si el rol del usuario está en la lista permitida
      if (!allowedRoles.includes(user.detalles_rol?.nivel as TD_NivelAcceso)) {
        // Redirigir a una página de error o al dashboard por defecto
        router.push("/dashboard"); 
      }
    }
  }, [user, isLoading, allowedRoles, router]);

  // MIENTRAS CARGA O VERIFICA
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin w-10 h-10 text-indigo-600" />
      </div>
    );
  }

  // SI NO HAY USUARIO (Para evitar flash de contenido antes del redirect)
  if (!user) return null;

  // VERIFICACIÓN FINAL DE RENDERIZADO
  const isAllowed = 
    user.detalles_rol?.nivel === TD_NivelAcceso.Administrador || 
    allowedRoles.includes(user.detalles_rol?.nivel as TD_NivelAcceso);

  if (!isAllowed) {
    // Retornar null o una UI de "Acceso Denegado" mientras el useEffect redirige
    return null; 
  }

  return <>{children}</>;
}