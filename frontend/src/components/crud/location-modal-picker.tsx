import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export function LocationPickerModal({ initialLocation, onSelect, onClose }: any) {
    const defaultLat = 12.136389;
    const defaultLng = -86.251389;
    // Estado local para mostrar coordenadas en la UI sin recargar el mapa
    const [tempLat, setTempLat] = useState(initialLocation?.lat || defaultLat);
    const [tempLng, setTempLng] = useState(initialLocation?.lng || defaultLng);

    // MEMOIZAMOS EL HTML DEL MAPA
    // Esto evita que el iframe se recargue cada vez que setTempLat/setTempLng cambian.
    const mapSrcDoc = useMemo(() => `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>body, html, #map { margin: 0; padding: 0; height: 100%; width: 100%; font-family: sans-serif; }</style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          // Usamos las coordenadas iniciales fijas para la carga
          var startLat = ${initialLocation?.lat || defaultLat};
          var startLng = ${initialLocation?.lng || defaultLng};

          var map = L.map('map').setView([startLat, startLng], 15); // Zoom inicial
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
          }).addTo(map);

          var marker = L.marker([startLat, startLng], {draggable: true}).addTo(map);

          // Enviar nuevas coordenadas al padre al arrastrar
          marker.on('dragend', function(e) {
            var coord = e.target.getLatLng();
            window.parent.postMessage({ type: 'coords', lat: coord.lat, lng: coord.lng }, '*');
          });

          // Enviar nuevas coordenadas al hacer click (sin recargar el mapa)
          map.on('click', function(e) {
            marker.setLatLng(e.latlng);
            window.parent.postMessage({ type: 'coords', lat: e.latlng.lat, lng: e.latlng.lng }, '*');
          });
        </script>
      </body>
      </html>
    `, []); // Array de dependencias vacío = Solo se genera al montar

    useEffect(() => {
        const handler = (event: MessageEvent) => {
            if (event.data?.type === 'coords') {
                setTempLat(event.data.lat);
                setTempLng(event.data.lng);
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full h-[80vh] flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div className="flex flex-col">
                        <h3 className="font-bold text-slate-800">Seleccionar Ubicación</h3>
                        <p className="text-xs text-slate-500">Haz clic o arrastra el marcador</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-xs font-mono bg-white px-2 py-1 border rounded text-slate-600 shadow-sm">
                            {tempLat.toFixed(5)}, {tempLng.toFixed(5)}
                        </div>
                        <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
                    </div>
                </div>
                <div className="flex-1 bg-slate-100 relative">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        srcDoc={mapSrcDoc} 
                        title="Selector de Mapa" 
                        className="w-full h-full"
                    />
                </div>
                <div className="p-4 border-t border-slate-100 flex justify-end gap-2 bg-white">
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={() => onSelect({ lat: tempLat, lng: tempLng })}>Confirmar Ubicación</Button>
                </div>
            </div>
        </div>
    );
}