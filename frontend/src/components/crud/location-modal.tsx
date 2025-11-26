import { TableColumn } from "@/types/crud-interface-types";
import { TypeLevel } from "@/types/type-level";
import { MapIcon, MapPin, X } from "lucide-react";

export function LocationModal<T>({ item, onClose, columns }: { item: any, onClose: any, columns: TableColumn<T>[] }) {
    // Si no hay coordenadas, usar unas por defecto (Managua)
    const keyItem = columns.find((c) => (c.level === TypeLevel.coordenada));
    const coordenadas = item[keyItem?.key];
    const lat =  coordenadas.lat || 12.136389;
    const lng = coordenadas.lng || -86.251389;
    
    // Crear URL de embed de OpenStreetMap
    // bbox define el área visible: [minLon, minLat, maxLon, maxLat]
    const delta = 0.005; // Zoom aproximado
    const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
    const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 h-[500px]">
                {/* Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <MapIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg">{item.nombre}</h3>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {item.direccion}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Map Body */}
                <div className="flex-1 relative bg-slate-100">
                     <iframe 
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        scrolling="no" 
                        marginHeight={0} 
                        marginWidth={0} 
                        src={mapSrc}
                        className="w-full h-full"
                        title="Mapa de Ubicación"
                    ></iframe>
                    
                    {/* Floating Info Card inside map */}
                    <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-64 bg-white/90 backdrop-blur p-3 rounded-lg shadow-lg border border-slate-200 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <span className="text-xs text-slate-500 block uppercase font-bold">Latitud</span>
                                <span className="font-mono text-slate-700">{lat.toFixed(6)}</span>
                            </div>
                            <div>
                                <span className="text-xs text-slate-500 block uppercase font-bold">Longitud</span>
                                <span className="font-mono text-slate-700">{lng.toFixed(6)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}