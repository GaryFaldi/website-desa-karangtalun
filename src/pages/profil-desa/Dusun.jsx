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
  const getSeoImage = () => {
    if (!dusunData?.frontmatter) return '/assets/hero-desa.jpg'
    const { umkm, galeri, hero_foto } = dusunData.frontmatter
    if (hero_foto) return hero_foto
    if (Array.isArray(umkm) && umkm.length > 0 && umkm[0].foto) return umkm[0].foto
    if (Array.isArray(galeri) && galeri.length > 0) return galeri[0]
    return '/assets/hero-desa.jpg'
  }

  const getSeoDescription = () => {
    if (!dusunData) {
      return `Profil wilayah Dusun ${dusunName}, Desa Karangtalun. Halaman sedang dalam tahap pengumpulan data oleh tim kontributor KKN.`
    }
    const { frontmatter, content } = dusunData
    const textSource = frontmatter.sejarah?.ringkasan || content || ''
    const plainText = textSource
      .replace(/#+\s/g, '')
      .replace(/\*\*/g, '')
      .replace(/\n/g, ' ')
      .trim()
    
    const excerpt = plainText.length > 160 
      ? plainText.slice(0, 157) + '...' 
      : plainText

    return excerpt || `Profil wilayah, potensi pertanian, UMKM, dan kegiatan warga di Dusun ${dusunName}, Desa Karangtalun.`
  }

  const seoTitle = `Dusun ${dusunName}`
  const seoDescription = getSeoDescription()
  const seoImage = getSeoImage()

  // ─── KONDISI 1: DATA BELUM ADA (SKELETON / UNDER CONSTRUCTION) ─────────────
  if (!dusunData) {
    return (
      <div className="dusun-page">
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

  // ─── KONDISI 2: DATA ADA (DESAIN INTERAKTIF VISUAL CARDS) ───────────────────
  const { frontmatter, content } = dusunData

  return (
    <div className="dusun-page">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
      />

      {/* Header Halaman (Green Variant) */}
      <Header
        title={`Dusun ${frontmatter.nama}`}
        subtitle={frontmatter.tagline || `Profil Wilayah, Potensi Pertanian, UMKM, dan Kegiatan Warga Dusun ${frontmatter.nama}`}
        green={true}
      />

      <div className="container dusun-page__content">

        {/* ── 1. Seksi Ringkasan & Stat Cards ── */}
        <section className="dusun-section" aria-labelledby="ringkasan-title">
          <div className="dusun-overview-grid">
            <div className="dusun-overview__text">
              <span className="dusun-section__badge">Wilayah Dusun</span>
              <h2 id="ringkasan-title" className="dusun-section__title">
                Profil Dusun {frontmatter.nama}
              </h2>
              <p className="dusun-section__p">
                Dusun <strong>{frontmatter.nama}</strong> merupakan salah satu wilayah di Desa Karangtalun dengan lingkungan pemukiman asri yang dikelilingi persawahan hijau subur dan potensi industri rumahan produktif.
              </p>
            </div>

            <div className="dusun-overview__visual">
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
                  <span className="label">Total Penduduk</span>
                  <strong className="value">
                    {frontmatter.jumlah_penduduk ? `${frontmatter.jumlah_penduduk} Jiwa` : '—'}
                  </strong>
                </div>
              </div>

              {frontmatter.jumlah_kk && (
                <div className="dusun-stat-card">
                  <span className="dusun-stat-card__icon">🏠</span>
                  <div className="dusun-stat-card__info">
                    <span className="label">Rumah Tangga</span>
                    <strong className="value">{frontmatter.jumlah_kk} KK</strong>
                  </div>
                </div>
              )}

              {frontmatter.rt_rw && (
                <div className="dusun-stat-card">
                  <span className="dusun-stat-card__icon">🗺️</span>
                  <div className="dusun-stat-card__info">
                    <span className="label">Cakupan Wilayah</span>
                    <strong className="value">{frontmatter.rt_rw}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <hr className="dusun__divider" />

        {/* ── 2. Seksi Pilar Keunggulan Pertanian & Irigasi (Interactive Feature Grid) ── */}
        {frontmatter.keunggulan_pertanian && Array.isArray(frontmatter.keunggulan_pertanian.fitur) && (
          <section className="dusun-section" aria-labelledby="pertanian-title">
            <div className="dusun-section__header-center">
              <span className="dusun-section__badge">Keunggulan Utama</span>
              <h2 id="pertanian-title" className="dusun-section__title">
                {frontmatter.keunggulan_pertanian.judul}
              </h2>
            </div>

            <div className="pilar-feature-grid">
              {frontmatter.keunggulan_pertanian.fitur.map((item, idx) => (
                <div key={idx} className="pilar-feature-card">
                  <span className="pilar-feature-card__icon">{item.ikon}</span>
                  <h3 className="pilar-feature-card__title">{item.judul}</h3>
                  <p className="pilar-feature-card__desc">{item.deskripsi}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Fallback jika menggunakan pilar_utama sederhana */}
        {!frontmatter.keunggulan_pertanian && frontmatter.pilar_utama && (
          <section className="dusun-section">
            <div className="pilar-box">
              <span className="pilar-box__quote-icon">{frontmatter.pilar_utama.ikon || '🌾'}</span>
              <h3 className="pilar-box__title">{frontmatter.pilar_utama.judul}</h3>
              <p className="pilar-box__text">{frontmatter.pilar_utama.deskripsi}</p>
            </div>
          </section>
        )}

        <hr className="dusun__divider" />

        {/* ── 3. Seksi Sejarah & Karakter Dusun (Story Card) ── */}
        {frontmatter.sejarah && (
          <section className="dusun-section" aria-labelledby="sejarah-title">
            <div className="sejarah-story-card">
              <div className="sejarah-story-card__header">
                <span className="dusun-section__badge">Asal-Usul & Nilai</span>
                <h2 id="sejarah-title" className="sejarah-story-card__title">
                  {frontmatter.sejarah.judul}
                </h2>
                {frontmatter.sejarah.ringkasan && (
                  <p className="sejarah-story-card__ringkasan">
                    {frontmatter.sejarah.ringkasan}
                  </p>
                )}
              </div>

              {Array.isArray(frontmatter.sejarah.poin) && frontmatter.sejarah.poin.length > 0 && (
                <div className="sejarah-story-card__grid">
                  {frontmatter.sejarah.poin.map((p, idx) => (
                    <div key={idx} className="sejarah-poin-card">
                      <span className="sejarah-poin-card__icon">{p.ikon || '📜'}</span>
                      <div className="sejarah-poin-card__info">
                        <h3>{p.judul}</h3>
                        <p>{p.deskripsi}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── 4. Seksi Sarana & Kegiatan Kemasyarakatan (Feature Grid) ── */}
        {Array.isArray(frontmatter.sarana_kegiatan) && frontmatter.sarana_kegiatan.length > 0 && (
          <>
            <hr className="dusun__divider" />
            <section className="dusun-section" aria-labelledby="sarana-title">
              <div className="dusun-section__header-center">
                <span className="dusun-section__badge">Kemasyarakatan</span>
                <h2 id="sarana-title" className="dusun-section__title">
                  Sarana & Lembaga Dusun
                </h2>
              </div>

              <div className="sarana-grid">
                {frontmatter.sarana_kegiatan.map((item, idx) => (
                  <div key={idx} className="sarana-card">
                    <span className="sarana-card__icon">{item.ikon}</span>
                    <div className="sarana-card__body">
                      {item.kategori && <span className="sarana-card__tag">{item.kategori}</span>}
                      <h3>{item.judul}</h3>
                      <p>{item.deskripsi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ── 6. Fallback Artikel Markdown Biasa (jika ada file dusun lain dengan markdown murni) ── */}
        {content && content.trim() !== '' && !frontmatter.sejarah && (
          <>
            <hr className="dusun__divider" />
            <section className="dusun-section">
              <article className="dusun-article markdown-body">
                <ReactMarkdown>{content}</ReactMarkdown>
              </article>
            </section>
          </>
        )}

        {/* ── 7. Seksi UMKM & Produk Unggulan ── */}
        {Array.isArray(frontmatter.umkm) && frontmatter.umkm.length > 0 && (
          <>
            <hr className="dusun__divider" />
            <section className="dusun-section" aria-labelledby="umkm-title">
              <div className="dusun-section__header-center">
                <span className="dusun-section__badge">Potensi & Usaha Warga</span>
                <h2 id="umkm-title" className="dusun-section__title">UMKM & Industri Rumahan</h2>
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
                      {item.kategori && (
                        <span className="umkm-card__category-badge">{item.kategori}</span>
                      )}
                    </div>
                    <div className="umkm-card__body">
                      <h3>{item.nama}</h3>
                      <p>{item.deskripsi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ── 7. Seksi Fasilitas Dusun ── */}
        {Array.isArray(frontmatter.fasilitas_dusun) && frontmatter.fasilitas_dusun.length > 0 && (
          <>
            <hr className="dusun__divider" />
            <section className="dusun-section" aria-labelledby="fasilitas-title">
              <div className="dusun-section__header-center">
                <span className="dusun-section__badge">Sarana & Prasarana</span>
                <h2 id="fasilitas-title" className="dusun-section__title">Fasilitas Dusun</h2>
              </div>

              <div className="fasilitas-dusun-grid">
                {frontmatter.fasilitas_dusun.map((item, idx) => (
                  <div key={idx} className="fasilitas-dusun-card">
                    <div className="fasilitas-dusun-card__img-wrap">
                      <img
                        src={item.foto || '/assets/hero-desa.jpg'}
                        alt={item.nama}
                        loading="lazy"
                      />
                      {item.kategori && (
                        <span className="fasilitas-dusun-card__badge">{item.kategori}</span>
                      )}
                    </div>
                    <div className="fasilitas-dusun-card__body">
                      <h3>{item.nama}</h3>
                      {item.deskripsi && <p>{item.deskripsi}</p>}
                      {item.maps_url && (
                        <a
                          href={item.maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="fasilitas-dusun-card__maps-btn"
                        >
                          📍 Buka di Google Maps →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ── 8. Seksi Galeri Dokumentasi ── */}
        {Array.isArray(frontmatter.galeri) && frontmatter.galeri.length > 0 && (
          <>
            <hr className="dusun__divider" />
            <section className="dusun-section" aria-labelledby="galeri-title">
              <div className="dusun-section__header-center">
                <span className="dusun-section__badge">Kegiatan Warga</span>
                <h2 id="galeri-title" className="dusun-section__title">Galeri Kegiatan Dusun</h2>
              </div>

              <div className="dusun-galeri-grid">
                {frontmatter.galeri.map((foto, idx) => (
                  <div key={idx} className="dusun-galeri-item">
                    <img src={foto} alt={`Dokumentasi ${frontmatter.nama} ${idx + 1}`} loading="lazy" />
                    <div className="dusun-galeri-item__overlay">
                      <span>🔍</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <hr className="dusun__divider" />

        {/* ── 9. Navigasi Dusun Switcher ── */}
        <section className="other-dusun-nav" aria-label="Navigasi dusun lainnya">
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
        </section>

      </div>
    </div>
  )
}
