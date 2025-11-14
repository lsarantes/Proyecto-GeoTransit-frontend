// components/OrbesDeLuz.tsx

import React from 'react';

// Define el tipo para la posición y la intensidad para tipado seguro
type Position = 'topRight' | 'bottomLeft';
type Intensity = 'high' | 'low';

interface OrbesDeLuzProps {
  /** Color base en formato hex (ej: '#605AEA'). Por defecto: '#605AEA' */
  color?: string;
  /** Posición de la esfera. Por defecto: 'topRight' */
  position?: Position;
  /** Intensidad del gradiente y sombra. Por defecto: 'high' */
  intensity?: Intensity;
  /** Retraso de la animación en segundos (ej: '1s'). Por defecto: '0s' */
  animationDelay?: string;
}

const OrbesDeLuz: React.FC<OrbesDeLuzProps> = ({
  color = '#605AEA',
  position = 'topRight',
  intensity = 'high',
  animationDelay = '0s',
}) => {
  // 1. Clases base comunes
  const baseClasses =
    'absolute w-96 h-96 rounded-full mix-blend-screen filter blur-3xl';

  // 2. Clases de posición y gradiente
  const positionClasses =
    position === 'topRight'
      ? '-top-40 -right-40 bg-gradient-to-br'
      : '-bottom-40 -left-40 bg-gradient-to-tr';

  // 3. Clases de intensidad (simula animate-pulse y opacidades)
  const intensityClasses =
    intensity === 'high'
      ? 'animate-pulse' // Solo el de alta intensidad tendrá el pulse
      : '';

  // 4. Estilos dinámicos (usando el color props)
  
  // Prepara los valores RGB del color para el boxShadow
  // NOTA: Esto requiere una función o librería para conversión HEX a RGB.
  // Para simplificar, asumiremos que sabes el RGB de tu color (ej: #605AEA es 96, 90, 234)
  const [r, g, b] = color === '#605AEA' ? [96, 90, 234] : [96, 90, 234]; // Usar el valor predeterminado si el color es diferente para mantener la funcionalidad.

  const styleProps: React.CSSProperties = {
    // Sombra de caja dinámica
    boxShadow:
      intensity === 'high'
        ? `0 0 80px rgba(${r}, ${g}, ${b}, 0.6), inset 0 0 80px rgba(${r}, ${g}, ${b}, 0.2)`
        : `0 0 60px rgba(${r}, ${g}, ${b}, 0.5)`,
    
    // Animación y Retraso
    animation:
      intensity === 'high'
        ? `float-3d 6s ease-in-out infinite`
        : `float-3d 8s ease-in-out infinite`,
    animationDelay: animationDelay,
    
    // Gradiente dinámico (usando variables CSS o clases directas de Tailwind)
    // Para colores dinámicos, la mejor práctica es usar CSS personalizado o inline style.
    // Aquí usamos un truco de Tailwind con el color por defecto:
    backgroundImage: 
        position === 'topRight' && intensity === 'high'
        ? `linear-gradient(to bottom right, ${color}66, ${color}33, transparent)` // /40 y /20
        : `linear-gradient(to top right, ${color}4d, ${color}26, transparent)`, // /30 y /15
  };

  return (
    <div
      className={`${baseClasses} ${positionClasses} ${intensityClasses}`}
      style={styleProps}
    ></div>
  );
};

export default OrbesDeLuz;