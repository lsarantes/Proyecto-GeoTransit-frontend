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
import { Eye, MoreHorizontal, Pencil, Trash2, ChevronDown, Loader } from 'lucide-react';
import { useMediaQuery } from "@/hook/use-media-query";
import { GenericTableProps } from "@/types/crud-interface-types";
import { TypeLevel } from "@/types/type-level";



export function CrudTable<T extends { id: string}>({
    originalItems,
    filteredItems,
    identity,
    Icon = Loader,
    columns,
    onEdit,
    onDelete,
    onView,
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
    const firstId= columns.find(c => c.level === TypeLevel.id);    
    const firstTitle= columns.find(c => c.level === TypeLevel.titulo);    
    const firstSubtitle= columns.find(c => c.level === TypeLevel.subtitulo);
    const textNormal = columns.filter(col => col.level === TypeLevel.textNormal);
    const textRelevante = columns.filter(col => col.level === TypeLevel.textRelevante);



    if (!isDesktop) {
        return (
            <div className="w-full space-y-3">
                {items.length === 0 ? (
                    <div className="rounded-lg border border-[var(--colorSecondary)] bg-white py-16 text-center">
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
                    </div>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-lg border border-[var(--colorSecondary)] bg-white overflow-hidden shadow-sm transition-all duration-300"
                        >
                            {/* Card Header - Summary */}
                            <button
                                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                className="w-full p-4 flex items-center justify-between gap-3 hover:bg-[var(--bgGeneral)] transition-colors"
                            >
                                <div className="flex-1 text-left">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="px-2 py-1 rounded-md bg-gradient-to-br from-[var(--colorPrimary)] to-[var(--colorAcentuar)] flex items-center justify-center text-xs font-bold text-white">
                                            #{item.id.toString().padStart(2, '0')}
                                        </div>
                                        <h3 className="font-bold text-[var(--textColor)]">
                                            {firstTitle !== undefined ? (item[firstTitle.key] as string) : "Sin datos"}
                                        </h3>
                                    </div>
                                    <p className="text-xs text-[var(--textColor)]/60">
                                        {firstSubtitle !== undefined ? (item[firstSubtitle.key] as string) : "Sin datos"}
                                    </p>
                                </div>
                                <ChevronDown
                                    className={`w-4 h-4 text-[var(--textColor)]/60 transition-transform ${expandedId === item.id ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Card Expanded Content */}
                            {expandedId === item.id && (
                                <div className="border-t border-[var(--colorSecondary)] px-4 py-4 space-y-3 bg-[var(--bgGeneral)]/30">
                                    {/* Rutas Badge */}

                                    {textRelevante.map((col) => (
                                        <div key={col.key as string} className="flex items-center justify-between" >
                                            <span className="text-xs text-[var(--textColor)]/70 font-medium">{col.label}</span>
                                            <Badge className="bg-gradient-to-r from-[var(--colorPrimary)]/20 to-[var(--colorAcentuar)]/20 text-[var(--colorPrimary)] border border-[var(--colorPrimary)]/40 font-bold text-xs px-2.5">
                                                {item[col.key] as string}
                                            </Badge>
                                        </div>
                                    ))}
                                    {textNormal.map((col) => (
                                        <div key={col.key as string}>
                                            <span className="text-xs text-[var(--textColor)]/70 font-medium">{col.label}</span>
                                            <p className="text-sm text-[var(--textColor)] mt-1">{item[col.key] as string}</p>
                                        </div>
                                    ))}


                                    {/* Action Buttons */}
                                    <div className="flex gap-2 pt-2 border-t border-[var(--colorSecondary)]">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => onView?.(item)}
                                            className="flex-1 gap-2 border-[var(--colorSecondary)] text-[var(--textColor)] hover:bg-[var(--colorPrimary)]/10 hover:text-[var(--colorPrimary)]"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Ver
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => onEdit?.(item)}
                                            className="flex-1 gap-2 border-[var(--colorSecondary)] text-[var(--textColor)] hover:bg-[var(--colorPrimary)]/10 hover:text-[var(--colorPrimary)]"
                                        >
                                            <Pencil className="w-4 h-4" />
                                            Editar
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => onDelete?.(item.id)}
                                            className="flex-1 gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Eliminar
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
                {/* Info and Items Per Page Row */}
                <div className="flex flex-col flex-row items-center justify-between gap-1 px-4 py-4">
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
                                        colSpan={columns.length+1}
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
                                items.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        className="border-b border-[var(--colorSecondary)] hover:bg-[var(--bgGeneral)] transition-all duration-300 hover:shadow-sm"
                                    >
                                        
                                        {columns.map((col) => (
                                            (col.level !== TypeLevel.textRelevante) ?
                                                <TableCell key={col.key as string} className={col.classNameText}>
                                                    {item[col.key] as string}
                                                </TableCell>
                                                : <TableCell key={col.key as string} className="text-center">
                                                    <Badge
                                                        className="bg-gradient-to-r from-[var(--colorPrimary)]/20 to-[var(--colorAcentuar)]/20 text-[var(--colorPrimary)] border border-[var(--colorPrimary)]/40 font-bold text-xs px-2.5 py-1"
                                                    >
                                                      {item[col.key] as string}
                                                    </Badge>
                                                </TableCell>
                                        ))}

                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    title="Ver detalles"
                                                    onClick={() => onView?.(item)}
                                                    className="h-8 w-8 p-0 hover:bg-[var(--colorPrimary)]/15 hover:text-[var(--colorPrimary)] text-[var(--textColor)]/70 transition-colors"
                                                >
                                                    <Eye className="h-4 w-4" />
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