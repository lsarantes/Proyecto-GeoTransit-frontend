"use client";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

interface Cooperativa {
  id: number;
  nombre: string;
  encargado: string;
  rutas: number;
  telefono: string;
  direccion: string;
}

interface CooperativasTableProps {
  cooperativas: Cooperativa[];
  onEdit?: (coop: Cooperativa) => void;
  onDelete?: (id: number) => void;
  onView?: (coop: Cooperativa) => void;
}

export function CooperativasTable({
  cooperativas,
  onEdit,
  onDelete,
  onView,
}: CooperativasTableProps) {
  return (
    <div className="rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
      <Table>
        <TableCaption className="mb-3 text-xs">
          {cooperativas.length} cooperativa(s) registrada(s)
        </TableCaption>

        <TableHeader>
          <TableRow className="rounded-md border-b-0 bg-sky-900 hover:bg-sky-950">
            <TableHead className="text-primary-foreground text-start ">
              ID
            </TableHead>
            <TableHead className="text-primary-foreground">Nombre</TableHead>
            <TableHead className="text-primary-foreground">Encargado</TableHead>
            <TableHead className="text-primary-foreground">Rutas</TableHead>
            <TableHead className="text-primary-foreground">Teléfono</TableHead>
            <TableHead className="text-primary-foreground">Dirección</TableHead>
            <TableHead className="text-end text-primary-foreground ">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cooperativas.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-12 text-center text-muted-foreground"
              >
                No hay cooperativas registradas
              </TableCell>
            </TableRow>
          ) : (
            cooperativas.map((coop) => (
              <TableRow
                key={coop.id}
                className="hover:bg-gray-100 hoverTextAcentuar"
              >
                <TableCell className="font-medium">{coop.id}</TableCell>
                <TableCell>{coop.nombre}</TableCell>
                <TableCell>{coop.encargado}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-200 text-black">
                    {coop.rutas}
                  </Badge>
                </TableCell>
                <TableCell>{coop.telefono}</TableCell>
                <TableCell>{coop.direccion}</TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Ver detalles"
                      onClick={() => onView?.(coop)}
                      className="cursor-pointer"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Más opciones"
                          className="cursor-pointer"
                        >
                          <span className="sr-only ">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onEdit?.(coop)}
                          className="cursor-pointer"
                        >
                          <Pencil className="mr-2 h-4 w-4 stroke-neutral-800" />
                          <span>Editar</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive cursor-pointer"
                          onClick={() => onDelete?.(coop.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4 stroke-red-500" />
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
  );
}
