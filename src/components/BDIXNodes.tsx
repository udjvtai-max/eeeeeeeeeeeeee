import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import ScrollFadeCard from "./ScrollFadeCard";

const locations = [
  {
    id: "dhaka",
    name: "Dhaka",
    country: "Bangladesh",
    label: "BDIX",
    latency: "1-20ms",
    coordinates: [23.8103, 90.4125] as [number, number],
    isPrimary: true,
  },
  {
    id: "mumbai",
    name: "Mumbai",
    country: "India",
    label: "India",
    latency: "30-50ms",
    coordinates: [19.0760, 72.8777] as [number, number],
    isPrimary: false,
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    label: "SG",
    latency: "50-80ms",
    coordinates: [1.2897, 103.8501] as [number, number],
    isPrimary: false,
  },
];

const BDIXNodes = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on South/Southeast Asia
    const map = L.map(mapRef.current, {
      center: [12, 90],
      zoom: 4,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    // Add dark tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Add animated connection lines
    const connections = [
      [locations[0].coordinates, locations[1].coordinates],
      [locations[0].coordinates, locations[2].coordinates],
      [locations[1].coordinates, locations[2].coordinates],
    ];

    // Create animated polylines
    connections.forEach((line, index) => {
      // Background glow line
      L.polyline(line as L.LatLngExpression[], {
        color: "#00d9a5",
        weight: 4,
        opacity: 0.15,
        lineCap: "round",
      }).addTo(map);

      // Main animated line
      const polyline = L.polyline(line as L.LatLngExpression[], {
        color: "#00d9a5",
        weight: 2,
        opacity: 0.7,
        dashArray: "8, 12",
        lineCap: "round",
        className: `animated-line animated-line-${index}`,
      }).addTo(map);
    });

    // Add markers
    locations.forEach((location) => {
      const markerIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center;">
            ${location.isPrimary ? `
              <div style="position: absolute; width: 48px; height: 48px; border-radius: 50%; background: rgba(0, 217, 165, 0.2); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(0, 217, 165, 0.3); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; animation-delay: 0.5s;"></div>
            ` : ""}
            <div style="position: relative; width: 32px; height: 32px; border-radius: 50%; background: ${location.isPrimary ? '#00d9a5' : 'rgba(0, 217, 165, 0.7)'}; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 217, 165, 0.4);">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      });

      const marker = L.marker(location.coordinates, { icon: markerIcon }).addTo(map);

      marker.bindPopup(`
        <div style="padding: 8px; min-width: 150px; font-family: 'Inter', sans-serif;">
          <h3 style="font-weight: bold; font-size: 16px; margin: 0 0 4px 0; color: #fff;">${location.name}</h3>
          <p style="font-size: 12px; color: #a0a0a0; margin: 0 0 8px 0;">${location.country}</p>
          <div style="border-top: 1px solid #333; padding-top: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
              <span style="color: #a0a0a0;">Latency:</span>
              <span style="font-weight: 600; color: #00d9a5;">${location.latency}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px;">
              <span style="color: #a0a0a0;">Network:</span>
              <span style="font-weight: 600; color: #fff;">${location.label}</span>
            </div>
          </div>
          ${location.isPrimary ? `
            <div style="margin-top: 8px; padding: 4px 8px; background: rgba(0, 217, 165, 0.2); border-radius: 4px; text-align: center;">
              <span style="font-size: 11px; font-weight: bold; color: #00d9a5;">Primary Node</span>
            </div>
          ` : ""}
        </div>
      `);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Global Infrastructure
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-gradient">Network Locations</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Strategically located servers across Asia for optimal performance and low latency.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Map Container */}
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl">
            <div 
              ref={mapRef} 
              className="h-[400px] md:h-[500px] z-0"
              style={{ background: 'hsl(220 14% 6%)' }}
            />

            {/* Overlay stats */}
            <div className="absolute bottom-4 left-4 right-4 z-[1000] flex flex-wrap justify-center gap-3 md:justify-between pointer-events-none">
              <div className="px-4 py-3 bg-card/90 backdrop-blur rounded-xl border border-border pointer-events-auto">
                <div className="text-xl md:text-2xl font-bold text-gradient">3</div>
                <div className="text-xs text-muted-foreground">Locations</div>
              </div>
              <div className="px-4 py-3 bg-card/90 backdrop-blur rounded-xl border border-border pointer-events-auto">
                <div className="text-xl md:text-2xl font-bold text-gradient">99.9%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
              <div className="px-4 py-3 bg-card/90 backdrop-blur rounded-xl border border-border pointer-events-auto">
                <div className="text-xl md:text-2xl font-bold text-gradient">BDIX</div>
                <div className="text-xs text-muted-foreground">Primary</div>
              </div>
              <div className="px-4 py-3 bg-card/90 backdrop-blur rounded-xl border border-border pointer-events-auto">
                <div className="text-xl md:text-2xl font-bold text-gradient">Asia</div>
                <div className="text-xs text-muted-foreground">Coverage</div>
              </div>
            </div>
          </div>

          {/* Location cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {locations.map((location, index) => (
              <ScrollFadeCard key={location.id} delay={index * 100}>
                <div
                  className={`p-4 rounded-xl border transition-all hover:scale-105 h-full ${
                    location.isPrimary
                      ? "bg-gradient-to-br from-primary/20 to-card border-primary/50 glow-primary"
                      : "bg-card border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-full ${
                        location.isPrimary ? "bg-primary" : "bg-primary/60"
                      } flex items-center justify-center`}
                    >
                      <MapPin className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold">{location.name}</h3>
                      <p className="text-xs text-muted-foreground">{location.country}</p>
                    </div>
                    {location.isPrimary && (
                      <span className="ml-auto px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
                        Primary
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <div>
                      <span className="text-xs text-muted-foreground">Latency</span>
                      <p className="font-semibold text-primary">{location.latency}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">Network</span>
                      <p className="font-semibold">{location.label}</p>
                    </div>
                  </div>
                </div>
              </ScrollFadeCard>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        @keyframes dashFlow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -40;
          }
        }
        
        .animated-line {
          animation: dashFlow 2s linear infinite;
        }
        
        .animated-line-0 {
          animation-delay: 0s;
        }
        
        .animated-line-1 {
          animation-delay: 0.5s;
        }
        
        .animated-line-2 {
          animation-delay: 1s;
        }
        
        @keyframes pulse-line {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default BDIXNodes;
