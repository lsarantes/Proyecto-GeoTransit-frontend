import { CheckSquare, Globe, Search, Square, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { TableColumn } from "@/types/crud-interface-types";
import { TypeLevel } from "@/types/type-level";

export function AllLocationsModal<T>({ items, onClose, columns }: { items: any, onClose: any, columns: TableColumn<T>[] }) {
    // Estado para búsqueda y selección
    const keyItem = columns.find((c) => (c.level === TypeLevel.coordenada));
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(items.map((i:any) => i.id))); // Inicia con todos seleccionados

    // Filtrar lista basada en el buscador
    const filteredItems = useMemo(() => {
        const lowerTerm = searchTerm.toLowerCase();
        return items.filter((item: any) => 
            item.nombre.toLowerCase().includes(lowerTerm) ||
            item.direccion.toLowerCase().includes(lowerTerm)
        );
    }, [items, searchTerm]);

    // Manejadores de selección
    const toggleSelection = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const toggleSelectAll = () => {
        const allFilteredIds = filteredItems.map((i:any) => i.id);
        const allSelected = allFilteredIds.every((id:any) => selectedIds.has(id));
        
        const newSet = new Set(selectedIds);
        if (allSelected) {
            allFilteredIds.forEach((id:any) => newSet.delete(id)); // Deseleccionar visibles
        } else {
            allFilteredIds.forEach((id:any) => newSet.add(id)); // Seleccionar visibles
        }
        setSelectedIds(newSet);
    };

    // Generar mapa con marcadores múltiples usando Leaflet inyectado en iframe (para evitar limitaciones de embed simple)
    const markersToShow = items.filter((i:any) => selectedIds.has(i.id));
    
    // HTML string para el iframe
    const mapSrcDoc = `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
        <style>body, html, #map { margin: 0; padding: 0; height: 100%; width: 100%; font-family: sans-serif; }</style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map');
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);

          var points = ${JSON.stringify(markersToShow.map((i:any) => ({ 
              lat: i[keyItem?.key].lat || 12.136389, 
              lng: i[keyItem?.key].lng || -86.251389, 
              title: i.nombre,
              desc: i.direccion
          })))};

          var bounds = [];
          var markers = [];

          if(points.length === 0) {
             map.setView([12.136389, -86.251389], 13);
          } else {
             points.forEach(function(p) {
                var m = L.marker([p.lat, p.lng]).addTo(map);
                m.bindPopup("<b>" + p.title + "</b><br>" + p.desc);
                bounds.push([p.lat, p.lng]);
             });
             
             if (bounds.length > 0) {
                map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
             }
          }
        </script>
      </body>
      </html>
    `;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <Globe className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg">Mapa General</h3>
                            <p className="text-xs text-slate-500">
                                {markersToShow.length} ubicaciones visibles
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
                    {/* Sidebar con Buscador y Checkboxes */}
                    <div className="w-full md:w-80 border-r border-slate-200 flex flex-col bg-white">
                        <div className="p-3 border-b border-slate-100 space-y-3">
                            {/* Buscador */}
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input 
                                    placeholder="Filtrar..." 
                                    value={searchTerm}
                                    onChange={(e:any) => setSearchTerm(e.target.value)}
                                    className="pl-8 h-9 text-sm"
                                />
                            </div>
                            {/* Select All Toggle */}
                            <div className="flex items-center justify-between px-1">
                                <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer select-none">
                                    <input 
                                        type="checkbox" 
                                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                        checked={filteredItems.length > 0 && filteredItems.every((i:any) => selectedIds.has(i.id))}
                                        onChange={toggleSelectAll}
                                    />
                                    Seleccionar todo
                                </label>
                                <span className="text-xs text-slate-400">{filteredItems.length} resultados</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-2 space-y-1">
                            {filteredItems.length === 0 ? (
                                <p className="text-center text-xs text-slate-400 py-4">No se encontraron resultados</p>
                            ) : (
                                filteredItems.map((item: any) => {
                                    const isSelected = selectedIds.has(item.id);
                                    return (
                                        <div 
                                            key={item.id}
                                            onClick={() => toggleSelection(item.id)}
                                            className={`w-full text-left p-3 rounded-lg border transition-all duration-200 flex items-start gap-3 cursor-pointer select-none ${isSelected 
                                                ? 'bg-blue-50 border-blue-200 shadow-sm' 
                                                : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-100'}`}
                                        >
                                            <div className={`mt-0.5 ${isSelected ? 'text-blue-600' : 'text-slate-300'}`}>
                                                {isSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                                            </div>
                                            <div>
                                                <h4 className={`font-semibold text-sm ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                                                    {item.nombre}
                                                </h4>
                                                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.lat}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Map Area */}
                    <div className="flex-1 bg-slate-100 relative h-full min-h-[300px]">
                         <iframe 
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            srcDoc={mapSrcDoc}
                            className="w-full h-full"
                            title="Mapa Detallado"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}