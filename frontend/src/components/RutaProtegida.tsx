// components/RutaProtegida.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext" // Ajusta esta ruta

// Componente opcional de carga
const Cargando = () => (
  <div className="flex items-center justify-center h-screen">
    <p>Cargando...</p>
  </div>
)

export function RutaProtegida({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return <Cargando /> // o return null;
  }

  return <>{children}</>
}