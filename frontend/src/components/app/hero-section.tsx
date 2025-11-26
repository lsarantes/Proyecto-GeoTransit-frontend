"use client";

import LogoGiratorio from "./logo-giratorio";


export default function HeroSection() {
  return (
    <div className="space-y-6 text-center animate-slide-in-up">
      {/* Logo icon */}
      <LogoGiratorio />

      {/* Main heading */}
      <div className="space-y-3">
        <h1 className="text-5xl md:text-6xl font-bold text-[#3F4756] leading-tight">
          Geo <span className="text-[#2275C3]">Transit</span>
        </h1>
        <p className="text-xl text-[#3F4756]/70">
          Seguimiento inteligente de transporte público
        </p>
      </div>

      {/* Description */}
      <p className="text-lg text-[#3F4756]/60 max-w-2xl mx-auto leading-relaxed">
        Monitorea en <span className="font-semibold text-[#2275C3]">tiempo real</span> la ubicación exacta de tus unidades. 
        Optimiza rutas, aumenta eficiencia y mejora la experiencia del usuario con datos precisos.
      </p>
    </div>
  );
}
