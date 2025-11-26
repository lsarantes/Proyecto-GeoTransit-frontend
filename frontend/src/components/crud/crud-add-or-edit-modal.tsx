"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check, ChevronDown, ImageIcon, MapIcon, UploadCloud, X, MapPin } from 'lucide-react';
import { handleValidatedChange } from "@/types/regular-expresion";
import { LocationPickerModal } from "./location-modal-picker";

export function CrudModal({ onSubmit, onCancel, initialData, isEditing, fields }: any) {
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState<any>({});
  const [showLocationPicker, setShowLocationPicker] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: any = {};
    fields.forEach((field: any) => {
      const value = formData[field.key];
      if (field.validate) {
        const error = field.validate(value);
        if (error) newErrors[field.key] = error;
      } else if (field.type !== 'photo' && typeof value === "string" && !value.trim()) {
        newErrors[field.key] = `${field.label} es requerido`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev: any) => ({ ...prev, [field]: undefined }));
  };

  // --- RENDERERS MEJORADOS ---

  function renderLocationField(field: any) {
      const value = formData[field.key] || { lat: 0, lng: 0 };
      const hasValue = value.lat !== 0 || value.lng !== 0;

      return (
          <div key={String(field.key)} className="space-y-2.5">
              <Label className="text-slate-700 font-semibold text-sm flex justify-between">
                  {field.label}
                  {hasValue && <span className="text-[10px] font-normal text-emerald-600 bg-emerald-50 px-2 rounded-full">Coordenadas activas</span>}
              </Label>
              <div className="flex rounded-lg shadow-sm ring-1 ring-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <div className="flex-1 flex border-r border-slate-200 bg-slate-50/50">
                      <span className="px-3 flex items-center text-slate-400 border-r border-slate-100 bg-white">Lat</span>
                      <input
                          className="w-full bg-transparent border-none text-sm px-3 py-2.5 focus:outline-none tabular-nums text-slate-700"
                          placeholder="0.0000"
                          value={value.lat}
                          onChange={(e:any) => handleChange(field.key, { ...value, lat: parseFloat(e.target.value) || 0 })}
                          type="number"
                      />
                  </div>
                  <div className="flex-1 flex bg-slate-50/50">
                      <span className="px-3 flex items-center text-slate-400 border-r border-slate-100 bg-white">Lng</span>
                      <input
                          className="w-full bg-transparent border-none text-sm px-3 py-2.5 focus:outline-none tabular-nums text-slate-700"
                          placeholder="0.0000"
                          value={value.lng}
                          onChange={(e:any) => handleChange(field.key, { ...value, lng: parseFloat(e.target.value) || 0 })}
                          type="number"
                      />
                  </div>
                  <button
                      type="button"
                      onClick={() => setShowLocationPicker(field.key)}
                      className="px-4 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border-l border-slate-200 transition-colors flex items-center justify-center"
                      title="Seleccionar en Mapa"
                  >
                      <MapPin className="w-4 h-4" />
                  </button>
              </div>
              {errors[field.key] && <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-left-1"><AlertCircle className="w-3 h-3" />{errors[field.key]}</p>}
          </div>
      );
  }

  function renderMultiSelectField(field: any) {
      const selectedIds = new Set(formData[field.key] || []);
      const toggleOption = (id: string) => {
          const newSet = new Set(selectedIds);
          if (newSet.has(id)) newSet.delete(id);
          else newSet.add(id);
          handleChange(field.key, Array.from(newSet));
      };

      return (
          <div key={String(field.key)} className="space-y-2.5">
              <div className="flex justify-between items-end">
                  <Label className="text-slate-700 font-semibold text-sm">{field.label}</Label>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{selectedIds.size} Seleccionados</span>
              </div>
              
              <div className="border border-slate-200 rounded-lg max-h-[180px] overflow-y-auto bg-slate-50/30 p-2 custom-scrollbar shadow-inner">
                  {field.options?.length > 0 ? (
                      <div className="grid grid-cols-1 gap-1">
                          {field.options.map((opt: any) => {
                              const isSelected = selectedIds.has(opt);
                              return (
                                  <div
                                      key={opt.value}
                                      onClick={() => toggleOption(opt)}
                                      className={`
                                          flex items-center gap-3 p-2.5 rounded-md cursor-pointer text-sm transition-all duration-200 border
                                          ${isSelected 
                                              ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm translate-x-1' 
                                              : 'bg-white border-transparent hover:border-slate-200 hover:bg-slate-50 text-slate-600'
                                          }
                                      `}
                                  >
                                      <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-transparent border border-slate-200'}`}>
                                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                      </div>
                                      <span className="font-medium">{opt.label}</span>
                                  </div>
                              );
                          })}
                      </div>
                  ) : (
                      <div className="p-4 text-sm text-slate-400 text-center italic">No hay opciones disponibles</div>
                  )}
              </div>
          </div>
      );
  }

  function renderPhotoField(field: any) {
      const value = formData[field.key];
      return (
          <div key={String(field.key)} className="space-y-2.5">
              <Label className="text-slate-700 font-semibold text-sm">{field.label}</Label>
              <div className="group relative">
                  <div className={`
                      relative w-full rounded-xl overflow-hidden border-2 border-dashed transition-all duration-300
                      ${value ? 'border-blue-200 bg-blue-50/30 h-48' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-blue-400 h-32'}
                  `}>
                      <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer z-20"
                          onChange={(e: any) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                  const fakeUrl = URL.createObjectURL(file);
                                  handleChange(field.key, fakeUrl);
                              }
                          }}
                      />
                      
                      {value ? (
                          <div className="w-full h-full relative group-hover:opacity-90 transition-opacity">
                              <img src={value} alt="Preview" className="w-full h-full object-contain p-2" />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all z-10">
                                  <div className="bg-white text-slate-800 text-xs font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                      <ImageIcon className="w-4 h-4 text-blue-600"/> Cambiar imagen
                                  </div>
                              </div>
                              <button 
                                onClick={(e) => { e.preventDefault(); handleChange(field.key, null); }}
                                className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-full z-30 transition-colors"
                              >
                                  <X className="w-4 h-4" />
                              </button>
                          </div>
                      ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 pointer-events-none">
                              <div className="bg-white p-3 rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform duration-300">
                                  <UploadCloud className="w-6 h-6 text-blue-500" />
                              </div>
                              <span className="text-sm font-medium text-slate-600">Haz clic para subir</span>
                              <span className="text-xs text-slate-400 mt-1">SVG, PNG, JPG (Max. 5MB)</span>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      );
  }

  function renderSelectField(field: any) {
      return (
          <div key={String(field.key)} className="space-y-2.5">
              <Label className="text-slate-700 font-semibold text-sm">{field.label}</Label>
              <div className="relative">
                  <select
                      value={formData[field.key] || ""}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        
                        const fullOption = field.options?.find((opt: any) => opt.value === newValue);
                        
                        handleChange(field.key, fullOption || newValue);
                    }}
                      className="flex h-11 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none transition-all shadow-sm"
                  >
                      <option value="" disabled>Seleccionar una opción...</option>
                      {field.options?.map((opt: any) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                  </select>
                  <div className="absolute right-3 top-3 pointer-events-none text-slate-400">
                      <ChevronDown className="w-4 h-4" />
                  </div>
              </div>
              {errors[field.key] && <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-left-1"><AlertCircle className="w-3 h-3" />{errors[field.key]}</p>}
          </div>
      );
  }

  function renderStandardField(field: any) {
    return (
      <div key={String(field.key)} className="space-y-2.5">
        <Label className="text-slate-700 font-semibold text-sm">{field.label}</Label>
        <Input
          type={field.type || "text"}
          {...(field.type === "number" ? { min: field.min } : {})}
          value={formData[field.key] || ""}
          placeholder={field.placeholder}
          onChange={(e: any) => {
            if (field.pattern) {
                handleValidatedChange(e, new RegExp(field.pattern), (value) => 
                    handleChange(field.key, field.type === "number" ? parseFloat(value) : value)
                )
            } else {
                handleChange(field.key, field.type === "number" ? parseFloat(e.target.value) : e.target.value)
            }
          }}
          inputMode={field.inputMode}
          className={`h-11 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-slate-900 transition-all shadow-sm ${errors[field.key] ? "border-red-300 focus:border-red-500 focus:ring-red-200" : ""}`}
        />
        {errors[field.key] && <p className="text-xs text-red-500 flex items-center gap-1 animate-in slide-in-from-left-1"><AlertCircle className="w-3 h-3" />{errors[field.key]}</p>}
      </div>
    );
  }

  function renderField(field: any) {
      if (field.type === 'location') return renderLocationField(field);
      if (field.type === 'multiselect') return renderMultiSelectField(field);
      if (field.type === 'photo') return renderPhotoField(field);
      if (field.type === 'select') return renderSelectField(field);
      return renderStandardField(field);
  }

  return (
    <>
        {/* BODY SCROLLABLE */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <form id="crud-form" onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    {fields.filter((f: any) => f.layout === "grid").map((field: any) => renderField(field))}
                </div>
                <div className="space-y-6">
                    {fields.filter((f: any) => f.layout === "full").map((field: any) => renderField(field))}
                </div>
            </form>
        </div>

        {/* FOOTER STICKY ACTIONS */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200">
            <Button 
                type="button" 
                onClick={onCancel} 
                variant="ghost" 
                className="text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 font-medium"
            >
                Cancelar
            </Button>
            <Button 
                type="submit" 
                form="crud-form" // Conecta con el form ID
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-100 transition-all px-6"
            >
                <Check className="w-4 h-4 mr-2" /> 
                {isEditing ? "Guardar Cambios" : "Crear Registro"}
            </Button>
        </div>

        {/* LOCATION PICKER MODAL */}
        {showLocationPicker && (
            <LocationPickerModal 
                initialLocation={formData[showLocationPicker]}
                onClose={() => setShowLocationPicker(null)}
                onSelect={(coords: any) => {
                    handleChange(showLocationPicker, coords);
                    setShowLocationPicker(null);
                }}
            />
        )}
    </>
  );
}