import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import MarkerPopup from "./MarkerPopup.jsx";
import { createCategoryIcon, CATEGORY_LABELS } from "../../utils/mapIcons.jsx";
import { buildDesaPopupHtml } from "../../utils/geoPopup.js";

import umkmData from "../../data/static/umkm.json";
import wisataData from "../../data/static/wisata.json";
import fasilitasData from "../../data/static/fasilitas.json";

const DESA_GEOJSON_URL = "/maps/karangtalun.geojson";

const DEFAULT_CENTER = [-7.6570, 110.2710];
const DEFAULT_ZOOM = 15;

const desaBaseStyle = {
  color: "#1e7145",
  weight: 2.5,
  opacity: 1,
  fillColor: "#2e7d32",
  fillOpacity: 0.15,
};



/** Lookup cepat data dusun berdasarkan id, dipakai saat membangun popup. */

/**
 * Komponen inti peta. Mengelola basemap, layer batas wilayah, dan marker.
 * `mapRef` diteruskan langsung ke MapContainer sehingga parent (PetaInteraktif)
 * bisa mengontrol peta (flyTo, fitBounds) tanpa state tambahan.
 *
 * @param {{ mapRef: React.RefObject<L.Map>, layers: Record<string, boolean>, onBoundsReady: (bounds: L.LatLngBounds) => void }} props
 */
export default function InteractiveMap({ mapRef, layers, onBoundsReady }) {
  const [desaGeoJson, setDesaGeoJson] = useState(null);

  // Ambil data batas wilayah dari folder public/maps (bukan di-import langsung
  // karena file .geojson besar sebaiknya diperlakukan sebagai aset statis).
  useEffect(() => {
    console.log("USE EFFECT JALAN");
    let isMounted = true;

    fetch(DESA_GEOJSON_URL)
      .then((res) => {
        console.log("STATUS:", res.status);
        console.log("URL:", res.url);
        return res.json();
      })
      .then((data) => {
        console.log("DATA:", data);

        if (!isMounted) return;

        setDesaGeoJson(data);
      })
      .catch((err) => {
        console.error("ERROR:", err);
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEachDesaFeature = (feature, layer) => {
    const p = feature.properties;

    layer.bindPopup(`
      <div style="min-width:220px">
        <h3 style="margin:0 0 8px;font-size:16px;">
          ${p.NAMOBJ}
        </h3>

        <table style="font-size:13px">
          <tr>
            <td><b>Kecamatan</b></td>
            <td>${p.WADMKC}</td>
          </tr>
          <tr>
            <td><b>Kabupaten</b></td>
            <td>${p.WADMKK}</td>
          </tr>
          <tr>
            <td><b>Provinsi</b></td>
            <td>${p.WADMPR}</td>
          </tr>
          <tr>
            <td><b>Kode Desa</b></td>
            <td>${p.KDEPUM}</td>
          </tr>
        </table>
      </div>
    `);

    layer.on({
      mouseover: e => e.target.setStyle({ fillOpacity: 0.25 }),
      mouseout: e => e.target.setStyle(desaBaseStyle),
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
