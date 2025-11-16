"use client";

import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import FeaturesGrid from '@/components/app/features-grid';
import HeroSection from '@/components/app/hero-section';
import BackgroundElements from '@/components/app/background-elements';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F2F7FD] via-white to-[#F2F7FD] relative overflow-hidden">
      {/* Background decorative elements */}
      <BackgroundElements />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-5">
        <div className="max-w-4xl w-full">
          
          {/* Hero Section */}
          <HeroSection />

          {/* Features Grid */}
          <FeaturesGrid />

          {/* CTA Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => router.push('/login')}
              className="bg-[#2275C3] hover:bg-[#1a5a9f] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Iniciar Sesión
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Footer tagline */}
          <p className="text-center text-sm text-[#3F4756]/60 pt-8">
            Plataforma empresarial • GPS en tiempo real • Seguridad corporativa
          </p>
        </div>
      </div>
    </main>
  );
}
