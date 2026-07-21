import { useState, useEffect, useCallback } from 'react'
import Header from '../../components/layout/Header'
import SEO from '../../lib/seo'
import './Overview.css'

// Daftar foto dokumentasi desa dari folder public/assets
const GALERI_PHOTOS = [
  '/assets/1.jpg.jpeg',
  '/assets/2.jpg.jpeg',
  '/assets/3.jpg.jpeg',
  '/assets/4.jpg.jpeg',
  '/assets/5.jpg.jpeg',
  '/assets/6.jpg.jpeg',
  '/assets/7.jpg.jpeg',
  '/assets/8.jpg.jpeg',
  '/assets/9.jpg.jpeg',
  '/assets/10.jpg.jpeg',
  '/assets/11.jpg.jpeg',
  '/assets/12.jpg.jpeg',
  '/assets/13.jpg.jpeg',
  '/assets/14.jpg.jpeg',
  '/assets/15.jpg.jpeg',
  '/assets/16.jpg.jpeg',
  '/assets/17.jpg.jpeg',
  '/assets/18.jpg.jpeg',
  '/assets/19.jpg.jpeg',
  '/assets/20.jpg.jpeg',
  '/assets/21.jpeg',
]

export default function GaleriOverview() {
  const [lightboxIndex, setLightboxIndex] = useState(null) // index foto yang dibuka, atau null

  // Navigasi Lightbox dengan Panah
  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % GALERI_PHOTOS.length)
    }
  }, [lightboxIndex])

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev - 1 + GALERI_PHOTOS.length) % GALERI_PHOTOS.length)
    }
  }, [lightboxIndex])

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

  return (
    <div className="galeri-overview">
      <SEO
        title="Galeri Desa"
        description="Dokumentasi foto kegiatan kemasyarakatan, pembangunan infrastruktur, budaya, dan keindahan alam di Desa Karangtalun."
      />

      <Header
        title="Galeri & Dokumentasi"
        subtitle="Potret Kehidupan, Kegiatan, dan Momen Berharga Desa Karangtalun"
        green={true}
      />

      <div className="container galeri__content">
        {/* Jumlah foto */}
        <p className="galeri__count">{GALERI_PHOTOS.length} Foto Dokumentasi</p>

        {/* Grid Foto Galeri — foto saja tanpa keterangan */}
        <div className="galeri__grid">
          {GALERI_PHOTOS.map((src, index) => (
            <div
              key={src}
              className="galeri-card"
              onClick={() => setLightboxIndex(index)}
              role="button"
              tabIndex={0}
              aria-label={`Lihat foto dokumentasi ${index + 1}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setLightboxIndex(index)
                }
              }}
            >
              <img
                src={src}
                alt={`Foto dokumentasi Desa Karangtalun ${index + 1}`}
                className="galeri-card__image"
                loading="lazy"
              />
              {/* Overlay tipis muncul saat hover — hanya ikon zoom */}
              <div className="galeri-card__overlay">
                <span className="galeri-card__zoom-icon" title="Perbesar gambar">
                  🔍
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal — full screen foto saja */}
      {lightboxIndex !== null && (
        <div
          className="galeri-lightbox"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Foto dokumentasi ${lightboxIndex + 1}`}
        >
          <div
            className="galeri-lightbox__container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Tutup */}
            <button
              type="button"
              className="galeri-lightbox__btn-close"
              onClick={() => setLightboxIndex(null)}
              title="Tutup (Esc)"
              aria-label="Tutup modal"
            >
              ×
            </button>

            {/* Navigasi Prev / Next */}
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

            {/* Foto */}
            <div className="galeri-lightbox__image-wrapper">
              <img
                src={GALERI_PHOTOS[lightboxIndex]}
                alt={`Foto dokumentasi Desa Karangtalun ${lightboxIndex + 1}`}
                className="galeri-lightbox__image"
              />
            </div>

            {/* Counter foto kecil di pojok bawah */}
            <div className="galeri-lightbox__counter">
              {lightboxIndex + 1} / {GALERI_PHOTOS.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
