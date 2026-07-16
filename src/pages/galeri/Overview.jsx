import { useState, useEffect, useCallback, useMemo } from 'react'
import Header from '../../components/layout/Header'
import SEO from '../../lib/seo'
import './Overview.css'

// Data dummy foto galeri khusus tingkat Desa Karangtalun bersumber dari Unsplash
const GALERI_DATA = [
  {
    id: 1,
    title: 'Kerja Bakti Bersih Desa & Gotong Royong',
    desc: 'Warga bersama-sama membersihkan saluran irigasi dan jalan lingkungan menjelang musim tanam padi.',
    category: 'kegiatan',
    date: '12 Juli 2026',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Hamparan Sawah & Perbukitan Desa Karangtalun',
    desc: 'Pemandangan pagi hari di hamparan persawahan hijau dengan latar belakang perbukitan yang sejuk dan asri.',
    category: 'alam',
    date: '10 Juli 2026',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes)',
    desc: 'Pertemuan rutin perangkat desa, tokoh masyarakat, dan perwakilan pemuda untuk menyusun program kerja desa.',
    category: 'kegiatan',
    date: '5 Juli 2026',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Panen Raya Padi Organik Kelompok Tani Desa',
    desc: 'Kegiatan panen padi bersama oleh gabungan kelompok tani desa dengan hasil gabah berkualitas tinggi.',
    category: 'kegiatan',
    date: '28 Juni 2026',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Jalan Setapak Asri Lingkungan Pedesaan',
    desc: 'Suasana asri jalan desa yang dikelilingi pepohonan rindang dan kebun sayur produktif milik warga.',
    category: 'alam',
    date: '24 Juni 2026',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Pelatihan Kewirausahaan & Pengolahan Produk UMKM',
    desc: 'Ibu-ibu PKK dan pelaku UMKM desa mengikuti pelatihan pembuatan kripik dan pengemasan produk olahan lokal.',
    category: 'kegiatan',
    date: '20 Juni 2026',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'Posyandu Terpadu & Pemeriksaan Kesehatan Lansia',
    desc: 'Layanan kesehatan berkala untuk memantau tumbuh kembang balita dan kesehatan lansia di Balai Desa.',
    category: 'kegiatan',
    date: '15 Juni 2026',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    title: 'Matahari Terbenam di Embung Penampungan Air Desa',
    desc: 'Momen senja yang menenangkan di area embung penampungan air dan pertanian terpadu desa.',
    category: 'alam',
    date: '12 Juni 2026',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 9,
    title: 'Pelestarian Budaya Seni Tradisional Karawitan',
    desc: 'Latihan rutin kesenian lokal dan karawitan oleh generasi muda untuk melestarikan warisan budaya Jawa.',
    category: 'budaya',
    date: '8 Juni 2026',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 10,
    title: 'Pembangunan Jembatan Penghubung & Normalisasi Sungai',
    desc: 'Infrastruktur jembatan baru dan sungai bersih yang menjadi penopang utama irigasi lahan pertanian.',
    category: 'pembangunan',
    date: '1 Juni 2026',
    image: 'https://images.unsplash.com/photo-1432462770865-65b70566d673?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 11,
    title: 'Kawasan Pemukiman Warga yang Bersih & Nyaman',
    desc: 'Tata rumah tinggal warga yang tertata rapi dengan pekarangan yang ditanami tanaman obat keluarga (TOGA).',
    category: 'alam',
    date: '25 Mei 2026',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 12,
    title: 'Pemerataan Infrastruktur Jalan Rabat Beton Desa',
    desc: 'Hasil pembangunan jalan cor gotong royong yang memperlancar mobilitas ekonomi dan distribusi hasil bumi.',
    category: 'pembangunan',
    date: '18 Mei 2026',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
  },
]

// Helper format label kategori untuk badge
function getCategoryLabel(category) {
  switch (category) {
    case 'kegiatan':
      return 'Kegiatan Warga'
    case 'pembangunan':
      return 'Infrastruktur'
    case 'alam':
      return 'Alam & Lingkungan'
    case 'budaya':
      return 'Seni & Budaya'
    default:
      return 'Dokumentasi'
  }
}

export default function GaleriOverview() {
  const [activeTab, setActiveTab] = useState('semua') // 'semua' | 'kegiatan' | 'pembangunan' | 'alam' | 'budaya'
  const [lightboxIndex, setLightboxIndex] = useState(null) // index dalam filteredList atau null

  // Filter gambar berdasarkan tab kategori
  const filteredList = useMemo(() => {
    if (activeTab === 'semua') return GALERI_DATA
    return GALERI_DATA.filter((item) => item.category === activeTab)
  }, [activeTab])

  // Navigasi Lightbox dengan Panah
  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % filteredList.length)
    }
  }, [lightboxIndex, filteredList.length])

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length)
    }
  }, [lightboxIndex, filteredList.length])

  // Keyboard navigation untuk Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, handleNext, handlePrev])

  const currentItem = lightboxIndex !== null ? filteredList[lightboxIndex] : null

  return (
    <div className="galeri-overview">
      <SEO
        title="Galeri Desa"
        description="Dokumentasi foto kegiatan kemasyarakatan, pembangunan infrastruktur, budaya, dan keindahan alam di Desa Karangtalun."
      />

      <Header
        title="Galeri & Dokumentasi"
        subtitle="Potret Kehidupan, Pembangunan, Kegiatan, dan Keindahan Alam Desa Karangtalun"
        green={true}
      />

      <div className="container galeri__content">
        {/* Filter Tabs Section */}
        <div className="galeri__filter-section">
          <div className="galeri__tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'semua'}
              className={`galeri__tab-btn ${activeTab === 'semua' ? 'galeri__tab-btn--active' : ''}`}
              onClick={() => setActiveTab('semua')}
            >
              Semua ({GALERI_DATA.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'kegiatan'}
              className={`galeri__tab-btn ${activeTab === 'kegiatan' ? 'galeri__tab-btn--active' : ''}`}
              onClick={() => setActiveTab('kegiatan')}
            >
              Kegiatan Warga ({GALERI_DATA.filter((i) => i.category === 'kegiatan').length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'pembangunan'}
              className={`galeri__tab-btn ${activeTab === 'pembangunan' ? 'galeri__tab-btn--active' : ''}`}
              onClick={() => setActiveTab('pembangunan')}
            >
              Infrastruktur ({GALERI_DATA.filter((i) => i.category === 'pembangunan').length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'alam'}
              className={`galeri__tab-btn ${activeTab === 'alam' ? 'galeri__tab-btn--active' : ''}`}
              onClick={() => setActiveTab('alam')}
            >
              Alam & Lingkungan ({GALERI_DATA.filter((i) => i.category === 'alam').length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'budaya'}
              className={`galeri__tab-btn ${activeTab === 'budaya' ? 'galeri__tab-btn--active' : ''}`}
              onClick={() => setActiveTab('budaya')}
            >
              Seni & Budaya ({GALERI_DATA.filter((i) => i.category === 'budaya').length})
            </button>
          </div>
        </div>

        {/* Grid Foto Galeri */}
        <div className="galeri__grid">
          {filteredList.length > 0 ? (
            filteredList.map((item, index) => (
              <div
                key={item.id}
                className="galeri-card"
                onClick={() => setLightboxIndex(index)}
                role="button"
                tabIndex={0}
                aria-label={`Lihat detail foto ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setLightboxIndex(index)
                  }
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="galeri-card__image"
                  loading="lazy"
                />
                <div className="galeri-card__overlay">
                  <span className={`galeri-card__badge galeri-card__badge--${item.category}`}>
                    {getCategoryLabel(item.category)}
                  </span>
                  <h3 className="galeri-card__title">{item.title}</h3>
                  <div className="galeri-card__meta">
                    <span className="galeri-card__date">📅 {item.date}</span>
                    <span className="galeri-card__zoom-icon" title="Perbesar gambar">🔍</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="galeri__empty">
              <span className="galeri__empty-icon">📷</span>
              <h3>Belum Ada Dokumentasi</h3>
              <p>Foto untuk kategori yang Anda pilih saat ini sedang dalam persiapan.</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <div
          className="galeri-lightbox"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title}
        >
          <div
            className="galeri-lightbox__container"
            onClick={(e) => e.stopPropagation()} // Mencegah tutup saat klik area modal
          >
            <button
              type="button"
              className="galeri-lightbox__btn-close"
              onClick={() => setLightboxIndex(null)}
              title="Tutup (Esc)"
              aria-label="Tutup modal"
            >
              ×
            </button>

            {filteredList.length > 1 && (
              <>
                <button
                  type="button"
                  className="galeri-lightbox__nav galeri-lightbox__nav--prev"
                  onClick={handlePrev}
                  title="Foto Sebelumnya (Panah Kiri)"
                  aria-label="Foto sebelumnya"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="galeri-lightbox__nav galeri-lightbox__nav--next"
                  onClick={handleNext}
                  title="Foto Berikutnya (Panah Kanan)"
                  aria-label="Foto berikutnya"
                >
                  ›
                </button>
              </>
            )}

            <div className="galeri-lightbox__image-wrapper">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="galeri-lightbox__image"
              />
            </div>

            <div className="galeri-lightbox__info">
              <div>
                <h3 className="galeri-lightbox__title">{currentItem.title}</h3>
                <p className="galeri-lightbox__desc">{currentItem.desc}</p>
              </div>
              <div className="galeri-lightbox__meta-right">
                <span className={`galeri-card__badge galeri-card__badge--${currentItem.category}`}>
                  {getCategoryLabel(currentItem.category)}
                </span>
                <span className="galeri-card__date" style={{ color: '#cbd5e1' }}>
                  📅 {currentItem.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
