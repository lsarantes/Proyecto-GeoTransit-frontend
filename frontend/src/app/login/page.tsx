'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import LoginForm from '@/components/login/login-form';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-5 relative">
      {/* Back Button */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Atrás</span>
      </Link>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card rounded-2xl border border-border shadow-xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <span className="text-3xl">🚌</span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Geo Transit</h1>
            <p className="text-sm text-foreground/60 mt-2">Acceso a la plataforma de seguimiento</p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-foreground/70">
            ¿No tienes cuenta?{' '}
            <a href="#" className="text-primary font-semibold hover:text-primary/90 transition-colors">
              Solicita acceso
            </a>
          </div>
        </div>

        {/* Trust Message */}
        <p className="text-center text-xs text-foreground/50 mt-6">
          Tus datos están protegidos con encriptación de nivel empresarial
        </p>
      </div>
    </main>
  );
}
