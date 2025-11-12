"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { isLoggedIn, login } = useAuth()
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Aquí va tu lógica de autenticación
    setTimeout(function(){ 
      setLoading(false)
      login()
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="bg-slate-800 border-slate-700 shadow-2xl">
          <div className="p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <Link href="/" className="inline-block mb-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </Link>
              <h1 className="text-2xl font-bold text-white">Bienvenido</h1>
              <p className="text-slate-400">Inicia sesión en tu cuenta de Geo Transit</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                  Correo Electrónico
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Contraseña
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 font-semibold rounded-lg transition-all"
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm text-slate-400">
              ¿No tienes cuenta?{" "}
              <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Regístrate aquí</span>
            </div>
          </div>
        </Card>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 right-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        </div>
      </div>
    </main>
  )
}
