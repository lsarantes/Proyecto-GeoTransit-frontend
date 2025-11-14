"use client";

export default function FloatingDot({
  top = "25%",       // posición vertical
  left = "25%",      // posición horizontal
  size = "4px",      // tamaño del punto
  color = "#605AEA", // color del punto
  duration = "4s",   // duración de la animación
}) {
  return (
    <div
      className="absolute rounded-full animate-pulse"
      style={{
        top,
        left,
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`,
        animation: `float-3d ${duration} ease-in-out infinite`,
      }}
    ></div>
  );
}
