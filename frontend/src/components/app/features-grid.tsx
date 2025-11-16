"use client";

import FeatureCard from "./feature-card";

const features = [
  {
    icon: "📍",
    title: "GPS en Tiempo Real",
    description: "Monitoreo de ubicación exacta actualizada cada segundo para máxima precisión"
  },
  {
    icon: "📊",
    title: "Analytics Avanzado",
    description: "Reportes detallados y estadísticas en tiempo real para mejores decisiones"
  },
  {
    icon: "🔒",
    title: "Seguridad Empresarial",
    description: "Cifrado de grado militar con autenticación de dos factores"
  }
];

export default function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}
