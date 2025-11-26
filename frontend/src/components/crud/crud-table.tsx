"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MoreHorizontal, Pencil, Trash2, ChevronDown, Loader, MapPin, Calendar, MapIcon, ExternalLink } from 'lucide-react';
import { useMediaQuery } from "@/hook/use-media-query";
import { GenericTableProps } from "@/types/crud-interface-types";
import { TypeLevel } from "@/types/type-level";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { EstadosDefinidos } from "@/types/types-stule-estado";



export function CrudTable<T extends { id: string }>({
    originalItems,
    filteredItems,
    identity,
    Icon = Loader,
    columns,
    onEdit,
    onDelete,
    onView,
    onViewLocation,
    handleItemsPerPageChange,
    searchTerm,
    currentPage,
    itemsPerPage,
}: GenericTableProps<T>) {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const items = filteredItems.slice(startIdx, endIdx);
    const firstTitle = columns.find(c => c.level === TypeLevel.titulo);
    const firstSubtitle = columns.find(c => c.level === TypeLevel.subtitulo);
    const fotoColumn = columns.find(col => col.level === TypeLevel.foto);
// Helper para obtener estilos según el nivel de estado
const getStatusConfig = (level: EstadosDefinidos = "neutral", customClass: string = "") => {
    const base = "border font-medium text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm transition-colors";
    
    const styles: Record<EstadosDefinidos, string> = {
        positive: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100", // Activo
        negative: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",       // Fuera de servicio
        regular:  "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100", // Mantenimiento
        neutral:  "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100", // Desconocido
        personalizado:  "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100", // Desconocido
    };

    return `${base} ${styles[level] || styles.neutral} ${customClass}`;
};

// Helper para renderizar el indicador visual (puntito)
const StatusDot = ({ level }: { level: EstadosDefinidos }) => {
    const colors: Record<EstadosDefinidos, string> = {
        positive: "bg-emerald-500",
        negative: "bg-red-500",
        regular:  "bg-amber-500",
        neutral:  "bg-slate-400",
        personalizado: "bg-emerald-500"
    };
    return <span className={`w-1.5 h-1.5 rounded-full ${colors[level] || colors.neutral}`} />;
};


// --- MOBILE VIEW ---
    if (!isDesktop) {
        // 1. Separamos las columnas por grupos para renderizarlas en orden específico
        const textRelevanteCols = columns.filter(c => c.level === TypeLevel.textRelevante);
        
        // 2. Columnas para el Grid (excluyendo Header y Relevante que va aparte)
        const gridColumns = columns.filter(c => 
            ![TypeLevel.id, TypeLevel.foto, TypeLevel.titulo, TypeLevel.subtitulo, TypeLevel.textRelevante].includes(c.level as string)
        );

        return (
            <div className="w-full space-y-4 animate-in fade-in duration-500">
                {items.length === 0 ? (
                    <div className="rounded-xl border border-[var(--colorSecondary)] bg-white py-12 text-center shadow-sm">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-[var(--bgGeneral)] flex items-center justify-center border border-[var(--colorSecondary)]">
                                {Icon && <Icon className="w-5 h-5 text-[var(--textColor)]/50" />}
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-[var(--textColor)]">
                                    {searchTerm ? "Sin resultados" : `No hay ${identity}`}
                                </h3>
                                <p className="text-xs text-[var(--textColor)]/60 mt-1">
                                    {searchTerm ? "Prueba con otra búsqueda" : "Crea un registro para comenzar"}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className={`group rounded-xl border transition-all duration-300 overflow-hidden ${
                                expandedId === item.id 
                                ? "border-[var(--colorPrimary)] shadow-md bg-white ring-1 ring-[var(--colorPrimary)]/20" 
                                : "border-[var(--colorSecondary)] bg-white shadow-sm hover:shadow-md"
                            }`}
                        >
                            {/* --- CARD HEADER --- */}
                            <button
                                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                className="w-full p-3.5 flex items-center gap-3 text-left relative bg-white z-10"
                            >
                                {fotoColumn && (
                                    <div className="relative h-10 w-10 shrink-0">
                                        <div className="absolute inset-0 rounded-full border border-slate-100 shadow-sm overflow-hidden">
                                            <img
                                                src={(item as any)[fotoColumn.key]}
                                                alt="Foto"
                                                className="w-full h-full object-cover"
                                                onError={(e: any) => e.target.src = 'https://via.placeholder.com/40?text=NA'}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-[var(--colorPrimary)] bg-[var(--colorPrimary)]/10 px-1.5 py-0.5 rounded-md border border-[var(--colorPrimary)]/20">
                                            #{item.id.toString().padStart(2, '0')}
                                        </span>
                                        <h3 className={`${firstTitle?.classNameTitle || "font-bold text-slate-800"} truncate text-sm`}>
                                            {firstTitle ? (item as any)[firstTitle.key] : "—"}
                                        </h3>
                                    </div>
                                    <p className={`${firstSubtitle?.classNameText || "text-slate-500"} text-xs truncate flex items-center gap-1.5`}>
                                        {firstSubtitle?.Icon && <firstSubtitle.Icon className="w-3 h-3 opacity-70" />}
                                        {firstSubtitle ? (item as any)[firstSubtitle.key] : "—"}
                                    </p>
                                </div>

                                <div className={`shrink-0 text-[var(--textColor)]/40 transition-transform duration-300 ${expandedId === item.id ? "rotate-180 text-[var(--colorPrimary)]" : ""}`}>
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </button>

                            {/* --- CARD BODY --- */}
                            <div className={`grid transition-all duration-300 ease-in-out ${expandedId === item.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                <div className="overflow-hidden bg-[var(--bgGeneral)]/30"> 
                                    <div className="p-3.5 border-t border-[var(--colorSecondary)]/50">
                                        
                                        {/* 1. SECCIÓN ESTADOS */}
{textRelevanteCols.length > 0 && (
    <div className="flex flex-wrap gap-2 pb-3 mb-3 border-b border-[var(--colorSecondary)]/60">
        {textRelevanteCols.map((col: any) => {
            const rawValue = (item as any)[col.key];
            
            // Lógica de extracción de datos
            const isComplex = typeof rawValue === 'object' && rawValue !== null;
            const label = isComplex ? rawValue.label : rawValue;
            const value = isComplex ? rawValue.value : "neutral";
            const customClass = isComplex ? rawValue.className : "";

            return (
                <div key={col.key} className={getStatusConfig(value, customClass)}>
                    {/* Icono de la columna si existe, si no, el puntito de estado */}
                    {col.Icon ? <col.Icon className="w-3 h-3 opacity-70" /> : <StatusDot level={value} />}
                    
                    {/* Label de la columna (opcional, a veces en estados se omite "Estado: Activo" y se pone solo "Activo") */}
                    <span className="opacity-70 mr-1 ml-0.5 font-normal">{col.label}:</span>
                    
                    <span className="font-bold">
                        {label}
                    </span>
                </div>
            );
        })}
    </div>
)}
                                        
                                        

                                        {/* 2. SECCIÓN GRID (COORDENADAS + DETALLES) */}
                                        <div className="grid grid-cols-2 gap-3">
                                            {gridColumns.map((col) => {
                                                const value = (item as any)[col.key];

                                                // CASO A: COORDENADAS (Ocupa 2 columnas)
                                                if (col.level === TypeLevel.coordenada) {
                                                    const lat = value?.lat;
                                                    const lng = value?.lng;
                                                    if (!lat || !lng) return null;

                                                    return (
                                                        <a
                                                            key={col.key as string}
                                                            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="col-span-2 flex items-center justify-between bg-white p-3 rounded-lg border border-[var(--colorSecondary)] shadow-sm active:scale-[0.99] transition-all group hover:border-[var(--colorPrimary)]/30"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="bg-[var(--bgGeneral)] p-1.5 rounded-md text-[var(--textColor)]/60 group-hover:text-[var(--colorPrimary)] group-hover:bg-[var(--colorPrimary)]/10 transition-colors">
                                                                    {col.Icon ? <col.Icon className="w-4 h-4" /> : <MapIcon className="w-4 h-4" />}
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-[10px] font-bold text-[var(--textColor)]/50 uppercase tracking-wider">{col.label}</span>
                                                                    <span className="text-xs font-mono text-[var(--textColor)]/80 font-medium tabular-nums">
                                                                        {lat.toFixed(4)}, {lng.toFixed(4)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <ExternalLink className="w-4 h-4 text-[var(--textColor)]/30 group-hover:text-[var(--colorPrimary)] transition-colors" />
                                                        </a>
                                                    );
                                                }
                                               if (col.level === TypeLevel.tags) {
    // 1. Actualizamos el tipado para leer el array de objetos
    const values = (item as any)[col.key] as { value: string; label: string }[] || [];
    
    return (
        <div key={col.key as string} className="col-span-2 bg-white p-3 rounded-lg border border-[var(--colorSecondary)] flex flex-col shadow-sm">
            
            {/* Header de la sección */}
            <div className="flex items-center gap-1.5 mb-3">
                {col.Icon ? (
                    <col.Icon className="w-3 h-3 text-[var(--textColor)]/40" />
                ) : (
                    <div className="w-1 h-3 bg-slate-200 rounded-full"></div>
                )}
                <span className="text-[10px] font-bold text-[var(--textColor)]/50 uppercase tracking-wider">
                    {col.label}
                </span>
                
                {/* Contador sutil a la derecha para contexto rápido */}
                {values.length > 0 && (
                    <span className="ml-auto text-[10px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                        {values.length}
                    </span>
                )}
            </div>
            
            {/* Nube de Etiquetas (Tags Cloud) */}
            <div className="flex flex-wrap gap-2">
                {values.length > 0 ? (
                    values.map((val) => (
                        <span 
                            key={val.value} // Usamos el ID único
                            className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 shadow-sm"
                        >
                            {/* Renderizamos el label */}
                            {val.label}
                        </span>
                    ))
                ) : (
                    <span className="text-sm text-[var(--textColor)]/40 italic py-1 pl-1">
                        Sin asignación
                    </span>
                )}
            </div>
        </div>
    );
}

                                                // CASO B: DEFAULT (Texto Normal y Fechas - Ocupan 1 columna)
                                                return (
                                                    <div key={col.key as string} className="col-span-1 bg-white p-3 rounded-lg border border-[var(--colorSecondary)] flex flex-col justify-center min-h-[70px] shadow-sm hover:border-slate-300 transition-colors">
                                                        <div className="flex items-center gap-1.5 mb-1.5">
                                                            {col.Icon && <col.Icon className="w-3 h-3 text-[var(--textColor)]/40" />}
                                                            <span className="text-[10px] font-bold text-[var(--textColor)]/50 uppercase tracking-wider truncate w-full">
                                                                {col.label}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm font-medium text-[var(--textColor)] break-words leading-tight">
                                                            {value || "—"}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* --- ACTIONS FOOTER --- */}
                                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[var(--colorSecondary)]/50">
                                            {/* <Button variant="outline" size="sm" onClick={() => onView?.(item)} className="flex-1 bg-white border-[var(--colorSecondary)] text-[var(--textColor)]/80 hover:text-[var(--colorPrimary)] hover:bg-[var(--colorPrimary)]/5 h-9">
                                                <Eye className="w-4 h-4 mr-2" /> Ver
                                            </Button> */}
                                             <Button variant="outline" size="sm" onClick={() => onViewLocation?.(item)} className="flex-1 bg-white border-[var(--colorSecondary)] text-[var(--textColor)]/80 hover:text-[var(--colorPrimary)] hover:bg-[var(--colorPrimary)]/5 h-9">
                                                <MapPin className="w-4 h-4 mr-2" /> Mapa
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => onEdit?.(item)} className="flex-1 bg-white border-[var(--colorSecondary)] text-[var(--textColor)]/80 hover:text-indigo-600 hover:bg-indigo-50 h-9">
                                                 <Pencil className="w-4 h-4 mr-2 opacity-70" /> Editar
                                            </Button>
                                            
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" size="icon" className="h-9 w-9 bg-white border-[var(--colorSecondary)] text-[var(--textColor)]/70 shrink-0">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuItem onClick={() => onEdit?.(item)} className="cursor-pointer py-2">
                                                        <Pencil className="w-4 h-4 mr-2 opacity-70" /> Editar
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => onDelete?.(item.id)} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer py-2">
                                                        <Trash2 className="w-4 h-4 mr-2 opacity-70" /> Eliminar
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                
                {/* --- MOBILE PAGINATION --- */}
                <div className="flex items-center justify-between px-4 py-4 bg-white border border-[var(--colorSecondary)] rounded-xl shadow-sm mt-2">
                    <div className="text-xs text-[var(--textColor)]/60 font-medium">
                        <span className="text-[var(--textColor)] font-bold">{startIdx + 1}-{Math.min(endIdx, filteredItems.length)}</span> de {filteredItems.length}
                    </div>
                     <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--textColor)]/60">Ver:</span>
                        <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                            <SelectTrigger className="h-8 w-16 text-xs bg-slate-50 border-[var(--colorSecondary)]"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        );
    }
    // Existing code for desktop view
    return (
        <div className="w-full space-y-4">
            <div className="rounded-lg border border-[var(--colorSecondary)] bg-white shadow-md overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <Table >
                        <TableCaption className="text-xs text-[var(--textColor)]/60 py-3">
                            <div className="flex flex-col sm:flex-row items-center justify-between px-4">
                                <div className="text-sm text-[var(--textColor)]/60">
                                    <span className="font-semibold text-[var(--textColor)]">
                                        {startIdx + 1}-{Math.min(endIdx, filteredItems.length)}
                                    </span>
                                    {' de '}
                                    <span className="font-semibold text-[var(--textColor)]">
                                        {filteredItems.length}
                                    </span>
                                    {' registros'}
                                    {searchTerm && (
                                        <span className="ml-2 text-[var(--colorPrimary)]">
                                            (Filtrados de {originalItems.length} total)
                                        </span>
                                    )}
                                </div>

                                {/* Items Per Page Selector */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-[var(--textColor)]/60">Mostrar:</span>
                                    <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                                        <SelectTrigger className="w-20 h-9 border-[var(--colorSecondary)] bg-white text-sm text-[var(--textColor)]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="border-[var(--colorSecondary)]">
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="25">25</SelectItem>
                                            <SelectItem value="50">50</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </TableCaption>

                        <TableHeader>
                            <TableRow className="bg-gradient-to-r from-[var(--colorPrimary)]/8 to-[var(--colorAcentuar)]/8 hover:bg-gradient-to-r hover:from-[var(--colorPrimary)]/12 hover:to-[var(--colorAcentuar)]/12 border-b-2 border-[var(--colorSecondary)]">
                                {columns.map((col) => (
                                    <TableHead key={col.key as string} className={col.classNameTitle}>{col.label}</TableHead>
                                ))}
                                <TableHead className="text-right text-[var(--textColor)] font-bold text-sm">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {items.length === 0 ? (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell
                                        colSpan={columns.length + 1}
                                        className="py-16 text-center text-[var(--textColor)]/40 text-sm"
                                    >
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-[var(--bgGeneral)] flex items-center justify-center border-2 border-[var(--colorSecondary)]">
                                                {Icon && <Icon className="w-6 h-6 text-[var(--textColor)]/40" />}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-[var(--textColor)]">
                                                    {searchTerm ? "Sin resultados" : "No hay " + identity}
                                                </h3>
                                                <p className="text-sm text-[var(--textColor)]/60 mt-1">
                                                    {searchTerm
                                                        ? "Intenta con otros términos de búsqueda"
                                                        : "Agrega un nuevo registro de " + identity + " para comenzar"}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                items.map((item: any) => (
                                    <TableRow
                                        key={item.id}
                                        className="border-b border-[var(--colorSecondary)] hover:bg-[var(--bgGeneral)] transition-all duration-300 hover:shadow-sm"
                                    >

                                        {columns.map((col) => {
                                            // CASO: ESTADOS (Antes TextRelevante)
if (col.level === TypeLevel.textRelevante) {
    const rawValue = (item as any)[col.key];
    
     // Lógica de extracción de datos
            const isComplex = typeof rawValue === 'object' && rawValue !== null;
            const label = isComplex ? rawValue.label : rawValue;
            const value = isComplex ? rawValue.value : "neutral";
            const customClass = isComplex ? rawValue.className : "";

    return (
        <TableCell key={col.key as string} className="text-left py-3">
            {/* CAMBIO AQUÍ: 'justify-start' en lugar de 'justify-center' */}
            <div className="flex justify-start"> 
                <span className={getStatusConfig(value, customClass)}>
                    <StatusDot level={value} />
                    {label}
                </span>
            </div>
        </TableCell>
    );
} else if (col.level === TypeLevel.coordenada) {
                                                const lat = (item as any)[col.key]?.lat;
                                                const lng = (item as any)[col.key]?.lng;

                                                return (
                                                    <TableCell key={col.key as string} className={col.classNameText}>

                                                        <a
                                                            // URL estándar de Google Maps para máxima compatibilidad
                                                            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            // 'font-sans' arregla la letra rara. 'tabular-nums' alinea los números.
                                                            className="group flex items-center gap-1.5 hover:text-blue-600 transition-colors py-1 w-fit"
                                                            title="Ver ubicación en mapa"
                                                        >
                                                            {/* Icono sutil */}
                                                            <MapIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />

                                                            {/* Coordenadas limpias con separador suave */}
                                                            <span >
                                                                {lat?.toFixed(4)}
                                                                <span className="text-slate-300 mx-1.5">|</span>
                                                                {lng?.toFixed(4)}
                                                            </span>

                                                            {/* Flechita animada (solo aparece al pasar el mouse) */}
                                                            <ExternalLink className="w-3 h-3 opacity-0 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-50 transition-all duration-200" />
                                                        </a>
                                                    </TableCell>
                                                );
                                            } else if (col.level === TypeLevel.fecha) {
                                                return (
                                                    <TableCell key={col.key as string} className={col.classNameText}>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-3 h-3" />
                                                            {item[col.key]}
                                                        </div>
                                                    </TableCell>
                                                );
                                            } else if (col.level === TypeLevel.foto) {
                                                const imgUrl = (item as any)[col.key]; // Guardamos la URL para limpieza
                                                return (
                                                    <TableCell key={col.key as string} className={col.classNameText}>
                                                        <div className="flex justify-center">
                                                            <HoverCard>
                                                                <HoverCardTrigger asChild>
                                                                    {/* Imagen Pequeña (Trigger) */}
                                                                    <div className="h-9 w-9 rounded-full overflow-hidden border border-slate-200 cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all shadow-sm">
                                                                        <img
                                                                            src={imgUrl}
                                                                            alt="Foto"
                                                                            className="w-full h-full object-cover"
                                                                            onError={(e: any) => e.target.src = 'https://via.placeholder.com/32?text=NA'}
                                                                        />
                                                                    </div>
                                                                </HoverCardTrigger>

                                                                {/* Contenido Flotante (Imagen Grande) */}
                                                                <HoverCardContent className="w-64 p-0 border-none shadow-xl bg-transparent" side="right">
                                                                    <div className="rounded-xl overflow-hidden border-4 border-white shadow-2xl">
                                                                        <img
                                                                            src={imgUrl}
                                                                            alt="Foto Grande"
                                                                            className="w-full h-auto object-cover aspect-square"
                                                                            onError={(e: any) => e.target.src = 'https://via.placeholder.com/200?text=NA'}
                                                                        />
                                                                    </div>
                                                                </HoverCardContent>
                                                            </HoverCard>
                                                        </div>
                                                    </TableCell>
                                                );
                                            }else if (col.level === TypeLevel.tags) {
    // 1. Ajustamos el tipado para reconocer que es un array de objetos
    const values = (item as any)[col.key] as { value: string; label: string }[] || [];
    
    const limit = 2; 
    const visibleValues = values.slice(0, limit);
    const remaining = values.length - limit;

    return (
        <TableCell key={col.key as string} className={col.classNameText}>
            <div className="flex items-center gap-1.5 flex-wrap max-w-[240px]">
                {/* 1. ITEMS VISIBLES */}
                {visibleValues.map((val) => (
                    <span 
                        // Usamos val.value como key única (es mejor que el índice i)
                        key={val.value} 
                        // Mostramos el label en el tooltip nativo
                        title={val.label} 
                        className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-600 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:border-slate-300 transition-colors cursor-default max-w-[100px]" 
                    >
                        {/* CAMBIO: Renderizamos val.label en lugar de val */}
                        <span className="truncate">{val.label}</span>
                    </span>
                ))}

                {/* 2. CONTADOR INTERACTIVO (+N) */}
                {remaining > 0 && (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="inline-flex items-center justify-center w-6 h-5 rounded-md bg-white border border-dashed border-slate-300 text-[10px] font-bold text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer shadow-sm shrink-0">
                                    +{remaining}
                                </span>
                            </TooltipTrigger>
                            
                            {/* 3. CONTENIDO DEL TOOLTIP */}
                            <TooltipContent 
                                className="bg-white/95 backdrop-blur-sm border border-slate-200 shadow-xl p-1 rounded-lg animate-in fade-in zoom-in-95 duration-150" 
                                side="top"
                                align="center"
                            >
                                <div className="flex flex-col gap-0.5 min-w-[140px] max-w-[200px] max-h-[180px] overflow-y-auto custom-scrollbar p-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 mb-0.5 border-b border-slate-100 sticky top-0 bg-white/95 z-10">
                                        {remaining} más
                                    </span>
                                    {/* Mapeamos los restantes */}
                                    {values.slice(limit).map((val) => (
                                        <div key={val.value} className="px-2 py-1.5 rounded-md hover:bg-slate-100 text-xs text-slate-700 font-medium transition-colors cursor-default text-left">
                                            {/* CAMBIO: Renderizamos val.label */}
                                            <span className="break-words leading-tight block">
                                                {val.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
                
                {/* 4. ESTADO VACÍO */}
                {values.length === 0 && (
                    <span className="text-slate-300 text-xs font-light italic px-1 select-none">—</span>
                )}
            </div>
        </TableCell>
    );
}
                                            return (
                                                <TableCell key={col.key as string} className={col.classNameText}>{item[col.key]}</TableCell>
                                            );
                                        })}

                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                {/* <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    title="Ver detalles"
                                                    onClick={() => onView?.(item)}
                                                    className="h-8 w-8 p-0 hover:bg-[var(--colorPrimary)]/15 hover:text-[var(--colorPrimary)] text-[var(--textColor)]/70 transition-colors"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button> */}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    title="Ver Mapa"
                                                    onClick={() => onViewLocation?.(item)}
                                                    className="h-8 w-8 p-0 hover:bg-[var(--colorPrimary)]/15 hover:text-[var(--colorPrimary)] text-[var(--textColor)]/70 transition-colors"
                                                >
                                                    <MapPin className="h-4 w-4" />
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 hover:bg-[var(--colorPrimary)]/15 hover:text-[var(--colorPrimary)] text-[var(--textColor)]/70 transition-colors"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="border-[var(--colorSecondary)]">
                                                        <DropdownMenuItem
                                                            onClick={() => onEdit?.(item)}
                                                            className="cursor-pointer text-[var(--textColor)] hover:bg-[var(--bgGeneral)] hover:text-[var(--colorPrimary)] transition-colors text-sm"
                                                        >
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            <span>Editar</span>
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem
                                                            onClick={() => onDelete?.(item.id)}
                                                            className="cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors text-sm"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            <span>Eliminar</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );

}