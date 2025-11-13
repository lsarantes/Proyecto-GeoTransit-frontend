// components/login/TarjetaLogin.tsx

import React from 'react';
import { Card } from '@/components/ui/card'; // Asumo que usas Shadcn UI
import EncabezadoLogin from './EncabezadoLogin';
import FormularioLogin from './FormularioLogin';
import LoginSocial from './LoginSocial';

const TarjetaLogin = () => {
  return (
    <div className="relative z-10 w-full max-w-md">
      <Card
        className="bg-slate-900/50 border border-slate-700 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden"
        style={{
          animation: "border-glow 3s ease-in-out infinite",
          transformStyle: "preserve-3d",
          boxShadow: "0 20px 60px rgba(96, 90, 234, 0.4), 0 0 40px rgba(96, 90, 234, 0.3)",
        }}
      >
        {/* Acento superior */}
        
        <div className="px-5 py-3 md:px-8 md:py-4 space-y-6">
          {/* 1. Encabezado */}
          <EncabezadoLogin />

          {/* 2. Formulario */}
          <FormularioLogin />

          {/* 3. Divisor */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent"></div>
            <span className="text-xs text-slate-500">O continúa con</span>
            <div className="flex-1 h-px bg-gradient-to-l from-slate-700 to-transparent"></div>
          </div>

          {/* 4. Login Social */}
          <LoginSocial />

          {/* 5. Footer */}
          <div className="pt-4 text-center text-xs text-slate-400 border-t border-slate-700/50">
            ¿No tienes cuenta?{" "}
            <a href="#" className="text-[#605AEA] hover:text-[#7b6ee8] font-semibold transition-colors">
              Solicita acceso
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TarjetaLogin;