"use client";

import { Building2, MapPin, Phone, User, Zap } from 'lucide-react';

interface Cooperativa {
  id: number;
  nombre: string;
  encargado: string;
  rutas: number;
  telefono: string;
  direccion: string;
}

interface CooperativaDetailsModalProps {
  cooperativa: Cooperativa;
}

export function CooperativaDetailsModal({ cooperativa }: CooperativaDetailsModalProps) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[var(--colorPrimary)]/10 to-[var(--colorAcentuar)]/10 p-4 rounded-lg border border-[var(--colorPrimary)]/20">
          <p className="text-xs text-[var(--textColor)]/60 font-bold uppercase mb-2 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[var(--colorPrimary)]"></span>
            ID
          </p>
          <p className="text-2xl font-bold text-[var(--colorPrimary)]">
            #{cooperativa.id.toString().padStart(3, '0')}
          </p>
        </div>

        <div className="bg-gradient-to-br from-[var(--colorAcentuar)]/10 to-[var(--colorPrimary)]/10 p-4 rounded-lg border border-[var(--colorAcentuar)]/20">
          <p className="text-xs text-[var(--textColor)]/60 font-bold uppercase mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[var(--colorAcentuar)]" />
            Rutas Activas
          </p>
          <p className="text-2xl font-bold text-[var(--colorAcentuar)]">
            {cooperativa.rutas}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white border border-[var(--colorSecondary)] p-4 rounded-lg hover:shadow-md transition-all">
          <p className="text-xs text-[var(--textColor)]/60 font-bold uppercase mb-2 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[var(--colorPrimary)]" />
            Nombre
          </p>
          <p className="text-base font-semibold text-[var(--textColor)]">
            {cooperativa.nombre}
          </p>
        </div>

        <div className="bg-white border border-[var(--colorSecondary)] p-4 rounded-lg hover:shadow-md transition-all">
          <p className="text-xs text-[var(--textColor)]/60 font-bold uppercase mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-[var(--colorPrimary)]" />
            Encargado
          </p>
          <p className="text-base font-semibold text-[var(--textColor)]">
            {cooperativa.encargado}
          </p>
        </div>

        <div className="bg-white border border-[var(--colorSecondary)] p-4 rounded-lg hover:shadow-md transition-all">
          <p className="text-xs text-[var(--textColor)]/60 font-bold uppercase mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[var(--colorPrimary)]" />
            Teléfono
          </p>
          <p className="text-base font-semibold text-[var(--textColor)]">
            {cooperativa.telefono}
          </p>
        </div>

        <div className="bg-white border border-[var(--colorSecondary)] p-4 rounded-lg hover:shadow-md transition-all">
          <p className="text-xs text-[var(--textColor)]/60 font-bold uppercase mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--colorPrimary)]" />
            Dirección
          </p>
          <p className="text-base font-semibold text-[var(--textColor)]">
            {cooperativa.direccion}
          </p>
        </div>
      </div>
    </div>
  );
}
