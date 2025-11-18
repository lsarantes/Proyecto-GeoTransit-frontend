"use client";

import { useState } from "react";
import { CooperativasTable } from "./cooperativas-table";
import { Search, Plus, Building2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { CooperativaModal } from "./cooperativa-modal";
import { CooperativaDetailsModal } from "./cooperativa-details-modal";
import { CooperativaDeleteDialog } from "./cooperativa-delete-dialog";
import { useCooperativas } from "./generar-registro.tabla";

interface Cooperativa {
  id: number;
  nombre: string;
  encargado: string;
  rutas: number;
  telefono: string;
  direccion: string;
}

export function CooperativasPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCoop, setEditingCoop] = useState<Cooperativa | null>(null);
  const [viewingCoop, setViewingCoop] = useState<Cooperativa | null>(null);
  const [deletingCoop, setDeletingCoop] = useState<Cooperativa | null>(null);

  const { cooperativas, setCooperativas } = useCooperativas();

  const filteredCooperativas = cooperativas.filter((coop) =>
    coop.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coop.encargado.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coop.telefono.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.id - a.id);

  const totalPages = Math.ceil(filteredCooperativas.length / itemsPerPage);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  const handleSaveCooperativa = (data: Omit<Cooperativa, "id">) => {
    if (editingCoop) {
      setCooperativas(
        cooperativas.map((c) =>
          c.id === editingCoop.id ? { ...data, id: c.id } : c
        )
      );
      setEditingCoop(null);
    } else {
      const id = Math.max(...cooperativas.map((c) => c.id), 0) + 1;
      setCooperativas([...cooperativas, { ...data, id }]);
    }
    setShowForm(false);
  };

  const handleDeleteCooperativa = (id: number) => {
    setCooperativas(cooperativas.filter((c) => c.id !== id));
    setDeletingCoop(null);
  };

  const openFormForNew = () => {
    setEditingCoop(null);
    setShowForm(true);
  };

  const openFormForEdit = (coop: Cooperativa) => {
    setEditingCoop(coop);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingCoop(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--bgGeneral)] to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--colorPrimary)] to-[var(--colorAcentuar)] rounded-lg flex items-center justify-center shadow-md">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--textColor)]">
                Gestión de Cooperativas
              </h1>
              <p className="text-[var(--textColor)]/60 text-sm mt-1">
                Administra todas tus cooperativas en un solo lugar
              </p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--textColor)]/40" />
            <Input
              type="text"
              placeholder="Buscar por nombre, encargado o teléfono..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 border-[var(--colorSecondary)] focus:border-[var(--colorPrimary)] bg-white text-[var(--textColor)] placeholder:text-[var(--textColor)]/40 transition-all"
            />
          </div>

          <Button
            onClick={openFormForNew}
            className="bg-gradient-to-r from-[var(--colorPrimary)] to-[var(--colorAcentuar)] hover:from-[#1a5a9f] hover:to-[#4a449a] text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            Agregar Cooperativa
          </Button>
        </div>

        {/* Form Modal */}
        <Dialog open={showForm} onOpenChange={closeForm}>
          <DialogContent className="max-w-2xl border-[var(--colorSecondary)] rounded-lg shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-[var(--textColor)] flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[var(--colorPrimary)] to-[var(--colorAcentuar)] rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                {editingCoop ? "Editar Cooperativa" : "Agregar Nueva Cooperativa"}
              </DialogTitle>
              <DialogDescription className="text-[var(--textColor)]/60">
                {editingCoop
                  ? "Actualiza los datos de la cooperativa"
                  : "Completa los campos para registrar una nueva cooperativa"}
              </DialogDescription>
            </DialogHeader>
            <CooperativaModal
              onSubmit={handleSaveCooperativa}
              onCancel={closeForm}
              initialData={editingCoop || undefined}
              isEditing={!!editingCoop}
            />
          </DialogContent>
        </Dialog>

        {/* Table */}
        <CooperativasTable
          filteredCooperativas={filteredCooperativas}
          onEdit={openFormForEdit}
          onDelete={(id) => setDeletingCoop(cooperativas.find(c => c.id === id) || null)}
          onView={setViewingCoop}
          handleItemsPerPageChange={handleItemsPerPageChange}
          searchTerm={searchTerm}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />

        {/* Pagination and Info Footer */}
        {filteredCooperativas.length > 0 && (
          <div className="mt-8 space-y-4">
            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-2 px-4">

              {/* Previous Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="border-[var(--colorSecondary)] text-[var(--textColor)] hover:bg-[var(--bgGeneral)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {(() => {
                  const pages: (number | string)[] = [];
                  const maxVisible = 3; // máximo de páginas visibles
                  let start = Math.max(currentPage - 1, 1);
                  let end = Math.min(start + maxVisible - 1, totalPages);

                  // ajustar start si estamos al final
                  start = Math.max(end - maxVisible + 1, 1);

                  // primera página
                  if (start > 1) {
                    pages.push(1);
                    if (start > 2) pages.push("…");
                  }

                  // páginas centrales
                  for (let i = start; i <= end; i++) {
                    pages.push(i);
                  }

                  // última página
                  if (end < totalPages) {
                    if (end < totalPages - 1) pages.push("…");
                    pages.push(totalPages);
                  }

                  return pages.map((page, idx) =>
                    typeof page === "number" ? (
                      <Button
                        key={idx}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "bg-[var(--colorPrimary)] text-white hover:bg-[#1a5a9f] w-8 h-8 p-0"
                            : "border-[var(--colorSecondary)] text-[var(--textColor)] hover:bg-[var(--bgGeneral)] w-8 h-8 p-0"
                        }
                      >
                        {page}
                      </Button>
                    ) : (
                      <span key={idx} className="flex items-center justify-center w-8 h-8 text-[var(--textColor)]">
                        {page}
                      </span>
                    )
                  );
                })()}
              </div>

              {/* Next Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="border-[var(--colorSecondary)] text-[var(--textColor)] hover:bg-[var(--bgGeneral)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}



        {/* View Details Dialog */}
        <Dialog open={!!viewingCoop} onOpenChange={(open) => !open && setViewingCoop(null)}>
          <DialogContent className="max-w-md border-[var(--colorSecondary)] rounded-lg shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-[var(--textColor)] flex items-center gap-2 text-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-[var(--colorPrimary)]/20 to-[var(--colorAcentuar)]/20 rounded-lg flex items-center justify-center border border-[var(--colorPrimary)]/30">
                  <Building2 className="w-4 h-4 text-[var(--colorPrimary)]" />
                </div>
                Detalles de Cooperativa
              </DialogTitle>
            </DialogHeader>
            {viewingCoop && <CooperativaDetailsModal cooperativa={viewingCoop} />}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={!!deletingCoop}
          onOpenChange={(open: boolean) => {
            if (!open) setDeletingCoop(null)
          }}
        >

          <AlertDialogContent className="max-w-md border-[var(--colorSecondary)] rounded-lg shadow-xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[var(--textColor)] flex items-center gap-2 text-lg">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center border border-red-300">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                </div>
                Eliminar Cooperativa
              </AlertDialogTitle>
            </AlertDialogHeader>
            {deletingCoop && (
              <CooperativaDeleteDialog
                cooperativaName={deletingCoop.nombre}
                onConfirm={() => handleDeleteCooperativa(deletingCoop.id)}
                onCancel={() => setDeletingCoop(null)}
              />
            )}
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div >
  );
}
