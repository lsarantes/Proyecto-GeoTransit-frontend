"use client";

import { ItemDetailsModalProps } from '@/types/crud-interface-types';
import { TypeLevel } from '@/types/type-level';
import { FileText, Info } from 'lucide-react'; // Added icons for section headers

export function ItemDetailsModal<T extends { id: string }>({ item, columns }: ItemDetailsModalProps<T>) {
    const firstId = columns.find((c) => c.level === TypeLevel.id);
    const firstTitle = columns.find((c) => c.level === TypeLevel.titulo);
    const firstSubtitle = columns.find((c) => c.level === TypeLevel.subtitulo);
    const textNormal = columns.filter((col) => col.level === TypeLevel.textNormal);
    const textRelevante = columns.filter((col) => col.level === TypeLevel.textRelevante);

    const getGridClass = (count: number) => {
        if (count === 1) return "grid-cols-1";
        if (count === 2) return "grid-cols-1 sm:grid-cols-2";
        if (count === 3) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    };

    return (
        <div className="flex flex-col h-full w-full animate-fade-in">

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">

                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[var(--bgGeneral)] to-white border border-[var(--colorSecondary)] p-6 shadow-sm shrink-0">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--colorPrimary)]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
                        {firstTitle && (
                            <h2 className="text-2xl font-bold text-[var(--textColor)] tracking-tight line-clamp-2" title={String(item[firstTitle.key as keyof T])}>
                                {String(item[firstTitle.key as keyof T])}
                            </h2>
                        )}
                        {firstId && (
                            <div className="shrink-0 md:ml-4">
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--colorPrimary)]/10 border border-[var(--colorPrimary)]/20 text-[var(--colorPrimary)] text-xs font-medium whitespace-nowrap">
                                    <span className="opacity-70 mr-1">ID:</span>
                                    <span className="font-bold">{String(item[firstId.key as keyof T])}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {firstSubtitle && (
                        <p className="text-[var(--textColor)]/70 text-base font-medium flex items-center gap-2 line-clamp-2 overflow-hidden" title={String(item[firstSubtitle.key as keyof T])}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--colorAcentuar)] shrink-0"></span>
                            {String(item[firstSubtitle.key as keyof T])}
                        </p>
                    )}
                </div>

                {textRelevante.length > 0 && (
                    <div className="space-y-3 shrink-0">
                        <h3 className="text-sm font-semibold text-[var(--colorPrimary)] uppercase tracking-wider flex items-center gap-2 sticky top-0 bg-white/80 backdrop-blur-sm py-2 z-10">
                            <Info className="w-4 h-4" />
                            Información Destacada
                        </h3>
                        <div className={`grid ${getGridClass(textRelevante.length)} gap-4`}>
                            {textRelevante.map((col) => (
                                <div
                                    key={String(col.key)}
                                    className="group p-4 rounded-xl bg-white border border-[var(--colorSecondary)]/50 hover:border-[var(--colorAcentuar)]/50 hover:shadow-md transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--colorPrimary)] to-[var(--colorAcentuar)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <p className="text-xs font-medium text-[var(--textColor)]/60 mb-1 uppercase tracking-wide truncate">
                                        {col.key.toString()}
                                    </p>
                                    <p className="text-[var(--textColor)] font-semibold text-lg break-words line-clamp-3" title={String(item[col.key as keyof T] || "—")}>
                                        {String(item[col.key as keyof T] || "—")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {textNormal.length > 0 && (
                    <div className="space-y-3 pb-6 shrink-0">
                        <div className="flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-sm py-2 z-10">
                            <h3 className="text-sm font-semibold text-[var(--textColor)]/70 uppercase tracking-wider flex items-center gap-2 whitespace-nowrap">
                                <FileText className="w-4 h-4" />
                                Detalles Adicionales
                            </h3>
                            <div className="h-px bg-[var(--border)] w-full"></div>
                        </div>

                        <div className={`grid ${getGridClass(textNormal.length)} gap-3`}>
                            {textNormal.map((col) => (
                                <div
                                    key={String(col.key)}
                                    className="p-3 rounded-lg bg-[var(--bgGeneral)]/50 border border-transparent hover:border-[var(--border)] transition-colors"
                                >
                                    <p className="text-xs text-[var(--textColor)]/50 mb-1 truncate">
                                        {col.key.toString()}
                                    </p>
                                    <p className="text-sm text-[var(--textColor)] font-medium break-words line-clamp-3" title={String(item[col.key as keyof T] || "—")}>
                                        {String(item[col.key as keyof T] || "—")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
