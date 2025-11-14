"use client"
import BotonAtras from "@/components/login/BotonAtras"
import FondoLogin from "@/components/login/FondoLogin"
import TarjetaLogin from "@/components/login/TarjetaLogin"

export default function LoginPage() {

  

  return (
      <main
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 relative overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <style>{`
        @keyframes float-card {
          0%, 100% { transform: translateY(0px) translateZ(0px); }
          50% { transform: translateY(-10px) translateZ(30px); }
        }
        @keyframes border-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(96, 90, 234, 0.4), inset 0 0 20px rgba(96, 90, 234, 0.1); }
          50% { box-shadow: 0 0 40px rgba(96, 90, 234, 0.7), inset 0 0 30px rgba(96, 90, 234, 0.2); }
        }
      `}</style>

     

      

      {/* Botón de regreso */}
      <BotonAtras />

      {/* Efectos de fondo */}
      <FondoLogin />
      
      {/* Tarjeta de Login principal */}
      <TarjetaLogin />
    </main>
  )
}
