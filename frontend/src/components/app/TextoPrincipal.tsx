// components/TextoPrincipal.tsx

import React from 'react';

interface TextoPrincipalProps {
  titulo: string;
  subtitulo: string;
}

const TextoPrincipal: React.FC<TextoPrincipalProps> = ({
  titulo,
  subtitulo,
}) => {
  return (
    <div className="space-y-2 mt-10">
      <h1
        className="text-7xl md:text-8xl font-bold text-white tracking-tight"
        style={{
          textShadow:
            '0 0 15px rgba(96, 90, 234, 0.9), 0 0 25px rgba(96, 90, 234, 0.7), 0 0 40px rgba(96, 90, 234, 0.5), 0 0 60px rgba(96, 90, 234, 0.3)',
        }}
      >
        {titulo}
      </h1>
      <p
        className="text-xl text-slate-300 font-light"
        style={{ textShadow: '0 2px 10px rgba(96, 90, 234, 0.2)' }}
      >
        {subtitulo}
      </p>
    </div>
  );
};

export default TextoPrincipal;