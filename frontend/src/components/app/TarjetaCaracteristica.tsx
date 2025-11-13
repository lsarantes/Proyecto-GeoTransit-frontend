// components/TarjetaCaracteristica.tsx

import React from 'react';

interface TarjetaCaracteristicaProps {
  icono: string;
  titulo: string;
  descripcion: string;
  /** Controla la dirección de rotación del ícono al hacer hover */
  rotacionHover?: 'izquierda' | 'derecha';
}

const TarjetaCaracteristica: React.FC<TarjetaCaracteristicaProps> = ({
  icono,
  titulo,
  descripcion,
  rotacionHover = 'derecha', // Valor por defecto
}) => {
  // Clase de rotación condicional
  const claseRotacion =
    rotacionHover === 'derecha'
      ? 'group-hover:rotate-12'
      : 'group-hover:-rotate-12';

  return (
    <div
      className="card-3d group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-5 backdrop-blur-xl hover:border-[#605AEA]/60 transition-all duration-500 overflow-hidden"
      style={{
        boxShadow:
          '0 16px 48px rgba(96, 90, 234, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 40px rgba(96, 90, 234, 0.1)',
      }}
    >
      {/* Efecto de fondo brillante al hacer hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#605AEA]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#605AEA]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 bg-gradient-to-br from-[#605AEA]/40 to-[#605AEA]/20 rounded-lg flex items-center justify-center group-hover:from-[#605AEA]/60 group-hover:to-[#605AEA]/40 transition-all duration-500 transform group-hover:scale-110 ${claseRotacion} flex-shrink-0`}
            style={{
              boxShadow:
                '0 0 20px rgba(96, 90, 234, 0.4), inset 0 0 20px rgba(96, 90, 234, 0.1)',
            }}
          >
            <span className="text-2xl">{icono}</span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-[#605AEA] transition-colors duration-300">
            {titulo}
          </h3>
        </div>
        <p className="text-slate-400 text-xs leading-relaxed group-hover:text-slate-300 transition-colors">
          {descripcion}
        </p>

        {/* Elementos decorativos */}
      </div>

      {/* Animación de borde al hacer hover */}
      <div className="absolute inset-0 rounded-xl border border-[#605AEA]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default TarjetaCaracteristica;
