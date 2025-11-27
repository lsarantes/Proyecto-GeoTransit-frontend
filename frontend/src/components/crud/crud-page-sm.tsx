"use client";
//IMPORTACIONES EXTERNAS
import { useEffect, useState } from "react";
import { Search, Plus, Loader, AlertCircle } from 'lucide-react';
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
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

//IMPORTACIONES INTERNAS
import { CrudModal } from "./crud-add-or-edit-modal";
import { CrudTable } from "./crud-table-sm";
import { ItemDeleteDialog } from "./crud-delete-modal";
import { ItemDetailsModal } from "./crud-details-modal-sm";
import { CrudPageProps } from "@/types/crud-interface-types";
import { TypeLevel } from "@/types/type-level";
import { PaginationControls } from "./pagination-controls";
// Eliminados imports de LocationModal y AllLocationsModal

function filterItems<T>(
    items: T[],
    searchTerm: string,
    keys: (keyof T)[]
): T[] {
    if (!searchTerm) return items;

    const term = searchTerm.toLowerCase();

    return items.filter(item =>
        keys.some(key => {
            const value = item[key];
            return typeof value === "string"
                ? value.toLowerCase().includes(term)
                : false;
        })
    );
}

function sortMixedId(a: string, b: string) {
    // Extraer letras
    const lettersA = a.match(/[A-Za-z]+/)?.[0] || "";
    const lettersB = b.match(/[A-Za-z]+/)?.[0] || "";

    // Extraer números
    const numA = parseInt(a.match(/\d+/)?.[0] || "0", 10);
    const numB = parseInt(b.match(/\d+/)?.[0] || "0", 10);

    // 1️⃣ Primero comparar por letras (ascendente)
    const letterCompare = lettersA.localeCompare(lettersB);
    if (letterCompare !== 0) return letterCompare;

    // 2️⃣ Si las letras son iguales, ordenar por número (descendente)
    return numB - numA;
}

export function CrudPage<T extends { id: string }>({
    title,
    subtitle,
    verUbicacion,
    Icon = Loader,
    identity,
    items,
    searchKeys,
    columns,
    onCreate,
    onUpdate,
    onDelete,
    modalFields,
    defaultItemsPerPage = 10,
}: CrudPageProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<T | null>(null);
    const [viewingItem, setViewingItem] = useState<T | null>(null);
    const [deletingItem, setDeletingItem] = useState<T | null>(null);
    // Eliminados estados viewingLocation y viewingAllLocations

    const firstImportantCol = columns.find(c => c.level === TypeLevel.titulo);

    const filteredItems = filterItems<T>(items, searchTerm, searchKeys).sort((a, b) => sortMixedId(a.id, b.id));

    const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(parseInt(value));
        setCurrentPage(1);
    };

    const handleSaveItem = (data: T) => {
        if (editingItem) {
            onUpdate(data);
            setEditingItem(null);
        } else {
            onCreate(data);
            setShowForm(false);
        };
        closeForm();
    }

    const handleDeleteItem = (id: string) => {
        onDelete(id);
        setDeletingItem(null);
    };

    const openFormForNew = () => {
        setEditingItem(null);
        setShowForm(true);
    };

    const openFormForEdit = (item: T) => {
        setEditingItem(item);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingItem(null);
    };

    useEffect(() => {
        if (deletingItem) {
            // Esperar a que el modal esté montado
            requestAnimationFrame(() => {
                const el = document.querySelector('[data-confirm-button]');
                if (el instanceof HTMLElement) {
                    el.focus();
                }

            });
        }
    }, [deletingItem]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[var(--bgGeneral)] to-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-[var(--colorPrimary)] to-[var(--colorAcentuar)] rounded-lg flex items-center justify-center shadow-md">
                            {Icon && <Icon className="w-5 h-5 text-white" />}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--textColor)]">
                                {title}
                            </h1>
                            <p className="text-[var(--textColor)]/60 text-sm mt-1">
                                {subtitle}
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
                            placeholder={
                                searchKeys.length > 0
                                    ? "Buscar por " +
                                    searchKeys.slice(0, -1).join(", ") +
                                    (searchKeys.length > 1 ? " o " : "") +
                                    searchKeys.slice(-1) +
                                    "..."
                                    : "Buscar..."
                            }

                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-10 border-[var(--colorSecondary)] focus:border-[var(--colorPrimary)] bg-white text-[var(--textColor)] placeholder:text-[var(--textColor)]/40 transition-all"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">

                        <Button
                            onClick={openFormForNew}
                            className="bg-gradient-to-r from-[var(--colorPrimary)] to-[var(--colorAcentuar)] hover:from-[#1a5a9f] hover:to-[#4a449a] text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <Plus size={20} />
                            Agregar {identity}
                        </Button>
                        {/* Botón de "Ver todas las ubicaciones" eliminado */}
                    </div>

                </div>

                {/* Form Modal */}

                <Dialog open={showForm} onOpenChange={closeForm}>
                    <DialogContent className="max-w-4xl p-0 gap-0 border-slate-200 rounded-xl shadow-2xl overflow-hidden bg-white">
                        {/* HEADER CON FONDO SUTIL */}
                        <DialogHeader className="px-6 py-5 bg-slate-50/50 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center shadow-sm">
                                    <div className="w-8 h-8 bg-blue-50 rounded-md flex items-center justify-center text-blue-600">
                                        <Plus className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="space-y-0.5">
                                    <DialogTitle className="text-xl font-bold text-slate-800 tracking-tight">
                                        {editingItem ? `Editar ${identity}` : `Agregar Nueva ${identity}`}
                                    </DialogTitle>
                                    <DialogDescription className="text-slate-500 text-sm">
                                        Ingresa la información requerida a continuación.
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>

                        {/* FORMULARIO */}
                        <CrudModal
                            onSubmit={handleSaveItem}
                            onCancel={closeForm}
                            initialData={editingItem || undefined}
                            isEditing={!!editingItem}
                            fields={modalFields}
                        />
                    </DialogContent>
                </Dialog>

                {/* Table */}
                <CrudTable
                    originalItems={items}
                    filteredItems={filteredItems}
                    onEdit={openFormForEdit}
                    onDelete={(id: string) => setDeletingItem(items.find(c => c.id === id) || null)}
                    onView={setViewingItem}
                    verUbicaciones={verUbicacion}
                    handleItemsPerPageChange={handleItemsPerPageChange}
                    searchTerm={searchTerm}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    columns={columns}
                    identity={identity}
                    Icon={Icon}
                />

                {/* Pagination and Info Footer */}
                {filteredItems.length > 0 && (
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
                
                {/* Modales de mapas eliminados */}

                {/* View Details Dialog */}
                <Dialog open={!!viewingItem} onOpenChange={(open) => !open && setViewingItem(null)}>
                    <DialogContent className="max-w-4xl w-[95vw] h-[90vh] flex flex-col border-[var(--colorSecondary)] rounded-xl shadow-2xl bg-white/95 backdrop-blur-sm p-0 gap-0 overflow-hidden [&_button[data-slot='dialog-close']]:z-20">

                        <DialogHeader className="px-6 pt-6 pb-4 shrink-0 border-b border-[var(--colorSecondary)]/20 bg-white/50 backdrop-blur-md z-10">
                            <DialogTitle className="text-[var(--textColor)] flex items-center gap-3 text-xl font-bold">
                                <div className="w-10 h-10 bg-gradient-to-br from-[var(--colorPrimary)]/10 to-[var(--colorAcentuar)]/10 rounded-xl flex items-center justify-center border border-[var(--colorPrimary)]/20 shadow-sm">
                                    {Icon && <Icon className="w-4 h-4 text-[var(--colorPrimary)]" />}
                                </div>
                                <div className="flex flex-col">
                                    <span>Detalles de {identity}</span>
                                    <span className="text-xs font-normal text-[var(--textColor)]/60">Vista completa del registro</span>
                                </div>
                            </DialogTitle>
                            <DialogDescription className="sr-only">
                                Información detallada del registro seleccionado.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 overflow-hidden w-full">
                            {viewingItem && <ItemDetailsModal item={viewingItem} columns={columns} />}
                        </div>
                    </DialogContent>
                </Dialog>
                {/* Delete Confirmation Dialog */}
                <AlertDialog
                    open={!!deletingItem}
                    onOpenChange={(open: boolean) => {
                        if (!open) setDeletingItem(null)
                    }}
                >

                    <AlertDialogContent className="max-w-md border-[var(--colorSecondary)] rounded-lg shadow-xl">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-[var(--textColor)] flex items-center gap-2 text-lg">
                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center border border-red-300">
                                    <AlertCircle className="w-4 h-4 text-red-600" />
                                </div>
                                Eliminar {identity}
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                        {deletingItem && (
                            <ItemDeleteDialog
                                itemName={firstImportantCol ? (deletingItem[firstImportantCol.key as keyof typeof deletingItem] as string) : "Sin datos"}
                                identity={identity}
                                onConfirm={() => handleDeleteItem(deletingItem.id)}
                                onCancel={() => setDeletingItem(null)}
                            />
                        )}
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div >
    );
}
