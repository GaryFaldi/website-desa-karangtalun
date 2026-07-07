import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Header from '../../components/layout/Header'
import SEO from '../../lib/seo'
import { getDusunBySlug, ALL_DUSUN_SLUGS } from '../../lib/loadDusunData'
import './Dusun.css'

export default function Dusun() {
  const { slug } = useParams()
  const dusunData = getDusunBySlug(slug)

  // Cari label standar untuk fallback nama jika file .md belum dibuat
  const standardInfo = ALL_DUSUN_SLUGS.find((d) => d.slug === slug)
  const dusunName = dusunData?.frontmatter?.nama || standardInfo?.label || slug

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // ─── Prepare SEO Data ────────────────────────────────────────────────────
  // Logika fallback gambar: foto UMKM pertama → foto galeri pertama → hero desa
  const getSeoImage = () => {
    if (!dusunData?.frontmatter) return '/assets/hero-desa.jpg'
    
    const { umkm, galeri } = dusunData.frontmatter
    
    if (umkm && umkm.length > 0 && umkm[0].foto) {
      return umkm[0].foto
    }
    
    if (galeri && galeri.length > 0) {
      return galeri[0]
    }
    
    return '/assets/hero-desa.jpg'
  }

  const getSeoDescription = () => {
    if (!dusunData) {
      return `Profil wilayah Dusun ${dusunName}, Desa Karangtalun. Halaman sedang dalam tahap pengumpulan data oleh tim kontributor KKN.`
    }

    // Ambil narasi awal dari content markdown (maksimal 160 karakter)
    const { content } = dusunData
    const plainText = content
      .replace(/#+\s/g, '') // Hapus heading markdown
      .replace(/\*\*/g, '') // Hapus bold
      .replace(/\n/g, ' ')  // Ganti newline jadi spasi
      .trim()
    
    const excerpt = plainText.length > 160 
      ? plainText.slice(0, 157) + '...' 
      : plainText

    return excerpt || `Profil wilayah, potensi UMKM, dan kegiatan warga di Dusun ${dusunName}, Desa Karangtalun.`
  }

  const seoTitle = `Dusun ${dusunName}`
  const seoDescription = getSeoDescription()
  const seoImage = getSeoImage()

  // ─── KONDISI 1: DATA BELUM ADA (SKELETON / UNDER CONSTRUCTION) ─────────────
  if (!dusunData) {
    return (
      <div className="dusun-page">
        {/* SEO Meta Tags */}
        <SEO 
          title={seoTitle}
          description={seoDescription}
        />

        <Header
          title={`Dusun ${dusunName}`}
          subtitle="Profil Wilayah Dusun — Desa Karangtalun"
          green={false}
        />

        <div className="container dusun-page__skeleton-wrap">
          <div className="skeleton-card">
            <div className="skeleton-card__icon" aria-hidden="true">🚧</div>
            <h2 className="skeleton-card__title">Data Sedang Dipersiapkan</h2>
            <p className="skeleton-card__desc">
              Halaman profil untuk <strong>Dusun {dusunName}</strong> saat ini masih dalam tahap
              pengumpulan data dan penulisan oleh tim kontributor KKN.
            </p>
            <div className="skeleton-card__steps">
              <span className="skeleton-badge">Info Kolaborator</span>
              <p>
                Untuk mengisi halaman ini, salin file <code>src/data/dusun/_template.md</code> menjadi{' '}
                <code>{slug}.md</code> di folder yang sama.
              </p>
            </div>
            <div className="skeleton-card__actions">
              <Link to="/profil-desa/overview" className="btn btn--primary">
                ← Kembali ke Overview Desa
              </Link>
              <Link to="/profil-desa/dusun/jampiroso" className="btn btn--outline-dark">
                Lihat Contoh (Jampiroso)
              </Link>
            </div>
          </div>

          {/* Navigasi Cepat ke Dusun Lain */}
          <div className="other-dusun-nav">
            <h3>Jelajahi Dusun Lainnya</h3>
            <div className="other-dusun-grid">
              {ALL_DUSUN_SLUGS.map((d) => (
                <Link
                  key={d.slug}
                  to={`/profil-desa/dusun/${d.slug}`}
                  className={`other-dusun-pill ${d.slug === slug ? 'other-dusun-pill--active' : ''}`}
                >
                  🌿 {d.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─── KONDISI 2: DATA ADA (RENDER KONTEN MARKDOWN) ──────────────────────────
  const { frontmatter, content } = dusunData

  return (
    <div className="dusun-page">
      {/* SEO Meta Tags */}
      <SEO 
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
      />

      {/* Header */}
      <Header
        title={`Dusun ${frontmatter.nama}`}
        subtitle={`Profil Wilayah, Potensi UMKM, dan Kegiatan Warga di Dusun ${frontmatter.nama}`}
        green={true}
      />

      <div className="container dusun-page__content">
        {/* Kilat Info Dusun */}
        <div className="dusun-stats-grid">
          <div className="dusun-stat-card">
            <span className="dusun-stat-card__icon">👤</span>
            <div className="dusun-stat-card__info">
              <span className="label">Kepala Dusun</span>
              <strong className="value">{frontmatter.kepala_dusun || '—'}</strong>
            </div>
          </div>
          <div className="dusun-stat-card">
            <span className="dusun-stat-card__icon">👥</span>
            <div className="dusun-stat-card__info">
              <span className="label">Estimasi Penduduk</span>
              <strong className="value">
                {frontmatter.jumlah_penduduk ? `${frontmatter.jumlah_penduduk} Jiwa` : '—'}
              </strong>
            </div>
          </div>
        </div>

        <hr className="dusun-divider" />

        {/* Konten Narasi (Markdown) */}
        <article className="dusun-article markdown-body">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>

        {/* Seksi UMKM & Unggulan */}
        {frontmatter.umkm && frontmatter.umkm.length > 0 && (
          <section className="dusun-section">
            <div className="dusun-section__header">
              <span className="section-badge">Potensi Lokal</span>
              <h2>UMKM & Produk Unggulan</h2>
            </div>
            <div className="umkm-grid">
              {frontmatter.umkm.map((item, idx) => (
                <div key={idx} className="umkm-card">
                  <div className="umkm-card__img-wrap">
                    <img
                      src={item.foto || '/assets/hero-desa.jpg'}
                      alt={item.nama}
                      loading="lazy"
                    />
                  </div>
                  <div className="umkm-card__body">
                    <h3>{item.nama}</h3>
                    <p>{item.deskripsi}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Seksi Galeri */}
        {frontmatter.galeri && frontmatter.galeri.length > 0 && (
          <section className="dusun-section">
            <div className="dusun-section__header">
              <span className="section-badge">Dokumentasi</span>
              <h2>Galeri Kegiatan Dusun</h2>
            </div>
            <div className="dusun-galeri-grid">
              {frontmatter.galeri.map((foto, idx) => (
                <div key={idx} className="dusun-galeri-item">
                  <img src={foto} alt={`Dokumentasi ${frontmatter.nama} ${idx + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </section>
        )}

        <hr className="dusun-divider" />

        {/* Navigasi Cepat ke Dusun Lain */}
        <div className="other-dusun-nav">
          <h3>Jelajahi Dusun Lainnya di Karangtalun</h3>
          <div className="other-dusun-grid">
            {ALL_DUSUN_SLUGS.map((d) => (
              <Link
                key={d.slug}
                to={`/profil-desa/dusun/${d.slug}`}
                className={`other-dusun-pill ${d.slug === slug ? 'other-dusun-pill--active' : ''}`}
              >
                🌿 {d.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
