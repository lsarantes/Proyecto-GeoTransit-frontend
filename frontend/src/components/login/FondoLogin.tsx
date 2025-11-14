// components/login/FondoLogin.tsx

import React from 'react';
import OrbesDeLuz from '../app/OrbesDeLuz';
import ParticleField from '../app/ConjuntoDeParticulas';

const FondoLogin = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orbes principal púrpura */}
        <OrbesDeLuz
        position="topRight"
        intensity="high"
        animationDelay="0s" 
      />

      {/* 2. Esfera Inferior Izquierda (la original) */}
      <OrbesDeLuz
        position="bottomLeft"
        intensity="low"
        animationDelay="1s" // Retraso de 1s
      />

      
      <ParticleField count={30} />
    </div>
  );
};

export default FondoLogin;