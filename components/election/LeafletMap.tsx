"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Navigation } from "lucide-react";

// Fix for default marker icons in leaflet with Next.js/Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map center updates when mapCenter prop changes
function MapUpdater({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lng], 15, {
      animate: true,
    });
  }, [center, map]);
  return null;
}

interface Booth {
  id: number;
  name: string;
  address: string;
  distance: string;
  lat: number;
  lng: number;
}

interface LeafletMapProps {
  center: { lat: number; lng: number };
  booths: Booth[];
  selectedBooth: Booth | null;
  onBoothSelect: (booth: Booth) => void;
}

export default function LeafletMap({ center, booths, selectedBooth, onBoothSelect }: LeafletMapProps) {
  return (
    <div className="flex-grow relative h-full min-h-[400px] z-0">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={center} />

        {booths.map((booth) => (
          <Marker 
            key={booth.id} 
            position={[booth.lat, booth.lng]}
            eventHandlers={{
              click: () => onBoothSelect(booth),
            }}
          >
            <Popup>
              <strong>{booth.name}</strong><br />
              {booth.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {selectedBooth && (
        <div className="absolute bottom-6 left-6 right-6 z-[1000] bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl flex justify-between items-center border border-slate-200">
          <div>
            <h3 className="font-bold text-xl text-slate-800">{selectedBooth.name}</h3>
            <p className="text-slate-800">{selectedBooth.address}</p>
          </div>
          <button 
            onClick={() => {
              const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedBooth.lat},${selectedBooth.lng}`;
              window.open(url, 'DirectionsPopup', 'width=800,height=600,menubar=no,toolbar=no,location=no,status=no');
            }}
            className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-full font-bold hover:bg-brand-blue-dark transition-colors shadow-md cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            Directions
          </button>
        </div>
      )}
    </div>
  );
}
