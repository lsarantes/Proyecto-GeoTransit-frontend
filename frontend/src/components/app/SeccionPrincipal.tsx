"use client";

import { useRouter } from "next/navigation"; 

import { Button } from '@/components/ui/button'; // Asumo que usas shadcn/ui
import { ArrowRight } from 'lucide-react';

// 1. Importa los nuevos componentes
import LogoGiratorio from './LogoGiratorio';
import TextoPrincipal from './TextoPrincipal';
import TarjetaCaracteristica from './TarjetaCaracteristica';


// 2. Es una buena práctica definir los datos de las tarjetas en un array
const datosTarjetas = [
  {
    icono: '📍',
    titulo: 'Tiempo Real',
    descripcion: 'Ubicación exacta actualizada cada segundo',
    rotacion: 'derecha',
  },
  {
    icono: '📊',
    titulo: 'Analytics',
    descripcion: 'Reportes y estadísticas en tiempo real',
    rotacion: 'izquierda',
  },
  {
    icono: '🔒',
    titulo: 'Seguridad',
    descripcion: 'Cifrado de grado empresarial',
    rotacion: 'derecha',
  },
];

const SeccionPrincipal = () => {
  const router = useRouter();

  return (
    <div className="relative z-10 max-w-3xl text-center space-y-10">
      
      {/* --- Sección del Logo y Título --- */}
      <div className="space-y-4 animate-fade-in">
        
        {/* 3. Usas el componente LogoGiratorio */}
        <LogoGiratorio />
        
        {/* 4. Usas el componente TextoPrincipal con props */}
        <TextoPrincipal
          titulo="Geo Transit"
          subtitulo="Seguimiento inteligente de transporte público"
        />
      </div>

      {/* --- Descripción --- */}
      <p className="text-slate-300 text-xll leading-relaxed max-w-2xll mx-auto font-light">
        Monitorea en{' '}
        <span
          className="text-[#605AEA] font-semibold"
          style={{ textShadow: '0 0 15px rgba(96, 90, 234, 0.6)' }}
        >
          tiempo real
        </span>{' '}
        la ubicación exacta de tus unidades. Optimiza rutas, aumenta eficiencia y
        mejora la experiencia del usuario con datos precisos.
      </p>

      {/* --- Grid de Características --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-6xl mx-auto">
        
        {/* 5. Mapeas los datos para renderizar las tarjetas dinámicamente */}
        {datosTarjetas.map((tarjeta) => (
          <TarjetaCaracteristica
            key={tarjeta.titulo}
            icono={tarjeta.icono}
            titulo={tarjeta.titulo}
            descripcion={tarjeta.descripcion}
            rotacionHover={tarjeta.rotacion as 'izquierda' | 'derecha'}
          />
        ))}
      </div>

      {/* --- Botón CTA --- */}
        <Button
          onClick={() => router.push('/login')}
          size="lg"
          className="bg-gradient-to-r from-[#605AEA] to-[#4f51d8] hover:from-[#7b6ee8] hover:to-[#605AEA] text-white px-12 py-7 text-lg rounded-xl font-bold transition-all duration-300 flex items-center gap-3 mx-auto transform hover:scale-110 active:scale-95"
          style={{
            boxShadow:
              '0 0 30px rgba(96, 90, 234, 0.6), 0 8px 24px rgba(96, 90, 234, 0.4)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          Iniciar Sesión
          <ArrowRight className="w-5 h-5" />
        </Button>

      {/* --- Tagline Footer --- */}
      <p className="text-xs text-slate-400 pt-2">
        Plataforma empresarial • GPS en tiempo real • Seguridad corporativa
      </p>
    </div>
  );
};

export default SeccionPrincipal;