"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  indexOfFirstItem: number
  indexOfLastItem: number
  onPrevPage: () => void
  onNextPage: () => void
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  indexOfFirstItem,
  indexOfLastItem,
  onPrevPage,
  onNextPage,
}: PaginationProps) {
  if (totalItems === 0) return null

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-border bg-muted/30">
      <span className="text-sm text-muted-foreground">
        Mostrando <span className="font-medium text-foreground">{indexOfFirstItem + 1}</span> -{" "}
        <span className="font-medium text-foreground">{Math.min(indexOfLastItem, totalItems)}</span> de{" "}
        <span className="font-medium text-foreground">{totalItems}</span> resultados
      </span>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevPage}
          disabled={currentPage === 1}
          className="h-8 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Anterior
        </Button>

        <span className="text-sm font-medium text-muted-foreground px-3">
          {currentPage} / {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="h-8 bg-transparent"
        >
          Siguiente
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
