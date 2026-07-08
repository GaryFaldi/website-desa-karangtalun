import { useEffect } from 'react'
import Header from '../../components/layout/Header'
import { profilDesaData } from '../../data/static/desa'
import './Overview.css'
import { Link } from 'react-router-dom'
import { DUSUN_SLUGS } from '../Beranda'

export default function Overview() {
  useEffect(() => {
    document.title = 'Overview Desa — Desa Karangtalun'
  }, [])

  const { sejarah, visiMisi, geografis, kontak } = profilDesaData

  return (
    <div className="overview">
      {/* Header Halaman (Green Variant) */}
      <Header
        title="Profil Umum Desa"
        subtitle="Mengenal lebih dekat sejarah, visi, misi, letak geografis, dan informasi pelayanan Desa Karangtalun."
        green={true}
      />

      <div className="container overview__content">
        {/* ── Seksi Sejarah ── */}
        <section className="overview-section" aria-labelledby="sejarah-title">
          <div className="overview-grid">
            <div className="overview-section__text">
              <span className="overview-section__badge">Asal-Usul</span>
              <h2 id="sejarah-title" className="overview-section__title">{sejarah.title}</h2>
              {sejarah.paragraphs.map((paragraph, index) => (
                <p key={index} className="overview-section__p">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="overview-section__visual" aria-hidden="true">
              <div className="overview-section__card">
                <span className="overview-section__card-icon">📜</span>
                <h3>Warisan Budaya</h3>
                <p>Menjaga nilai gotong royong dan tradisi warisan leluhur secara turun-temurun.</p>
              </div>
              <div className="overview-section__card">
                <span className="overview-section__card-icon">🌾</span>
                <h3>Tanah Subur</h3>
                <p>Memiliki alam yang melimpah dan lahan tani produktif penyokong ekonomi desa.</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="overview__divider" />

        {/* ── Seksi Visi Misi ── */}
        <section className="overview-section" aria-labelledby="visimisi-title">
          <div className="overview-section__header-center">
            <span className="overview-section__badge">Arah Juang</span>
            <h2 id="visimisi-title" className="overview-section__title">Visi & Misi Desa</h2>
          </div>
          
          <div className="visi-box">
            <span className="visi-box__quote-icon">“</span>
            <h3 className="visi-box__title">Visi Desa</h3>
            <p className="visi-box__text">{visiMisi.visi}</p>
          </div>

          <div className="misi-list">
            <h3 className="misi-list__title">Misi Desa</h3>
            <ol className="misi-list__grid" role="list">
              {visiMisi.misi.map((m, index) => (
                <li key={index} className="misi-item">
                  <span className="misi-item__number" aria-hidden="true">0{index + 1}</span>
                  <p className="misi-item__text">{m}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <hr className="overview__divider" />

        {/* ── Seksi Geografis & Kontak ── */}
        <div className="overview-bottom-grid">
          {/* Letak Geografis */}
          <section className="overview-section card-style" aria-labelledby="geografis-title">
            <span className="overview-section__badge">Peta & Batas</span>
            <h2 id="geografis-title" className="overview-section__title">{geografis.title}</h2>
            <p className="overview-section__p">{geografis.deskripsi}</p>
            
            <div className="borders-box">
              <h3>Batas Wilayah:</h3>
              <ul className="borders-list" role="list">
                <li><strong>Utara:</strong> {geografis.batasWilayah.utara}</li>
                <li><strong>Selatan:</strong> {geografis.batasWilayah.selatan}</li>
                <li><strong>Timur:</strong> {geografis.batasWilayah.timur}</li>
                <li><strong>Barat:</strong> {geografis.batasWilayah.barat}</li>
              </ul>
            </div>
          </section>

          {/* Kontak & Pelayanan */}
          <section className="overview-section card-style" aria-labelledby="kontak-title">
            <span className="overview-section__badge">Hubungi Kami</span>
            <h2 id="kontak-title" className="overview-section__title">Kontak & Jam Layanan</h2>
            
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-item__icon" aria-hidden="true">📍</span>
                <div className="contact-item__text">
                  <h3>Alamat Kantor Desa</h3>
                  <p>{kontak.alamat}</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-item__icon" aria-hidden="true">📞</span>
                <div className="contact-item__text">
                  <h3>Telepon / WhatsApp</h3>
                  <p><a href={`tel:${kontak.telepon}`}>{kontak.telepon}</a></p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-item__icon" aria-hidden="true">✉️</span>
                <div className="contact-item__text">
                  <h3>Email Resmi</h3>
                  <p><a href={`mailto:${kontak.email}`}>{kontak.email}</a></p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-item__icon" aria-hidden="true">🕐</span>
                <div className="contact-item__text">
                  <h3>Jam Pelayanan Publik</h3>
                  <p>{kontak.jamPelayanan}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* ── Profil Dusun ── */}
      <section className="dusun section" aria-label="Daftar dusun">
        <div className="container">
          <div className="section-header">
            <span className="section-label">12 Dusun</span>
            <h2 className="section-title">Profil Wilayah Dusun</h2>
            <p className="section-desc">
              Setiap dusun memiliki cerita, potensi, dan keunikan masing-masing.
            </p>
          </div>
          <ul className="dusun__grid" role="list">
            {DUSUN_SLUGS.map((d) => (
              <li key={d.slug}>
                <Link
                  to={`/profil-desa/dusun/${d.slug}`}
                  className="dusun__card"
                  id={`dusun-${d.slug}`}
                >
                  <span className="dusun__name">Dusun {d.label}</span>
                  <svg className="dusun__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </div>
    </div>
  )
}
