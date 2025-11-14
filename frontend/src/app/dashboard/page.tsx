"use client"

import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  
  const { isLoggedIn } = useAuth()
  console.log(isLoggedIn)
  return <div>
    <h1 className="text-3xl font-bold">¡Bienvenido al Dashboard!</h1>
    <p>Este es el contenido principal.</p>
  </div>;
}
