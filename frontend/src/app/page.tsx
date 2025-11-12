"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function Home() {
  
  const router = useRouter();
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Grid and lines pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgb(59, 130, 246)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1000" height="1000" fill="url(#grid)" />
          <line x1="0" y1="250" x2="1000" y2="250" stroke="rgb(59, 130, 246)" strokeWidth="2" />
          <line x1="0" y1="500" x2="1000" y2="500" stroke="rgb(59, 130, 246)" strokeWidth="2" />
          <line x1="0" y1="750" x2="1000" y2="750" stroke="rgb(59, 130, 246)" strokeWidth="2" />
          <line x1="250" y1="0" x2="250" y2="1000" stroke="rgb(34, 197, 234)" strokeWidth="2" />
          <line x1="500" y1="0" x2="500" y2="1000" stroke="rgb(34, 197, 234)" strokeWidth="2" />
          <line x1="750" y1="0" x2="750" y2="1000" stroke="rgb(34, 197, 234)" strokeWidth="2" />
        </svg>

        {/* Accent lines */}
        <div className="absolute top-20 left-1/4 w-px h-64 bg-gradient-to-b from-blue-500/30 to-transparent"></div>
        <div className="absolute bottom-32 right-1/3 w-px h-48 bg-gradient-to-t from-cyan-500/30 to-transparent"></div>

        {/* Floating dots */}
        <div
          className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-40 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/3 w-2 h-2 bg-blue-300 rounded-full opacity-40 animate-pulse"
          style={{ animationDelay: "2.5s" }}
        ></div>
      </div>

      <div className="text-center space-y-8 max-w-2xl relative z-10">
        {/* Bus Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
            <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 6h-1V4c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1v2H6c-2.76 0-5 2.24-5 5v9c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-9c0-2.76-2.24-5-5-5zM8 5h8v2H8V5zm10 11H6v-7h12v7zm-7-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
            </svg>
          </div>
        </div>

        {/* Company Name and Description */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Geo</span>
            <span className="text-white"> Transit</span>
          </h1>
          <p className="text-xl text-slate-300">Soluciones inteligentes de logística y transporte</p>
        </div>

        {/* Login Button */}
        <div className="pt-8">
            <Button
              size="lg"
              onClick={
                () => router.push("/login")
              }
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-full font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              Iniciar Sesión
            </Button>
        </div>
      </div>
    </main>
  );
}
