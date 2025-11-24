"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal
} from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange
}: PaginationControlsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(currentPage.toString())
  const inputRef = useRef<HTMLInputElement>(null)

  // Sincronizar estado cuando cambia la página externamente
  useEffect(() => {
    setInputValue(currentPage.toString())
    setIsEditing(false)
  }, [currentPage])

  // Auto-foco al activar edición
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleInputSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const page = Number.parseInt(inputValue)
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page)
    } else {
      setInputValue(currentPage.toString())
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsEditing(false)
      setInputValue(currentPage.toString())
    }
  }

  // Lógica para generar números de página con elipsis (...)
  const getPageNumbers = () => {
    const delta = 2 // Páginas visibles a cada lado de la actual
    const range = []
    const rangeWithDots = []
    let l

    range.push(1)
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i < totalPages && i > 1) {
        range.push(i)
      }
    }
    range.push(totalPages)

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(i)
      l = i
    }

    return rangeWithDots
  }

  // Clases comunes basadas en tus variables CSS
  const buttonBaseClass = "border border-[var(--colorSecondary)] text-[var(--textColor)] hover:bg-[var(--bgGeneral)] hover:text-[var(--primary)] transition-colors"
  const activeButtonClass = "bg-[var(--colorPrimary)] text-white hover:bg-[var(--colorPrimary)]/90 border-transparent shadow-sm"

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 py-4 mt-6 border-t border-[var(--colorSecondary)]/30 select-none">

      {/* Sección Izquierda: Info de página + Input */}
      <div className="text-sm text-[var(--textColor)] order-2 sm:order-1 font-medium">
        <div className="flex items-center gap-2">
          <span className="opacity-80">Página</span>
          
          {isEditing ? (
            <form onSubmit={handleInputSubmit} className="inline-block">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={() => handleInputSubmit()}
                onKeyDown={handleKeyDown}
                className="h-7 w-14 px-1 text-center text-xs font-bold border-[var(--colorSecondary)] text-[var(--textColor)] focus-visible:ring-[var(--colorPrimary)] bg-[var(--card)]"
              />
            </form>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-0.5 rounded-[var(--radius)] hover:bg-[var(--bgGeneral)] border border-transparent hover:border-[var(--colorSecondary)] transition-all cursor-text text-[var(--colorPrimary)] font-bold"
              title="Clic para editar"
            >
              {currentPage}
            </button>
          )}
          
          <span className="opacity-80">de {totalPages}</span>
        </div>
      </div>

      {/* Sección Derecha: Botones de navegación */}
      <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2 w-full sm:w-auto justify-between sm:justify-end">
        
        {/* Grupo Anterior */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 hidden sm:flex ${buttonBaseClass} border-transparent hover:border-[var(--colorSecondary)]`}
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            title="Ir al inicio"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`h-8 px-3 ${buttonBaseClass} disabled:opacity-50`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>
        </div>

        {/* Números Centrales */}
        <div className="flex items-center gap-1 mx-1 sm:mx-2">
          {totalPages <= 7 ? (
             /* Pocas páginas: Mostrar todas */
            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant="outline"
                size="icon"
                className={cn(
                  "h-8 w-8 text-xs font-medium rounded-[var(--radius)]",
                  currentPage === page ? activeButtonClass : buttonBaseClass
                )}
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            ))
          ) : (
            /* Muchas páginas: Usar lógica con puntos (...) */
            <div className="hidden md:flex items-center gap-1">
              {getPageNumbers().map((page, index) => 
                page === '...' ? (
                  <div key={`dots-${index}`} className="w-8 flex justify-center text-[var(--muted-foreground)]">
                    <MoreHorizontal className="h-4 w-4" />
                  </div>
                ) : (
                  <Button
                    key={page}
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-8 w-8 text-xs font-medium rounded-[var(--radius)]",
                      currentPage === page ? activeButtonClass : buttonBaseClass
                    )}
                    onClick={() => onPageChange(page as number)}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>
          )}
        </div>

        {/* Grupo Siguiente */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className={`h-8 px-3 ${buttonBaseClass} disabled:opacity-50`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="h-4 w-4 sm:ml-1" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 hidden sm:flex ${buttonBaseClass} border-transparent hover:border-[var(--colorSecondary)]`}
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            title="Ir al final"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>

      </div>
    </div>
  )
}