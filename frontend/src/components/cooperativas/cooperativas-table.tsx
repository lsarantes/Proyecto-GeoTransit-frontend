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
import { Eye, MoreHorizontal, Pencil, Trash2, ChevronDown, Building2 } from 'lucide-react';
import { useMediaQuery } from "@/hook/use-media-query";


interface Cooperativa {
  id: number;
  nombre: string;
  encargado: string;
  rutas: number;
  telefono: string;
  direccion: string;
}

interface CooperativasTableProps {
  filteredCooperativas: Cooperativa[];
  onEdit?: (coop: Cooperativa) => void;
  onDelete?: (id: number) => void;
  onView?: (coop: Cooperativa) => void;
  handleItemsPerPageChange: (value: string) => void;
  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
}

export function CooperativasTable({
  filteredCooperativas,
  onEdit,
  onDelete,
  onView,
  handleItemsPerPageChange,
  searchTerm,
  currentPage,
  itemsPerPage
}: CooperativasTableProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");


  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const cooperativas = filteredCooperativas.slice(startIdx, endIdx);



  
  if (!isDesktop) {
    return (
      <div className="w-full space-y-3">
        {cooperativas.length === 0 ? (
          <div className="rounded-lg border border-[var(--colorSecondary)] bg-white py-16 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--bgGeneral)] flex items-center justify-center border-2 border-[var(--colorSecondary)]">
                <Building2 className="w-6 h-6 text-[var(--textColor)]/40" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--textColor)]">
                  {searchTerm ? "Sin resultados" : "No hay cooperativas"}
                </h3>
                <p className="text-sm text-[var(--textColor)]/60 mt-1">
                  {searchTerm
                    ? "Intenta con otros términos de búsqueda"
                    : "Crea una nueva cooperativa para comenzar"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          cooperativas.map((coop) => (
            <div
              key={coop.id}
              className="rounded-lg border border-[var(--colorSecondary)] bg-white overflow-hidden shadow-sm transition-all duration-300"
            >
              {/* Card Header - Summary */}
              <button
                onClick={() => setExpandedId(expandedId === coop.id ? null : coop.id)}
                className="w-full p-4 flex items-center justify-between gap-3 hover:bg-[var(--bgGeneral)] transition-colors"
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[var(--colorPrimary)] to-[var(--colorAcentuar)] flex items-center justify-center text-xs font-bold text-white">
                      #{coop.id.toString().padStart(2, '0')}
                    </div>
                    <h3 className="font-bold text-[var(--textColor)]">{coop.nombre}</h3>
                  </div>
                  <p className="text-xs text-[var(--textColor)]/60">{coop.encargado}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[var(--textColor)]/60 transition-transform ${expandedId === coop.id ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Card Expanded Content */}
              {expandedId === coop.id && (
                <div className="border-t border-[var(--colorSecondary)] px-4 py-4 space-y-3 bg-[var(--bgGeneral)]/30">
                  {/* Rutas Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--textColor)]/70 font-medium">Rutas</span>
                    <Badge className="bg-gradient-to-r from-[var(--colorPrimary)]/20 to-[var(--colorAcentuar)]/20 text-[var(--colorPrimary)] border border-[var(--colorPrimary)]/40 font-bold text-xs px-2.5">
                      {coop.rutas}
                    </Badge>
                  </div>

                  {/* Teléfono */}
                  <div>
                    <span className="text-xs text-[var(--textColor)]/70 font-medium">Teléfono</span>
                    <p className="text-sm text-[var(--textColor)] mt-1">{coop.telefono}</p>
                  </div>

                  {/* Dirección */}
                  <div>
                    <span className="text-xs text-[var(--textColor)]/70 font-medium">Dirección</span>
                    <p className="text-sm text-[var(--textColor)] mt-1">{coop.direccion}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t border-[var(--colorSecondary)]">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onView?.(coop)}
                      className="flex-1 gap-2 border-[var(--colorSecondary)] text-[var(--textColor)] hover:bg-[var(--colorPrimary)]/10 hover:text-[var(--colorPrimary)]"
                    >
                      <Eye className="w-4 h-4" />
                      Ver
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit?.(coop)}
                      className="flex-1 gap-2 border-[var(--colorSecondary)] text-[var(--textColor)] hover:bg-[var(--colorPrimary)]/10 hover:text-[var(--colorPrimary)]"
                    >
                      <Pencil className="w-4 h-4" />
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete?.(coop.id)}
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
                  {startIdx + 1}-{Math.min(endIdx, filteredCooperativas.length)}
                </span>
                {' de '}
                <span className="font-semibold text-[var(--textColor)]">
                  {filteredCooperativas.length}
                </span>
                {' registros'}
                {searchTerm && (
                  <span className="ml-2 text-[var(--colorPrimary)]">
                    (Filtrados de {cooperativas.length} total)
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
          <Table>
            <TableCaption className="text-xs text-[var(--textColor)]/60 py-3">
              <div className="flex flex-col sm:flex-row items-center justify-between px-4">
              <div className="text-sm text-[var(--textColor)]/60">
                <span className="font-semibold text-[var(--textColor)]">
                  {startIdx + 1}-{Math.min(endIdx, filteredCooperativas.length)}
                </span>
                {' de '}
                <span className="font-semibold text-[var(--textColor)]">
                  {filteredCooperativas.length}
                </span>
                {' registros'}
                {searchTerm && (
                  <span className="ml-2 text-[var(--colorPrimary)]">
                    (Filtrados de {cooperativas.length} total)
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
                <TableHead className="text-[var(--textColor)] font-bold text-sm">ID</TableHead>
                <TableHead className="text-[var(--textColor)] font-bold text-sm">Nombre</TableHead>
                <TableHead className="text-[var(--textColor)] font-bold text-sm">Encargado</TableHead>
                <TableHead className="text-[var(--textColor)] font-bold text-sm text-center">Rutas</TableHead>
                <TableHead className="text-[var(--textColor)] font-bold text-sm">Teléfono</TableHead>
                <TableHead className="text-[var(--textColor)] font-bold text-sm">Dirección</TableHead>
                <TableHead className="text-right text-[var(--textColor)] font-bold text-sm">Acciones</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {cooperativas.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={7}
                    className="py-16 text-center text-[var(--textColor)]/40 text-sm"
                  >
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[var(--bgGeneral)] flex items-center justify-center border-2 border-[var(--colorSecondary)]">
                          <Building2 className="w-6 h-6 text-[var(--textColor)]/40" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--textColor)]">
                            {searchTerm ? "Sin resultados" : "No hay cooperativas"}
                          </h3>
                          <p className="text-sm text-[var(--textColor)]/60 mt-1">
                            {searchTerm
                              ? "Intenta con otros términos de búsqueda"
                              : "Crea una nueva cooperativa para comenzar"}
                          </p>
                        </div>
                      </div>
                  </TableCell>
                </TableRow>
              ) : (
                cooperativas.map((coop) => (
                  <TableRow
                    key={coop.id}
                    className="border-b border-[var(--colorSecondary)] hover:bg-[var(--bgGeneral)] transition-all duration-300 hover:shadow-sm"
                  >
                    <TableCell className="font-bold text-[var(--colorPrimary)] text-sm">
                      #{coop.id.toString().padStart(3, '0')}
                    </TableCell>
                    <TableCell className="font-semibold text-[var(--textColor)] text-sm">
                      {coop.nombre}
                    </TableCell>
                    <TableCell className="text-[var(--textColor)]/75 text-sm">
                      {coop.encargado}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className="bg-gradient-to-r from-[var(--colorPrimary)]/20 to-[var(--colorAcentuar)]/20 text-[var(--colorPrimary)] border border-[var(--colorPrimary)]/40 font-bold text-xs px-2.5 py-1"
                      >
                        {coop.rutas}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[var(--textColor)]/70 text-xs">
                      {coop.telefono}
                    </TableCell>
                    <TableCell className="text-[var(--textColor)]/70 text-xs max-w-xs truncate">
                      {coop.direccion}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Ver detalles"
                          onClick={() => onView?.(coop)}
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
                              onClick={() => onEdit?.(coop)}
                              className="cursor-pointer text-[var(--textColor)] hover:bg-[var(--bgGeneral)] hover:text-[var(--colorPrimary)] transition-colors text-sm"
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => onDelete?.(coop.id)}
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
