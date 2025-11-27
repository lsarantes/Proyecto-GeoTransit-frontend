// components/crud/CrudPage.tsx
"use client"
//IMPORTACIONES EXTERNAS
import { useEffect, useState } from "react"
import { Search, Plus, Loader, AlertCircle, Globe, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

//IMPORTACIONES INTERNAS
import { CrudModal } from "./crud-add-or-edit-modal"
import { CrudTable } from "./crud-table"
import { ItemDeleteDialog } from "./crud-delete-modal"
import { ItemDetailsModal } from "./crud-details-modal"
import type { CrudPageProps } from "@/types/crud-interface-types"
import { TypeLevel } from "@/types/type-level"
import { PaginationControls } from "./pagination-controls"
import { LocationModal } from "./location-modal"
import { AllLocationsModal } from "./all-location-modal"

function filterItems<T>(items: T[], searchTerm: string, keys: (keyof T)[]): T[] {
  if (!searchTerm) return items

  const term = searchTerm.toLowerCase()

  return items.filter((item) =>
    keys.some((key) => {
      const value = item[key]
      return typeof value === "string" ? value.toLowerCase().includes(term) : false
    }),
  )
}
function sortMixedId(a: string, b: string) {
  // Extraer letras
  const lettersA = a.match(/[A-Za-z]+/)?.[0] || ""
  const lettersB = b.match(/[A-Za-z]+/)?.[0] || ""

  // Extraer números
  const numA = Number.parseInt(a.match(/\d+/)?.[0] || "0", 10)
  const numB = Number.parseInt(b.match(/\d+/)?.[0] || "0", 10)

  // 1️⃣ Primero comparar por letras (ascendente)
  const letterCompare = lettersA.localeCompare(lettersB)
  if (letterCompare !== 0) return letterCompare

  // 2️⃣ Si las letras son iguales, ordenar por número (descendente)
  return numB - numA
}

export function CrudPage<T>({
  title,
  subtitle,
  Icon = Loader,
  identity,
  verUbicacion,
  items,
  searchKeys,
  columns,
  onCreate,
  onUpdate,
  onDelete,
  modalFields,
  defaultItemsPerPage = 10,
}: CrudPageProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage)
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<T | null>(null)
  const [viewingItem, setViewingItem] = useState<T | null>(null)
  const [deletingItem, setDeletingItem] = useState<T | null>(null)
  const [viewingLocation, setViewingLocation] = useState<any>(null)
  const [viewingAllLocations, setViewingAllLocations] = useState(false)

  const firstImportantCol = columns.find((c) => c.level === TypeLevel.titulo)
  const idKey = columns.find((c) => c.level === TypeLevel.id)?.key

  const filteredItems = idKey
    ? filterItems<T>(items, searchTerm, searchKeys).sort((a, b) => sortMixedId(String(a[idKey]), String(b[idKey])))
    : items

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage))

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number.parseInt(value))
    setCurrentPage(1)
  }

  const handleSaveItem = (data: T) => {
    if (editingItem) {
      onUpdate(data)
      setEditingItem(null)
    } else {
      onCreate(data)
      setShowForm(false)
    }
    closeForm()
  }

  const handleDeleteItem = (id: string) => {
    onDelete(id)
    setDeletingItem(null)
  }

  const openFormForNew = () => {
    setEditingItem(null)
    setShowForm(true)
  }

  const openFormForEdit = (item: T) => {
    setEditingItem(item)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingItem(null)
  }

  useEffect(() => {
    if (deletingItem) {
      requestAnimationFrame(() => {
        const el = document.querySelector("[data-confirm-button]")
        if (el instanceof HTMLElement) {
          el.focus()
        }
      })
    }
  }, [deletingItem])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
                {Icon && <Icon className="w-7 h-7 text-white" />}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
                <p className="text-slate-500 text-sm">{subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-lg font-bold text-slate-800">{items.length}</span>
                <span className="text-xs text-slate-500">Total</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
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
                className="pl-11 h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50 rounded-xl transition-all"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={openFormForNew}
                className="h-11 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-6 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30"
              >
                <Plus size={20} />
                Agregar {identity}
              </Button>
              {verUbicacion && (
                <Button
                  onClick={() => setViewingAllLocations(true)}
                  variant="outline"
                  className="h-11 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200 rounded-xl"
                >
                  <Globe className="w-4 h-4 mr-2" /> Ver ubicaciones
                </Button>
              )}
            </div>
          </div>
        </div>

        <Dialog open={showForm} onOpenChange={closeForm}>
          <DialogContent className="max-w-4xl p-0 gap-0 border-slate-200 rounded-2xl shadow-2xl overflow-hidden bg-white">
            <DialogHeader className="px-6 py-5 bg-gradient-to-r from-primary/5 to-primary/10 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-slate-800">
                    {editingItem ? `Editar ${identity}` : `Agregar ${identity}`}
                  </DialogTitle>
                  <DialogDescription className="text-slate-500 text-sm">
                    Ingresa la información requerida a continuación.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <CrudModal
              onSubmit={handleSaveItem}
              onCancel={closeForm}
              initialData={editingItem || undefined}
              isEditing={!!editingItem}
              fields={modalFields}
              verUbicaciones={verUbicacion}
            />
          </DialogContent>
        </Dialog>

        {/* Table - sin cambios en la lógica */}
        <CrudTable
          originalItems={items}
          filteredItems={filteredItems}
          onEdit={openFormForEdit}
          verUbicaciones={verUbicacion}
          onDelete={(id: string) => setDeletingItem(items.find((c) => String(c[idKey!]) === id) || null)}
          onView={setViewingItem}
          onViewLocation={setViewingLocation}
          handleItemsPerPageChange={handleItemsPerPageChange}
          searchTerm={searchTerm}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          columns={columns}
          identity={identity}
          Icon={Icon}
        />

        {/* Pagination */}
        {filteredItems.length > 0 && (
          <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}

        {/* Location Modals - sin cambios */}
        {verUbicacion && viewingLocation && (
          <LocationModal item={viewingLocation} columns={columns} onClose={() => setViewingLocation(null)} />
        )}

        {viewingAllLocations && (
          <AllLocationsModal items={items} columns={columns} onClose={() => setViewingAllLocations(false)} />
        )}

        <Dialog open={!!viewingItem} onOpenChange={(open) => !open && setViewingItem(null)}>
          <DialogContent className="max-w-4xl w-[95vw] h-[90vh] flex flex-col border-slate-200 rounded-2xl shadow-2xl bg-white p-0 gap-0 overflow-hidden [&_button[data-slot='dialog-close']]:z-20">
            <DialogHeader className="px-6 pt-6 pb-4 shrink-0 border-b border-slate-100 bg-gradient-to-r from-primary/5 to-primary/10">
              <DialogTitle className="text-slate-800 flex items-center gap-3 text-xl font-bold">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-md shadow-primary/25">
                  {Icon && <Icon className="w-5 h-5 text-white" />}
                </div>
                <div className="flex flex-col">
                  <span>Detalles de {identity}</span>
                  <span className="text-xs font-normal text-slate-500">Vista completa del registro</span>
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

        <AlertDialog
          open={!!deletingItem}
          onOpenChange={(open: boolean) => {
            if (!open) setDeletingItem(null)
          }}
        >
          <AlertDialogContent className="max-w-md border-slate-200 rounded-2xl shadow-xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-slate-800 flex items-center gap-3 text-lg">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                Eliminar {identity}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription className="text-slate-500">
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
            {deletingItem && (
              <ItemDeleteDialog
                itemName={
                  firstImportantCol
                    ? (deletingItem[firstImportantCol.key as keyof typeof deletingItem] as string)
                    : "Sin datos"
                }
                identity={identity}
                onConfirm={() => handleDeleteItem(deletingItem[idKey!] as string)}
                onCancel={() => setDeletingItem(null)}
              />
            )}
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
