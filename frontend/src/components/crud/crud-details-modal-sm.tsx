"use client";

import { ItemDetailsModalProps } from '@/types/crud-interface-types';
import { TypeLevel } from '@/types/type-level';
import { 
  FileText, 
  Info, 
  Hash, 
  User, 
  ShieldCheck, // Icono para Rol
  CreditCard   // Icono genérico para destacados
} from 'lucide-react'; 

export function ItemDetailsModal<T extends { id: string }>({ item, columns }: ItemDetailsModalProps<T>) {
    
    const idColumn = columns.find((c) => c.level === TypeLevel.id);
    const photoColumn = columns.find((c) => c.level === TypeLevel.foto);
    const titleColumn = columns.find((c) => c.level === TypeLevel.titulo);     
    const subtitleColumn = columns.find((c) => c.level === TypeLevel.subtitulo); 

 
    const roleColumn = columns.find(c => c.key === 'rol');

    const detailColumns = columns.filter(c => 
        c.level !== TypeLevel.id && 
        c.level !== TypeLevel.foto && 
        c.level !== TypeLevel.titulo &&
        c.level !== TypeLevel.subtitulo &&
        c.key !== 'rol' 
    );

    // --- HELPER PARA SOLUCIONAR EL [object Object] ---
    const renderValue = (value: any) => {
        if (value === null || value === undefined || value === "") 
            return <span className="text-slate-300 italic">No registrado</span>;
        
        if (typeof value === 'object' && 'label' in value) {
            return (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border shadow-sm
                    ${value.value === 'positive' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                      value.value === 'negative' ? 'bg-red-50 text-red-700 border-red-200' : 
                      'bg-slate-50 text-slate-700 border-slate-200'
                    }
                `}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-2 
                        ${value.value === 'positive' ? 'bg-emerald-500' : 
                          value.value === 'negative' ? 'bg-red-500' : 'bg-slate-400'}`
                    }></span>
                    {value.label}
                </span>
            );
        }

        if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T/)) {
            return new Date(value).toLocaleString();
        }

        if (typeof value === 'boolean') return value ? "Sí" : "No";

        return String(value);
    };

    return (
        <div className="flex flex-col h-full w-full bg-slate-50/50">
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                
                {/* --- TARJETA PRINCIPAL (Header) --- */}
                {/* Nombre y Usuario a la Izq | Foto e ID a la Derecha */}
                <div className="bg-white rounded-2xl border border-[var(--colorSecondary)] p-6 shadow-sm relative overflow-hidden group">
                    {/* Fondo decorativo sutil */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[var(--colorPrimary)]/5 to-transparent rounded-bl-full -mr-10 -mt-10 pointer-events-none transition-transform group-hover:scale-110 duration-500" />

                    <div className="relative z-10 flex justify-between items-start gap-4">
                        
                        {/* IZQUIERDA: Nombre y Usuario */}
                        <div className="flex flex-col justify-center h-full pt-2">
                            {titleColumn && (
                                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--textColor)] tracking-tight leading-tight">
                                    {renderValue(item[titleColumn.key as keyof T])}
                                </h1>
                            )}
                            
                            {subtitleColumn && (
                                <div className="flex items-center gap-2 mt-2 text-[var(--textColor)]/60 font-medium text-lg">
                                    <div className="p-1 bg-slate-100 rounded-md">
                                        <User className="w-4 h-4 text-[var(--colorPrimary)]" />
                                    </div>
                                    @{renderValue(item[subtitleColumn.key as keyof T])}
                                </div>
                            )}
                        </div>

                        {/* DERECHA: Foto e ID */}
                        <div className="flex flex-col items-center gap-3 shrink-0">
                            {photoColumn ? (
                                <div className="relative group/img">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100 ring-1 ring-slate-200">
                                        <img 
                                            src={String(item[photoColumn.key as keyof T])} 
                                            alt="Perfil"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                                            onError={(e: any) => e.target.src = 'https://via.placeholder.com/150?text=NA'}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[var(--colorPrimary)]/10 flex items-center justify-center border-4 border-white shadow-sm text-[var(--colorPrimary)]">
                                    <User className="w-10 h-10" />
                                </div>
                            )}

                            {idColumn && (
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 shadow-sm">
                                    <Hash className="w-3.5 h-3.5 text-slate-400" />
                                    <span>ID: {String(item[idColumn.key as keyof T])}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- 2. INFORMACIÓN DESTACADA (Rol) --- */}
                {roleColumn && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[var(--colorPrimary)]">
                            <Info className="w-4 h-4" />
                            <h3 className="text-sm font-bold uppercase tracking-wider">
                                Información Destacada
                            </h3>
                        </div>
                        
                        <div className="bg-white rounded-xl border border-blue-100 p-5 shadow-sm flex items-center gap-4 bg-gradient-to-r from-blue-50/50 to-transparent">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-full shrink-0">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-0.5">
                                    {roleColumn.label}
                                </p>
                                <p className="text-xl font-bold text-slate-800">
                                    {renderValue(item[roleColumn.key as keyof T])}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- 3. DETALLES ADICIONALES (El resto) --- */}
                {detailColumns.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-slate-400 mt-2">
                            <FileText className="w-4 h-4" />
                            <h3 className="text-sm font-bold uppercase tracking-wider">
                                Detalles Adicionales
                            </h3>
                            <div className="h-px bg-slate-200 flex-1 ml-2"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            {detailColumns.map((col) => (
                                <div 
                                    key={String(col.key)} 
                                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-[var(--colorPrimary)]/30 hover:shadow-md transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-2 mb-2 text-slate-400 group-hover:text-[var(--colorPrimary)] transition-colors">
                                        {col.Icon ? <col.Icon className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                                        <span className="text-[10px] font-bold uppercase tracking-wider">
                                            {col.label}
                                        </span>
                                    </div>
                                    
                                    <div className="text-slate-700 font-medium text-sm break-words leading-relaxed pl-1">
                                        {renderValue(item[col.key as keyof T])}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
