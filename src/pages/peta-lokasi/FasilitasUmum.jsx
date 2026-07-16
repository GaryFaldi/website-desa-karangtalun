import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/layout/Header'
import SEO from '../../lib/seo'
import { fasilitasDummy, kategoriLabels, filterByKategori, countByKategori, getGoogleMapsUrl } from '../../data/static/fasilitas-dummy'
import './FasilitasUmum.css'

export default function FasilitasUmum() {
  const [activeFilter, setActiveFilter] = useState('semua')
  
  const stats = countByKategori()
  const fasilitasFiltered = filterByKategori(activeFilter)

  return (
    <div className="fasilitas-umum">
      {/* SEO Meta Tags */}
      <SEO 
        title="Fasilitas Umum"
        description="Daftar lengkap fasilitas umum, sekolah, dan tempat ibadah di Desa Karangtalun, Kabupaten Magelang, Jawa Tengah."
      />

      {/* Header Halaman */}
      <Header
        title="Fasilitas Umum Desa"
        subtitle="Informasi lengkap tentang fasilitas pendidikan, kesehatan, dan tempat ibadah di Desa Karangtalun"
        green={true}
      />

      <div className="container fasilitas-umum__content">
        
        {/* Statistics Overview */}
        <section className="fasilitas-stats" aria-label="Statistik fasilitas">
          <div className="fasilitas-stats__grid">
            <div className="stat-card stat-card--total">
              <span className="stat-card__icon">🏛️</span>
              <div className="stat-card__content">
                <strong className="stat-card__value">{stats.total}</strong>
                <span className="stat-card__label">Total Fasilitas</span>
              </div>
            </div>
            
            {Object.entries(kategoriLabels).map(([key, meta]) => (
              <div key={key} className={`stat-card stat-card--${meta.color}`}>
                <span className="stat-card__icon">{meta.icon}</span>
                <div className="stat-card__content">
                  <strong className="stat-card__value">{stats[key]}</strong>
                  <span className="stat-card__label">{meta.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="fasilitas-filter" aria-label="Filter kategori">
          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeFilter === 'semua' ? 'filter-tab--active' : ''}`}
              onClick={() => setActiveFilter('semua')}
            >
              Semua Fasilitas
            </button>
            {Object.entries(kategoriLabels).map(([key, meta]) => (
              <button
                key={key}
                className={`filter-tab ${activeFilter === key ? 'filter-tab--active' : ''}`}
                onClick={() => setActiveFilter(key)}
              >
                <span className="filter-tab__icon">{meta.icon}</span>
                {meta.label}
              </button>
            ))}
          </div>
        </section>

        {/* Fasilitas List */}
        <section className="fasilitas-list" aria-label="Daftar fasilitas">
          {fasilitasFiltered.length === 0 ? (
            <div className="fasilitas-empty">
              <span className="fasilitas-empty__icon">🔍</span>
              <p>Tidak ada data fasilitas untuk kategori ini.</p>
            </div>
          ) : (
            <div className="fasilitas-grid">
              {fasilitasFiltered.map((fasilitas) => {
                const meta = kategoriLabels[fasilitas.kategori]
                const mapsUrl = getGoogleMapsUrl(fasilitas.latitude, fasilitas.longitude, fasilitas.nama)
                
                return (
                  <a
                    key={fasilitas.id}
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fasilitas-card"
                  >
                    {/* Foto Fasilitas */}
                    <div className="fasilitas-card__image">
                      <img 
                        src={fasilitas.foto} 
                        alt={fasilitas.nama}
                        loading="lazy"
                      />
                      <span className={`fasilitas-badge fasilitas-badge--${meta.color}`}>
                        {meta.icon} {meta.label}
                      </span>
                    </div>

                    {/* Info Fasilitas */}
                    <div className="fasilitas-card__body">
                      <h3 className="fasilitas-card__title">{fasilitas.nama}</h3>
                      
                      <div className="fasilitas-card__meta">
                        <span className="meta-item">
                          <span className="meta-icon">🌿</span>
                          <span>Dusun {fasilitas.dusunLabel}</span>
                        </span>
                        <span className="meta-item">
                          <span className="meta-icon">📍</span>
                          <span>{fasilitas.alamat}</span>
                        </span>
                      </div>

                      {/* CTA Link */}
                      <div className="fasilitas-card__cta">
                        <span className="cta-text">
                          <span className="cta-icon">🗺️</span>
                          Buka di Google Maps
                        </span>
                        <span className="cta-arrow">→</span>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          )}
        </section>

        {/* CTA to Peta Interaktif */}
        <section className="fasilitas-cta">
          <div className="cta-card">
            <div className="cta-card__icon">🗺️</div>
            <div className="cta-card__content">
              <h3>Lihat di Peta Interaktif</h3>
              <p>Jelajahi lokasi semua fasilitas umum dengan peta interaktif berbasis koordinat GPS.</p>
              <Link to="/peta-lokasi/peta-interaktif" className="btn btn--primary">
                Buka Peta Interaktif →
              </Link>
            </div>
          </div>
        </section>

        {/* Info Note */}
        <div className="fasilitas-note">
          <div className="note-card">
            <span className="note-card__icon">ℹ️</span>
            <div className="note-card__content">
              <h3>Catatan Data</h3>
              <p>
                Data di atas adalah placeholder sementara yang akan diperbarui dengan data riil dari hasil 
                survei lapangan. Koordinat GPS dan foto fasilitas akan dilengkapi setelah proses pengumpulan data selesai. 
                Untuk informasi lebih lanjut atau koreksi data, silakan hubungi Kantor Desa.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
