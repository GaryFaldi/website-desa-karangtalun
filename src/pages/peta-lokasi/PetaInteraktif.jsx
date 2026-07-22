import { useCallback, useRef, useState, useEffect, lazy, Suspense } from "react";
import { MapPin } from "lucide-react";

import LayerControl from "../../components/map/LayerControl.jsx";
import MapLegend from "../../components/map/MapLegend.jsx";
import SearchBox from "../../components/map/SearchBox.jsx";
import FloatingButtons from "../../components/map/FloatingButtons.jsx";

import { useMapLayers } from "../../hooks/useMapLayers.js";
import { useFullscreen } from "../../hooks/useFullscreen.js";
import { buildSearchIndex } from "../../utils/searchIndex.js";

import umkmData from "../../data/static/umkm.json";
import wisataData from "../../data/static/wisata.json";
import fasilitasData from "../../data/static/fasilitas.json";

import "../../styles/PetaInteraktif.css";

// Lazy load InteractiveMap HANYA jika berjalan di browser (window !== undefined)
// Ini mencegah Node.js meng-import leaflet/react-leaflet saat SSG build.
const LazyInteractiveMap = typeof window !== 'undefined'
  ? lazy(() => import("../../components/map/InteractiveMap.jsx"))
  : null;

function ClientOnlyMap(props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !LazyInteractiveMap) {
    return (
      <div className="interactive-map map-placeholder" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#f1f5f9', color: '#64748b', fontWeight: 600 }}>
        <span>🗺️ Memuat Peta Interaktif...</span>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="interactive-map map-placeholder" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#f1f5f9', color: '#64748b', fontWeight: 600 }}>
        <span>🗺️ Memuat Peta Interaktif...</span>
      </div>
    }>
      <LazyInteractiveMap {...props} />
    </Suspense>
  );
}

const searchIndex = buildSearchIndex({
  umkm: umkmData,
  wisata: wisataData,
  fasilitas: fasilitasData,
});

const FLY_TO_ZOOM = 17;

export default function PetaInteraktif() {
  const mapRef = useRef(null);
  const shellRef = useRef(null);
  const initialBoundsRef = useRef(null);

  const { layers, toggleLayer } = useMapLayers();
  const { isFullscreen, toggleFullscreen } = useFullscreen(shellRef);
  const [isLegendCollapsedHint] = useState(false);

  const handleBoundsReady = useCallback((bounds) => {
    initialBoundsRef.current = bounds;
  }, []);

  const handleReset = useCallback(() => {
    if (mapRef.current && initialBoundsRef.current) {
      mapRef.current.fitBounds(initialBoundsRef.current, { padding: [32, 32] });
    }
  }, []);

  const handleSelectLocation = useCallback((lat, lng) => {
    mapRef.current?.flyTo([lat, lng], FLY_TO_ZOOM, { duration: 1.1 });
  }, []);

  return (
    <div className="peta-page">
      <header className="peta-page__header">
        <div className="peta-page__heading">
          <MapPin size={22} strokeWidth={2.2} />
          <div>
            <h1>Peta Interaktif</h1>
            <p>Sebaran wilayah, UMKM, wisata, dan fasilitas umum Desa Karangtalun</p>
          </div>
        </div>
      </header>

      <div className="map-shell" ref={shellRef} data-fullscreen={isLegendCollapsedHint}>
        <ClientOnlyMap mapRef={mapRef} layers={layers} onBoundsReady={handleBoundsReady} />

        <div className="map-shell__overlay map-shell__overlay--top-left">
          <SearchBox items={searchIndex} onSelectLocation={handleSelectLocation} />
        </div>

        <div className="map-shell__overlay map-shell__overlay--top-right">
          <LayerControl layers={layers} onToggle={toggleLayer} />
        </div>

        <div className="map-shell__overlay map-shell__overlay--bottom-left">
          <MapLegend />
        </div>

        <div className="map-shell__overlay map-shell__overlay--bottom-right">
          <FloatingButtons
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
}
