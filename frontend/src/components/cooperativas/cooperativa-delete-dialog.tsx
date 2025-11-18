"use client";

import { AlertCircle, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CooperativaDeleteDialogProps {
  cooperativaName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function CooperativaDeleteDialog({
  cooperativaName,
  onConfirm,
  onCancel,
}: CooperativaDeleteDialogProps) {
  return (
    <div className="space-y-5">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-4">
        <div className="flex-shrink-0">
          <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-red-900 mb-1">Acción irreversible</h3>
          <p className="text-sm text-red-700">
            Estás a punto de eliminar <span className="font-semibold">"{cooperativaName}"</span> de manera permanente. Esta acción no se puede deshacer.
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <span className="text-lg">⚠️</span>
        </div>
        <p className="text-sm text-yellow-800">
          Asegúrate de haber guardado cualquier información importante relacionada con esta cooperativa.
        </p>
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <Button
          onClick={onCancel}
          className="bg-white border border-[var(--colorSecondary)] text-[var(--textColor)] hover:bg-[var(--bgGeneral)] transition-all px-6"
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Eliminar Cooperativa
        </Button>
      </div>
    </div>
  );
}
