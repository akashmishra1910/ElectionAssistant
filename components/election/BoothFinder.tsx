"use client";

import { useState, useEffect } from "react";
import { MapPin, Navigation, Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import LeafletMap with no SSR
const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

interface Booth {
  id: number;
  name: string;
  address: string;
  distance: string;
  lat: number;
  lng: number;
}

export default function BoothFinder() {
  const [location, setLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [booths, setBooths] = useState<Booth[]>([]);
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) return;

    setIsSearching(true);
    try {
      // Use Nominatim API (Free OpenStreetMap Geocoding)
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location + ", India")}`);
      const results = await res.json();

      if (results && results.length > 0) {
        const lat = parseFloat(results[0].lat);
        const lng = parseFloat(results[0].lon);
        
        setMapCenter({ lat, lng });

        // Generate mock booths around the searched location
        const mockDynamicBooths: Booth[] = [
          {
            id: 1,
            name: "Govt Primary School Booth",
            address: `${results[0].display_name.split(',')[0]} Area`,
            distance: "0.4 km",
            lat: lat + 0.002,
            lng: lng + 0.002,
          },
          {
            id: 2,
            name: "Community Center Booth",
            address: `Near ${location} Main Market`,
            distance: "1.2 km",
            lat: lat - 0.003,
            lng: lng + 0.001,
          },
          {
            id: 3,
            name: "Public Library Polling Station",
            address: `Sector Block, ${location}`,
            distance: "2.1 km",
            lat: lat + 0.001,
            lng: lng - 0.004,
          }
        ];
        
        setBooths(mockDynamicBooths);
        setSelectedBooth(mockDynamicBooths[0]);
      } else {
        alert("Could not find that location. Please try a different pincode or city name.");
      }
    } catch (error) {
      console.error("Failed to fetch location", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <MapPin className="w-12 h-12 text-brand-saffron mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
            Find Your Polling Booth
          </h2>
          <p className="text-lg text-slate-800">
            Enter your location or pincode to find the nearest polling station.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 grid md:grid-cols-3 min-h-[500px]">
          {/* Sidebar / Search Area */}
          <div className="md:col-span-1 border-r border-slate-100 flex flex-col bg-white z-10 shadow-lg">
            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Enter area or pincode..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-shadow"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 w-5 h-5" />
                <button 
                  type="submit" 
                  disabled={isSearching}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-blue text-white p-2 rounded-lg hover:bg-brand-blue-dark transition-colors"
                >
                  {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Navigation className="w-5 h-5" />}
                </button>
              </form>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {booths.length === 0 && !isSearching && (
                <div className="text-center text-slate-700 py-12 px-4">
                  Enter your location above to see nearby polling stations.
                </div>
              )}
              
              <AnimatePresence>
                {booths.map((booth) => (
                  <motion.div
                    key={booth.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setSelectedBooth(booth)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                      selectedBooth?.id === booth.id 
                        ? 'border-brand-blue bg-blue-50' 
                        : 'border-transparent hover:bg-slate-50 border-b-slate-100'
                    }`}
                  >
                    <h3 className="font-bold text-slate-800 flex justify-between items-center">
                      {booth.name}
                      <span className="text-xs bg-slate-200 text-slate-800 px-2 py-1 rounded-full">
                        {booth.distance}
                      </span>
                    </h3>
                    <p className="text-sm text-slate-700 mt-1">{booth.address}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Map Area */}
          <div className="md:col-span-2 relative bg-slate-200 min-h-[400px] flex flex-col z-0">
            {booths.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-slate-700 p-8 text-center relative z-10 bg-slate-100">
                <MapPin className="w-16 h-16 mb-4 opacity-50" />
                <p>Map view will appear here once you search for a location.</p>
                <p className="text-sm mt-2">(Interactive map powered by Leaflet & OpenStreetMap)</p>
              </div>
            ) : (
              <LeafletMap 
                center={mapCenter}
                booths={booths}
                selectedBooth={selectedBooth}
                onBoothSelect={setSelectedBooth}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
