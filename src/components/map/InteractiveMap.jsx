import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import MarkerPopup from "./MarkerPopup.jsx";
import { createCategoryIcon, CATEGORY_LABELS } from "../../utils/mapIcons.jsx";
import { buildDesaPopupHtml, buildDusunPopupHtml } from "../../utils/geoPopup.js";

import dusunData from "../../data/static/dusun.json";
import umkmData from "../../data/static/umkm.json";
import wisataData from "../../data/static/wisata.json";
import fasilitasData from "../../data/static/fasilitas.json";

const DESA_GEOJSON_URL = "public/maps/desa.geojson";
const DUSUN_GEOJSON_URL = "public/maps/dusun.geojson";

const DEFAULT_CENTER = [-7.4123, 110.2015];
const DEFAULT_ZOOM = 14;

const desaBaseStyle = {
  color: "#1e7145",
  weight: 3,
  fillColor: "#1e7145",
  fillOpacity: 0.08,
};

const dusunBaseStyle = {
  color: "#4caf6d",
  weight: 2,
  fillColor: "#4caf6d",
  fillOpacity: 0.18,
};

const dusunHoverStyle = {
  weight: 3,
  fillOpacity: 0.38,
};

/** Lookup cepat data dusun berdasarkan id, dipakai saat membangun popup. */
const dusunLookup = Object.fromEntries(dusunData.map((item) => [item.id, item]));

/**
 * Komponen inti peta. Mengelola basemap, layer batas wilayah, dan marker.
 * `mapRef` diteruskan langsung ke MapContainer sehingga parent (PetaInteraktif)
 * bisa mengontrol peta (flyTo, fitBounds) tanpa state tambahan.
 *
 * @param {{ mapRef: React.RefObject<L.Map>, layers: Record<string, boolean>, onBoundsReady: (bounds: L.LatLngBounds) => void }} props
 */
export default function InteractiveMap({ mapRef, layers, onBoundsReady }) {
  const [desaGeoJson, setDesaGeoJson] = useState(null);
  const [dusunGeoJson, setDusunGeoJson] = useState(null);

  // Ambil data batas wilayah dari folder public/maps (bukan di-import langsung
  // karena file .geojson besar sebaiknya diperlakukan sebagai aset statis).
  useEffect(() => {
    let isMounted = true;

    fetch(DESA_GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        setDesaGeoJson(data);

        const bounds = L.geoJSON(data).getBounds();
        onBoundsReady(bounds);

        // Fit bounds otomatis saat halaman pertama dibuka.
        if (mapRef.current) {
          mapRef.current.fitBounds(bounds, { padding: [32, 32] });
        }
      })
      .catch(() => {
        // Gagal memuat batas desa: peta tetap tampil dengan center default.
      });

    fetch(DUSUN_GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => isMounted && setDusunGeoJson(data))
      .catch(() => {
        // Gagal memuat batas dusun: layer dusun akan disembunyikan.
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEachDesaFeature = (feature, layer) => {
    layer.bindPopup(buildDesaPopupHtml(feature.properties));
    layer.on({
      mouseover: (e) => e.target.setStyle({ fillOpacity: 0.18 }),
      mouseout: (e) => e.target.setStyle(desaBaseStyle),
    });
  };

  const handleEachDusunFeature = (feature, layer) => {
    const detail = dusunLookup[feature.properties?.id];
    layer.bindPopup(buildDusunPopupHtml(detail));
    layer.on({
      mouseover: (e) => e.target.setStyle(dusunHoverStyle),
      mouseout: (e) => e.target.setStyle(dusunBaseStyle),
    });
  };

  return (
    <MapContainer
      ref={mapRef}
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      zoomControl={false}
      className="interactive-map"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <ZoomControl position="bottomright" />

      {layers.batasDesa && desaGeoJson && (
        <GeoJSON
          data={desaGeoJson}
          style={desaBaseStyle}
          onEachFeature={handleEachDesaFeature}
        />
      )}

      {layers.batasDusun && dusunGeoJson && (
        <GeoJSON
          data={dusunGeoJson}
          style={dusunBaseStyle}
          onEachFeature={handleEachDusunFeature}
        />
      )}

      {layers.umkm &&
        umkmData.map((item) => (
          <Marker key={item.id} position={[item.lat, item.lng]} icon={createCategoryIcon("umkm")}>
            <Popup>
              <MarkerPopup data={item} categoryLabel={CATEGORY_LABELS.umkm} />
            </Popup>
          </Marker>
        ))}

      {layers.wisata &&
        wisataData.map((item) => (
          <Marker key={item.id} position={[item.lat, item.lng]} icon={createCategoryIcon("wisata")}>
            <Popup>
              <MarkerPopup data={item} categoryLabel={CATEGORY_LABELS.wisata} />
            </Popup>
          </Marker>
        ))}

      {layers.fasilitas &&
        fasilitasData.map((item) => (
          <Marker key={item.id} position={[item.lat, item.lng]} icon={createCategoryIcon("fasilitas")}>
            <Popup>
              <MarkerPopup data={item} categoryLabel={CATEGORY_LABELS.fasilitas} />
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
