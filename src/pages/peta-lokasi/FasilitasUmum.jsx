import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/layout/Header'
import SEO from '../../lib/seo'
import fasilitasRaw from '../../data/static/fasilitas.json'
import './FasilitasUmum.css'

// Kata kunci dusun untuk ekstraksi otomatis dari teks alamat
const DUSUN_KEYWORDS = [
  { key: 'Baran', name: 'Baran' },
  { key: 'Dangkel Kulon', name: 'Dangkel Kulon' },
  { key: 'Dangkel Wetan', name: 'Dangkel Wetan' },
  { key: 'Dangkel', name: 'Dangkel' },
  { key: 'Jambon', name: 'Jambon' },
  { key: 'Jampiroso', name: 'Jampiroso' },
  { key: 'Jangkang A', name: 'Jangkang A' },
  { key: 'Jangkang B', name: 'Jangkang B' },
  { key: 'Jangkang', name: 'Jangkang' },
  { key: 'Joho', name: 'Joho' },
  { key: 'Kajoran', name: 'Kajoran' },
  { key: 'Selingan', name: 'Selingan' },
  { key: 'Karangtalun', name: 'Karangtalun' },
  { key: 'Karang Talun', name: 'Karangtalun' },
]

function extractDusun(alamat = '') {
  for (const item of DUSUN_KEYWORDS) {
    if (alamat.toLowerCase().includes(item.key.toLowerCase())) {
      return item.name
    }
  }
  return 'Karangtalun'
}

// Mapping kategori dan normalisasi data riil fasilitas.json
const kategoriLabels = {
  ibadah: { label: 'Tempat Ibadah', icon: '🕌', color: 'teal' },
  pendidikan: { label: 'Pendidikan', icon: '🏫', color: 'blue' },
  pemerintahan: { label: 'Pemerintahan', icon: '🏛️', color: 'green' },
}

const FASILITAS_DATA = fasilitasRaw.map((item, index) => {
  let katSlug = 'umum'
  if (item.kategori === 'Ibadah') katSlug = 'ibadah'
  else if (item.kategori === 'Pendidikan') katSlug = 'pendidikan'
  else if (item.kategori === 'Pemerintahan') katSlug = 'pemerintahan'

  return {
    id: item.id || `fas-${index}`,
    nama: item.nama || 'Fasilitas Umum',
    kategori: katSlug,
    kategoriAsli: item.kategori,
    deskripsi: item.deskripsi || '',
    gambar: item.gambar,
    alamat: item.alamat || 'Desa Karangtalun, Kec. Ngluwar, Kab. Magelang',
    lat: item.lat,
    lng: item.lng,
    dusunLabel: extractDusun(item.alamat),
  }
})

// Helper untuk URL Google Maps dari koordinat
function getGoogleMapsUrl(lat, lng, placeName) {
  if (lat && lng) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName + ' Karangtalun')}`
}

export default function FasilitasUmum() {
  const [activeFilter, setActiveFilter] = useState('semua')
  const [searchQuery, setSearchQuery] = useState('')

  // Statistik jumlah fasilitas berdasarkan kategori
  const stats = useMemo(() => {
    return {
      ibadah: FASILITAS_DATA.filter((f) => f.kategori === 'ibadah').length,
      pendidikan: FASILITAS_DATA.filter((f) => f.kategori === 'pendidikan').length,
      pemerintahan: FASILITAS_DATA.filter((f) => f.kategori === 'pemerintahan').length,
      total: FASILITAS_DATA.length,
    }
  }, [])

  // Filter berdasarkan kategori tab dan pencarian teks real-time
  const fasilitasFiltered = useMemo(() => {
    return FASILITAS_DATA.filter((fasilitas) => {
      // Cek kategori
      if (activeFilter !== 'semua' && fasilitas.kategori !== activeFilter) {
        return false
      }
      // Cek query pencarian
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase()
        const matchNama = fasilitas.nama.toLowerCase().includes(query)
        const matchAlamat = fasilitas.alamat.toLowerCase().includes(query)
        const matchDeskripsi = fasilitas.deskripsi.toLowerCase().includes(query)
        return matchNama || matchAlamat || matchDeskripsi
      }
      return true
    })
  }, [activeFilter, searchQuery])

  return (
    <div className="fasilitas-umum">
      {/* SEO Meta Tags */}
      <SEO
        title="Fasilitas Umum"
        description="Daftar lengkap fasilitas umum, sekolah, masjid, musholla, dan kantor pemerintahan di Desa Karangtalun, Kabupaten Magelang."
      />

      {/* Header Halaman */}
      <Header
        title="Fasilitas Umum Desa"
        subtitle="Informasi lengkap tempat ibadah, lembaga pendidikan, dan sarana pemerintahan Desa Karangtalun"
        green={true}
      />

      <div className="container fasilitas-umum__content">
        {/* Statistics Overview */}
        <section className="fasilitas-stats" aria-label="Statistik fasilitas">
          <div className="fasilitas-stats__grid">
            <div
              className={`stat-card stat-card--total ${activeFilter === 'semua' ? 'stat-card--selected' : ''}`}
              onClick={() => setActiveFilter('semua')}
              role="button"
              tabIndex={0}
            >
              <span className="stat-card__icon">🏛️</span>
              <div className="stat-card__content">
                <strong className="stat-card__value">{stats.total}</strong>
                <span className="stat-card__label">Total Fasilitas</span>
              </div>
            </div>

            {Object.entries(kategoriLabels).map(([key, meta]) => (
              <div
                key={key}
                className={`stat-card stat-card--${meta.color} ${activeFilter === key ? 'stat-card--selected' : ''}`}
                onClick={() => setActiveFilter(key)}
                role="button"
                tabIndex={0}
              >
                <span className="stat-card__icon">{meta.icon}</span>
                <div className="stat-card__content">
                  <strong className="stat-card__value">{stats[key] || 0}</strong>
                  <span className="stat-card__label">{meta.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Search Bar & Filter Tabs */}
        <section className="fasilitas-controls" aria-label="Kontrol filter dan pencarian">
          <div className="fasilitas-search-wrapper">
            <span className="fasilitas-search__icon">🔍</span>
            <input
              type="text"
              className="fasilitas-search__input"
              placeholder="Cari nama masjid, sekolah, atau lokasi dusun..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Cari fasilitas umum"
            />
            {searchQuery && (
              <button
                type="button"
                className="fasilitas-search__clear"
                onClick={() => setSearchQuery('')}
                title="Hapus pencarian"
              >
                ×
              </button>
            )}
          </div>

          <div className="filter-tabs">
            <button
              type="button"
              className={`filter-tab ${activeFilter === 'semua' ? 'filter-tab--active' : ''}`}
              onClick={() => setActiveFilter('semua')}
            >
              Semua Fasilitas ({stats.total})
            </button>
            {Object.entries(kategoriLabels).map(([key, meta]) => (
              <button
                key={key}
                type="button"
                className={`filter-tab ${activeFilter === key ? 'filter-tab--active' : ''}`}
                onClick={() => setActiveFilter(key)}
              >
                <span className="filter-tab__icon">{meta.icon}</span>
                {meta.label} ({stats[key] || 0})
              </button>
            ))}
          </div>
        </section>

        {/* Fasilitas List */}
        <section className="fasilitas-list" aria-label="Daftar fasilitas">
          {fasilitasFiltered.length === 0 ? (
            <div className="fasilitas-empty">
              <span className="fasilitas-empty__icon">🔍</span>
              <h3>Fasilitas Tidak Ditemukan</h3>
              <p>Tidak ada fasilitas yang cocok dengan kata kunci atau filter yang dipilih.</p>
            </div>
          ) : (
            <div className="fasilitas-grid">
              {fasilitasFiltered.map((fasilitas) => {
                const meta = kategoriLabels[fasilitas.kategori] || {
                  label: 'Fasilitas',
                  icon: '🏛️',
                  color: 'green',
                }
                const mapsUrl = getGoogleMapsUrl(fasilitas.lat, fasilitas.lng, fasilitas.nama)
                const isDefaultOrMissingPhoto =
                  !fasilitas.gambar || fasilitas.gambar === '/images/fasilitas/default.jpg'

                return (
                  <a
                    key={fasilitas.id}
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fasilitas-card"
                    aria-label={`Buka ${fasilitas.nama} di Google Maps`}
                  >
                    {/* Visual Header / Foto */}
                    {isDefaultOrMissingPhoto ? (
                      <div className={`fasilitas-card__theme-banner fasilitas-card__theme-banner--${meta.color}`}>
                        <div className="theme-banner__bg-circle theme-banner__bg-circle--1" />
                        <div className="theme-banner__bg-circle theme-banner__bg-circle--2" />
                        <span className="theme-banner__icon">{meta.icon}</span>
                        <span className={`fasilitas-badge fasilitas-badge--${meta.color}`}>
                          {meta.icon} {meta.label}
                        </span>
                      </div>
                    ) : (
                      <div className="fasilitas-card__image">
                        <img src={fasilitas.gambar} alt={fasilitas.nama} loading="lazy" />
                        <span className={`fasilitas-badge fasilitas-badge--${meta.color}`}>
                          {meta.icon} {meta.label}
                        </span>
                      </div>
                    )}

                    {/* Info Fasilitas */}
                    <div className="fasilitas-card__body">
                      <h3 className="fasilitas-card__title">{fasilitas.nama}</h3>
                      {fasilitas.deskripsi && (
                        <p className="fasilitas-card__desc">{fasilitas.deskripsi}</p>
                      )}

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

                      {/* CTA Google Maps */}
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
              <p>Jelajahi lokasi sebaran semua fasilitas umum dengan peta digital interaktif berbasis koordinat GPS.</p>
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
              <h3>Catatan Survei & Pengumpulan Data</h3>
              <p>
                Foto asli fasilitas umum akan ditambahkan setelah tim KKN selesai melakukan survei lapangan. 
                Saat ini, kartu fasilitas yang belum memiliki foto asli ditampilkan menggunakan visual gradien tematis 
                agar informasi lokasi, koordinat GPS, dan deskripsi tetap mudah diakses oleh masyarakat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
