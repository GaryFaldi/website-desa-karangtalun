import { useCallback, useState } from "react";

/** Konfigurasi layer default — semua layer aktif saat halaman pertama dibuka. */
const DEFAULT_LAYERS = {
  batasDesa: true,
  batasDusun: true,
  umkm: true,
  wisata: true,
  fasilitas: true,
};

/**
 * Mengelola visibilitas setiap layer pada peta interaktif.
 * @returns {{ layers: typeof DEFAULT_LAYERS, toggleLayer: (key: keyof typeof DEFAULT_LAYERS) => void }}
 */
export function useMapLayers() {
  const [layers, setLayers] = useState(DEFAULT_LAYERS);

  const toggleLayer = useCallback((key) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return { layers, toggleLayer };
}
