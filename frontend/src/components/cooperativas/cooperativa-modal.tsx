"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check } from 'lucide-react';

interface CooperativaData {
  nombre: string;
  encargado: string;
  rutas: number;
  telefono: string;
  direccion: string;
}


interface CooperativaModalProps {
  onSubmit: (data: CooperativaData) => void;
  onCancel: () => void;
  initialData?: CooperativaData;
  isEditing?: boolean;
}

export function CooperativaModal({
  onSubmit,
  onCancel,
  initialData,
  isEditing,
}: CooperativaModalProps) {
  const [formData, setFormData] = useState<CooperativaData>(
    initialData || {
      nombre: "",
      encargado: "",
      rutas: 0,
      telefono: "",
      direccion: "",
    }
  );

  const [errors, setErrors] = useState<Partial<CooperativaData>>({});

  const validateForm = () => {
    const newErrors: Partial<CooperativaData> = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.encargado.trim()) newErrors.encargado = "El encargado es requerido";
    if (formData.rutas <= 0) newErrors.rutas = 0;
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es requerido";
    if (!formData.direccion.trim()) newErrors.direccion = "La dirección es requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof CooperativaData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[var(--textColor)] font-semibold text-sm">
            Nombre de la Cooperativa
          </Label>
          <Input
            placeholder="Ej: Cooperativa Central"
            value={formData.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            className={`border-[var(--colorSecondary)] focus:border-[var(--colorPrimary)] bg-white text-[var(--textColor)] placeholder:text-[var(--textColor)]/40 transition-all ${
              errors.nombre ? "border-red-500 focus:border-red-500" : ""
            }`}
          />
          {errors.nombre && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.nombre}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-[var(--textColor)] font-semibold text-sm">
            Encargado
          </Label>
          <Input
            placeholder="Nombre del encargado"
            value={formData.encargado}
            onChange={(e) => handleChange("encargado", e.target.value)}
            className={`border-[var(--colorSecondary)] focus:border-[var(--colorPrimary)] bg-white text-[var(--textColor)] placeholder:text-[var(--textColor)]/40 transition-all ${
              errors.encargado ? "border-red-500 focus:border-red-500" : ""
            }`}
          />
          {errors.encargado && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.encargado}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-[var(--textColor)] font-semibold text-sm">
            Cantidad de Rutas
          </Label>
          <Input
            type="number"
            min="1"
            value={formData.rutas}
            onChange={(e) => handleChange("rutas", parseInt(e.target.value) || 0)}
            className={`border-[var(--colorSecondary)] focus:border-[var(--colorPrimary)] bg-white text-[var(--textColor)] transition-all ${
              errors.rutas ? "border-red-500 focus:border-red-500" : ""
            }`}
          />
          {errors.rutas && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.rutas}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-[var(--textColor)] font-semibold text-sm">
            Teléfono
          </Label>
          <Input
            type="tel"
            placeholder="+34 912 345 678"
            value={formData.telefono}
            onChange={(e) => handleChange("telefono", e.target.value)}
            className={`border-[var(--colorSecondary)] focus:border-[var(--colorPrimary)] bg-white text-[var(--textColor)] placeholder:text-[var(--textColor)]/40 transition-all ${
              errors.telefono ? "border-red-500 focus:border-red-500" : ""
            }`}
          />
          {errors.telefono && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.telefono}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-[var(--textColor)] font-semibold text-sm">
          Dirección
        </Label>
        <Input
          placeholder="Calle Principal 123, Ciudad"
          value={formData.direccion}
          onChange={(e) => handleChange("direccion", e.target.value)}
          className={`border-[var(--colorSecondary)] focus:border-[var(--colorPrimary)] bg-white text-[var(--textColor)] placeholder:text-[var(--textColor)]/40 transition-all ${
            errors.direccion ? "border-red-500 focus:border-red-500" : ""
          }`}
        />
        {errors.direccion && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.direccion}
          </p>
        )}
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <Button
          type="button"
          onClick={onCancel}
          className="bg-white border border-[var(--colorSecondary)] text-[var(--textColor)] hover:bg-[var(--bgGeneral)] transition-all px-6"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-[var(--colorPrimary)] to-[var(--colorAcentuar)] hover:from-[#1a5a9f] hover:to-[#4a449a] text-white font-semibold px-6 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          {isEditing ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </form>
  );
}
