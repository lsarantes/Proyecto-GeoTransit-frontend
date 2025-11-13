"use client"
import { ArrowRight, Link, MapPin, Zap } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import ParticleField from "@/components/app/ConjuntoDeParticulas";
import OrbesDeLuz from "@/components/app/OrbesDeLuz";
import SeccionPrincipal from "@/components/app/SeccionPrincipal";

export default function Home() {
  
  const router = useRouter();
  return (
   <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 relative overflow-hidden perspective py-3">
      <style>{`
        @keyframes float-3d {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-20px) rotateZ(5deg); }
        }
        @keyframes rotate-3d {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(96, 90, 234, 0.5), 0 0 40px rgba(96, 90, 234, 0.3); }
          50% { box-shadow: 0 0 40px rgba(96, 90, 234, 0.8), 0 0 80px rgba(96, 90, 234, 0.5); }
        }
        @keyframes slide-line {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(1); }
          100% { transform: scaleX(0); }
        }
        .perspective {
          perspective: 1200px;
        }
        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.320, 1);
        }
        .card-3d:hover {
          transform: rotateX(5deg) rotateY(-5deg) translateZ(20px);
        }
        .glow-text {
          animation: glow-pulse 3s ease-in-out infinite;
        }
      `}</style>

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

        {/* Puntos flotantes */}
        <ParticleField />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-3xl text-center">
       <SeccionPrincipal/>
      </div>
    </main>
  );
}
