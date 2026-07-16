import { MapPin, Phone } from "lucide-react";

/**
 * Konten popup untuk marker titik (UMKM, Wisata, Fasilitas Umum).
 * Dirender sebagai children dari <Popup> milik react-leaflet, sehingga
 * bisa memakai komponen React biasa (bukan HTML string).
 */
export default function MarkerPopup({ data, categoryLabel }) {
  const { nama, deskripsi, gambar, alamat, kontak } = data;

  return (
    <div className="marker-popup">
      {gambar && (
        <img
          src={gambar}
          alt={nama}
          className="marker-popup__image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}

      <div className="marker-popup__body">
        <span className="marker-popup__category">{categoryLabel}</span>
        <h4 className="marker-popup__title">{nama}</h4>

        {deskripsi && <p className="marker-popup__desc">{deskripsi}</p>}

        <div className="marker-popup__meta-list">
          {alamat && (
            <span className="marker-popup__meta">
              <MapPin size={13} strokeWidth={2.2} />
              {alamat}
            </span>
          )}
          {kontak && kontak !== "-" && (
            <span className="marker-popup__meta">
              <Phone size={13} strokeWidth={2.2} />
              {kontak}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
