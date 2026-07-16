/**
 * Leaflet GeoJSON layer memakai bindPopup(string), bukan React node,
 * sehingga konten popup untuk poligon dibangun sebagai HTML string di sini
 * agar komponen React tetap bersih dari markup mentah.
 */

/**
 * @param {{ nama?: string, kecamatan?: string, kabupaten?: string, provinsi?: string }} properties
 */
export function buildDesaPopupHtml(properties) {
  const { nama, kecamatan, kabupaten, provinsi } = properties ?? {};

  return `
    <div class="geo-popup">
      <span class="geo-popup__eyebrow">Batas Desa</span>
      <h4 class="geo-popup__title">${nama ?? "Desa Karangtalun"}</h4>
      <p class="geo-popup__meta">
        ${[kecamatan, kabupaten, provinsi].filter(Boolean).join(", ")}
      </p>
    </div>
  `;
}

/**
 * @param {{ nama: string, kepalaDusun?: string, jumlahKK?: number, jumlahPenduduk?: number, luasWilayah?: string, deskripsi?: string }} dusun
 */
export function buildDusunPopupHtml(dusun) {
  if (!dusun) {
    return `<div class="geo-popup"><p class="geo-popup__meta">Data dusun belum tersedia.</p></div>`;
  }

  const { nama, kepalaDusun, jumlahKK, jumlahPenduduk, luasWilayah, deskripsi } = dusun;

  return `
    <div class="geo-popup">
      <span class="geo-popup__eyebrow">Batas Dusun</span>
      <h4 class="geo-popup__title">${nama}</h4>
      ${deskripsi ? `<p class="geo-popup__desc">${deskripsi}</p>` : ""}
      <ul class="geo-popup__list">
        ${kepalaDusun ? `<li><strong>Kepala Dusun:</strong> ${kepalaDusun}</li>` : ""}
        ${jumlahKK ? `<li><strong>Jumlah KK:</strong> ${jumlahKK}</li>` : ""}
        ${jumlahPenduduk ? `<li><strong>Jumlah Penduduk:</strong> ${jumlahPenduduk} jiwa</li>` : ""}
        ${luasWilayah ? `<li><strong>Luas Wilayah:</strong> ${luasWilayah}</li>` : ""}
      </ul>
    </div>
  `;
}
