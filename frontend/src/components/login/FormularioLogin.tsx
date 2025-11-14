// components/login/FormularioLogin.tsx

'use client'; // Necesario para usar estado (useState) y eventos (onClick)

import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Asumo que usas Shadcn UI
import { Input } from '@/components/ui/input';   // Asumo que usas Shadcn UI
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const FormularioLogin = () => {
  // Estado para el formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth()
  const router = useRouter();

  // Lógica para manejar el envío
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
    <form onSubmit={handleLogin} className="space-y-5">
      {/* Email Input */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-slate-200">
          Correo Electrónico
        </label>
        <div className="relative group">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#605AEA] pointer-events-none transition-colors" />
          <Input
            id="email"
            type="email"
            placeholder="usuario@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-slate-800/70 border border-slate-700 text-white placeholder:text-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605AEA]/50 focus:border-[#605AEA] transition-all duration-200 hover:border-slate-600"
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-semibold text-slate-200">
          Contraseña
        </label>
        <div className="relative group">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#605AEA] pointer-events-none transition-colors" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 bg-slate-800/70 border border-slate-700 text-white placeholder:text-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605AEA]/50 focus:border-[#605AEA] transition-all duration-200 hover:border-slate-600"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Remember & Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center text-slate-400 hover:text-slate-300 cursor-pointer transition-colors">
          <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-800 accent-[#605AEA]" />
          <span className="ml-2">Recuérdame</span>
        </label>
        <a href="#" className="text-[#605AEA] hover:text-[#7b6ee8] transition-colors font-medium">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#605AEA] to-[#4f51d8] hover:from-[#7b6ee8] hover:to-[#605AEA] text-white py-2.5 font-semibold rounded-lg transition-all duration-300 shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
        style={{
          boxShadow: "0 8px 24px rgba(96, 90, 234, 0.5)",
        }}
      >
        {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </Button>
    </form>
  );
};

export default FormularioLogin;

function login() {
  throw new Error('Function not implemented.');
}
