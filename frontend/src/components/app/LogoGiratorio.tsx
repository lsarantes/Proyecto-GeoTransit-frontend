// components/LogoGiratorio.tsx

import React from 'react';

const LogoGiratorio = () => {
  return (
    <div className="flex justify-center" style={{ perspective: '10000px' }}>
      <div
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          animation: 'rotate-3d 20s linear infinite',
        }}
      >
        {/* Efecto de desenfoque/brillo */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#605AEA] to-[#4f51d8] rounded-3xl blur-3xl opacity-60 glow-text"></div>

        {/* Contenedor del ícono */}
        <div
          className="relative w-28 h-28 bg-gradient-to-br from-[#605AEA] via-[#5548d8] to-[#4f51d8] rounded-3xl flex items-center justify-center shadow-2xl border-2 border-[#605AEA]/80 hover:border-[#605AEA] transition-all duration-300 transform hover:scale-110"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow:
              '0 20px 60px rgba(96, 90, 234, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 40px rgba(96, 90, 234, 0.4)',
          }}
        >
          <span
            className="text-7xl drop-shadow-lg"
            style={{ textShadow: '0 0 18px rgba(96, 90, 234, 0.8)' }}
          >
            🚌
          </span>
        </div>
      </div>
    </div>
  );
};

export default LogoGiratorio;