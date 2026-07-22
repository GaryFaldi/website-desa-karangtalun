import { renderToStaticMarkup } from "react-dom/server";
import { Store, Camera, Building2 } from "lucide-react";

/**
 * Konfigurasi visual tiap kategori marker.
 * Tambahkan kategori baru di sini apabila diperlukan.
 */
const CATEGORY_CONFIG = {
  umkm: { Icon: Store, color: "#d97706" },
  wisata: { Icon: Camera, color: "#0284c7" },
  fasilitas: { Icon: Building2, color: "#7c3aed" },
};

/**
 * Membuat L.divIcon berbentuk pin bulat dengan ikon lucide-react di dalamnya.
 * Menggunakan divIcon (bukan L.icon gambar) agar ringan dan mudah diberi style CSS.
 *
 * @param {"umkm" | "wisata" | "fasilitas"} category
 * @returns {L.DivIcon|null}
 */
export function createCategoryIcon(category) {
  if (typeof window === "undefined") return null;

  // Import Leaflet secara dinamis di browser saja
  const L = window.L || (typeof require !== "undefined" ? require("leaflet") : null);
  if (!L) return null;

  const config = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.fasilitas;
  const { Icon, color } = config;

  const iconSvg = renderToStaticMarkup(
    <Icon size={15} color="#ffffff" strokeWidth={2.5} />
  );

  const html = `
    <span class="map-pin" style="--pin-color:${color}">
      <span class="map-pin__icon">${iconSvg}</span>
    </span>
  `;

  return L.divIcon({
    html,
    className: "map-pin-wrapper",
    iconSize: [30, 38],
    iconAnchor: [15, 36],
    popupAnchor: [0, -34],
  });
}

/** Label tampilan untuk tiap kategori, dipakai di popup & legend. */
export const CATEGORY_LABELS = {
  umkm: "UMKM",
  wisata: "Wisata",
  fasilitas: "Fasilitas Umum",
};

/** Warna tiap kategori, dipakai di legend supaya konsisten dengan marker. */
export const CATEGORY_COLORS = {
  umkm: CATEGORY_CONFIG.umkm.color,
  wisata: CATEGORY_CONFIG.wisata.color,
  fasilitas: CATEGORY_CONFIG.fasilitas.color,
};
