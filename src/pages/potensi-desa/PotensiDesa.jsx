import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import SEO from "../../lib/seo";
import potensiData from "../../data/static/potensi.json";
import "./PotensiDesa.css";

const KATEGORI_LIST = ["Semua", "Pertanian", "UMKM", "Wisata", "Budaya", "Peternakan"];

const KATEGORI_ICON = {
  Pertanian: "🌱",
  UMKM: "🛍️",
  Wisata: "🏞️",
  Budaya: "🎭",
  Peternakan: "🐄",
};

const KATEGORI_BADGE_CLASS = {
  Pertanian: "potensi-badge--pertanian",
  UMKM: "potensi-badge--umkm",
  Wisata: "potensi-badge--wisata",
  Budaya: "potensi-badge--budaya",
  Peternakan: "potensi-badge--peternakan",
};

function PotensiDesa() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const stats = useMemo(() => {
    return potensiData.reduce(
      (acc, item) => {
        acc.total += 1;
        acc[item.kategori] = (acc[item.kategori] || 0) + 1;
        return acc;
      },
      { total: 0 }
    );
  }, []);

  const dataTersaring = useMemo(() => {
    if (kategoriAktif === "Semua") return potensiData;
    return potensiData.filter((item) => item.kategori === kategoriAktif);
  }, [kategoriAktif]);

  return (
    <div className="potensi-desa">
      <SEO
        title="Potensi Desa"
        description="Potensi unggulan Desa Karangtalun."
      />

      <Header
        title="Potensi Desa"
        subtitle="Beragam potensi unggulan Desa Karangtalun mulai dari pertanian, UMKM, wisata, budaya, hingga peternakan."
        green
      />

      <div className="potensi-desa__content container">
        {/* ═══ Statistik ═══ */}
        <section className="potensi-stats">
          <div className="potensi-stats__grid">
            <div className="stat-card stat-card--total">
              <span className="stat-card__icon">🌾</span>
              <div className="stat-card__content">
                <span className="stat-card__value">{stats.total}</span>
                <span className="stat-card__label">Potensi</span>
              </div>
            </div>

            {KATEGORI_LIST.filter((k) => k !== "Semua").map((kategori) => (
              <div className="stat-card" key={kategori}>
                <span className="stat-card__icon">{KATEGORI_ICON[kategori]}</span>
                <div className="stat-card__content">
                  <span className="stat-card__value">{stats[kategori] || 0}</span>
                  <span className="stat-card__label">{kategori}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ Filter ═══ */}
        <section className="potensi-filter">
          <div className="filter-chips">
            {KATEGORI_LIST.map((kategori) => (
              <button
                key={kategori}
                type="button"
                className={`filter-chip ${
                  kategoriAktif === kategori ? "filter-chip--active" : ""
                }`}
                onClick={() => setKategoriAktif(kategori)}
              >
                {kategori !== "Semua" && KATEGORI_ICON[kategori]} {kategori}
              </button>
            ))}
          </div>
        </section>

        {/* ═══ Grid Potensi ═══ */}
        <section className="potensi-list">
          {dataTersaring.length > 0 ? (
            <div className="potensi-grid">
              {dataTersaring.map((item) => (
                <article className="potensi-card" key={item.id}>
                  <div className="potensi-card__image">
                    <img src={item.gambar} alt={item.nama} loading="lazy" />
                    <span
                      className={`potensi-badge ${KATEGORI_BADGE_CLASS[item.kategori]}`}
                    >
                      {KATEGORI_ICON[item.kategori]} {item.kategori}
                    </span>
                  </div>

                  <div className="potensi-card__body">
                    <h3 className="potensi-card__title">{item.nama}</h3>
                    <p className="potensi-card__desc">{item.deskripsi}</p>
                    <span className="potensi-card__lokasi">
                      📍 {item.lokasi}
                    </span>

                    <div className="potensi-card__divider" />

                    <div className="potensi-card__info">
                      <div className="info-item">
                        <span className="info-item__label">👨‍🌾 Kelompok</span>
                        <span className="info-item__value">{item.kelompok}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-item__label">🌱 Luas</span>
                        <span className="info-item__value">{item.luas}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-item__label">⭐ Status</span>
                        <span className="info-item__value">{item.status}</span>
                      </div>
                    </div>

                    <div className="potensi-card__cta">
                      <button type="button" className="potensi-card__btn">
                        Lihat Detail →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="potensi-empty">
              <span className="potensi-empty__icon">🌾</span>
              <p>Belum ada data pada kategori ini.</p>
            </div>
          )}
        </section>

        {/* ═══ CTA Peta Interaktif ═══ */}
        <section className="potensi-cta">
          <div className="cta-card">
            <div className="cta-card__content">
              <h3>Masih banyak potensi yang dapat dikembangkan.</h3>
              <p>
                Jelajahi persebaran potensi melalui peta interaktif desa
                untuk melihat lokasi setiap potensi secara langsung.
              </p>
            </div>
            <Link to="/peta-lokasi/peta-interaktif" className="cta-card__link">
              Buka Peta Interaktif →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PotensiDesa;
