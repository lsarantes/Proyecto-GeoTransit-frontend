"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check } from 'lucide-react';
import { CrudModalProps, FieldConfig } from "@/types/crud-interface-types";
import { handleValidatedChange } from "@/types/regular-expresion";



export function CrudModal<T>({
  onSubmit,
  onCancel,
  initialData,
  isEditing,
  fields
}: CrudModalProps<T>) {
  const [formData, setFormData] = useState<T>(
    (initialData as T) || {} as T
  );

  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof T, string>> = {};

    fields.forEach(field => {
      const value = formData[field.key];
      if (field.validate) {
        const error = field.validate(value);
        if (error) newErrors[field.key] = error;
      } else if (typeof value === "string" && !value.trim()) {
        newErrors[field.key] = `${field.label} es requerido`;
      } else if (typeof value === "number" && value <= 0) {
        newErrors[field.key] = `${field.label} debe ser mayor que 0`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof T, value: any) => {
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




  function renderField(field: FieldConfig<T>) {
    return (
      <div key={String(field.key)} className="space-y-2">
        <Label className="text-[var(--textColor)] font-semibold text-sm">
          {field.label}
        </Label>
        <Input
          type={field.type || "text"}
          {...(field.type === "number"
            ? { min: field.min } : {}
          )}
          value={formData[field.key] as any || ""}
          placeholder={field.placeholder}
          onChange={e => {

            handleValidatedChange(
              e,
              new RegExp(field.pattern!),
              (value) =>
                handleChange(field.key, field.type === "number" ? parseFloat(value) : value)
            )
          }}
          pattern={field.pattern === "" ? undefined : field.pattern}
          inputMode={field.inputMode}
          className={`border-[var(--colorSecondary)] focus:border-[var(--colorPrimary)] bg-white text-[var(--textColor)] placeholder:text-[var(--textColor)]/40 transition-all ${errors[field.key] ? "border-red-500 focus:border-red-500" : ""
            }`}
        />
        {errors[field.key] && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors[field.key]}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.filter(f => f.layout === "grid").map(field => renderField(field))}
      </div>

      <div className="space-y-2">
        {fields.filter(f => f.layout === "full").map(field => renderField(field))}
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

