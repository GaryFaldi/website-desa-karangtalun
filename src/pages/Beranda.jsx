import { Link } from 'react-router-dom'
import SEO from '../lib/seo'
import './Beranda.css'

// ─── Data Placeholder ────────────────────────────────────────────────────────
// Ganti dengan data real dari src/data/static/desa.js saat konten tersedia

const STATS = [
  { icon: '👥', value: '±1.200',  label: 'Jiwa',           note: '*data sementara' },
  { icon: '🏠', value: '±350',    label: 'Kepala Keluarga', note: '*data sementara' },
  { icon: '🏘️', value: '12',      label: 'Dusun',           note: '' },
  { icon: '🗺️', value: '—',       label: 'Luas Wilayah',    note: 'segera diperbarui' },
]

const LAYANAN = [
  {
    id: 'profil-desa',
    icon: '🏛️',
    title: 'Profil Desa',
    desc: 'Sejarah, visi-misi, letak geografis, dan kontak resmi Desa Karangtalun.',
    href: '/profil-desa/overview',
    color: 'green',
  },
  {
    id: 'pemerintahan',
    icon: '📋',
    title: 'Pemerintahan',
    desc: 'Struktur organisasi perangkat desa dan data statistik kependudukan.',
    href: '/pemerintahan/struktur-organisasi',
    color: 'blue',
  },
  {
    id: 'wisata',
    icon: '🌿',
    title: 'Potensi & Wisata',
    desc: 'Peta wisata, kuliner lokal, dan UMKM desa.',
    href: '/potensi-wisata/peta-wisata-kuliner',
    color: 'teal',
  },
  {
    id: 'galeri',
    icon: '📷',
    title: 'Galeri',
    desc: 'Dokumentasi kegiatan dan momen penting tingkat desa.',
    href: '/galeri/kegiatan-desa',
    color: 'amber',
  },
  {
    id: 'peta',
    icon: '📍',
    title: 'Peta Lokasi',
    desc: 'Peta interaktif fasilitas umum, sekolah, dan tempat ibadah.',
    href: '/peta-lokasi/peta-interaktif',
    color: 'rose',
  },
]

const DUSUN_SLUGS = [
  { slug: 'baran',          label: 'Baran' },
  { slug: 'dangkel-kulon',  label: 'Dangkel Kulon' },
  { slug: 'dangkel-wetan',  label: 'Dangkel Wetan' },
  { slug: 'jambon',         label: 'Jambon' },
  { slug: 'jampiroso',      label: 'Jampiroso' },
  { slug: 'jangkang',       label: 'Jangkang' },
  { slug: 'jangkang-a',     label: 'Jangkang A' },
  { slug: 'jangkang-b',     label: 'Jangkang B' },
  { slug: 'joho',           label: 'Joho' },
  { slug: 'kajoran',        label: 'Kajoran' },
  { slug: 'karangtalun',    label: 'Karangtalun' },
  { slug: 'selingan',       label: 'Selingan' },
]

// ─── Component ───────────────────────────────────────────────────────────────
export default function Beranda() {
  return (
    <div className="beranda">
      {/* SEO Meta Tags */}
      <SEO 
        title="Beranda"
        description="Portal resmi Pemerintahan Desa Karangtalun, Kabupaten Magelang. Informasi pelayanan publik, profil wilayah, dan potensi dusun."
        image="/assets/hero-desa.jpg"
      />

      {/* ── Hero ── */}
      <section className="hero" aria-label="Sambutan">
        <div className="hero__bg" aria-hidden="true" />
        <div className="container hero__content">
          <div className="hero__badge">
            <span>🌿</span> Desa Karangtalun
          </div>
          <h1 className="hero__title">
            Selamat Datang di<br />
            <span className="hero__title-accent">Desa Karangtalun</span>
          </h1>
          <p className="hero__subtitle">
            Website resmi Desa Karangtalun — menyajikan profil desa,
            potensi 12 dusun, dan informasi layanan publik secara transparan.
          </p>
          <div className="hero__actions">
            <Link to="/profil-desa/overview" className="btn btn--primary" id="hero-cta-profil">
              Profil Desa
            </Link>
            <Link to="/profil-desa/dusun/jampiroso" className="btn btn--outline" id="hero-cta-dusun">
              Profil Dusun
            </Link>
          </div>
        </div>
        <div className="hero__image-wrap" aria-hidden="true">
          <img
            src="/assets/hero-desa.jpg"
            alt="Pemandangan Desa Karangtalun"
            className="hero__image"
            loading="eager"
          />
          <div className="hero__image-overlay" />
        </div>
      </section>

      {/* ── Statistik Kilat ── */}
      <section className="stats" aria-label="Statistik desa">
        <div className="container stats__grid">
          {STATS.map((s) => (
            <div key={s.label} className="stats__card">
              <span className="stats__icon" aria-hidden="true">{s.icon}</span>
              <strong className="stats__value">{s.value}</strong>
              <span className="stats__label">{s.label}</span>
              {s.note && <span className="stats__note">{s.note}</span>}
            </div>
          ))}
        </div>
      </section>

      {/* ── Tentang Desa ── */}
      <section className="about section" aria-label="Tentang Desa Karangtalun">
        <div className="container about__inner">
          <div className="about__text">
            <span className="section-label">Tentang Kami</span>
            <h2 className="about__title">Mengenal Desa Karangtalun</h2>
            <p className="about__body">
              Desa Karangtalun merupakan salah satu desa yang terletak di
              Kabupaten Magelang, Jawa Tengah. Desa ini terdiri dari 12 dusun
              yang masing-masing memiliki potensi dan keunikan tersendiri.
            </p>
            <p className="about__body">
              Dengan kekayaan alam dan budaya yang dimiliki, Desa Karangtalun
              terus berbenah untuk mewujudkan desa yang mandiri, transparan,
              dan sejahtera bagi seluruh warganya.
            </p>
            <Link to="/profil-desa/overview" className="btn btn--primary about__cta" id="about-cta-selengkapnya">
              Selengkapnya →
            </Link>
          </div>
          <div className="about__visual">
            <img
              src="/assets/hero-desa.jpg"
              alt="Hamparan sawah di Desa Karangtalun"
              className="about__img"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── Layanan ── */}
      <section className="layanan section section--gray" aria-label="Layanan informasi desa">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Jelajahi</span>
            <h2 className="section-title">Layanan Informasi</h2>
            <p className="section-desc">
              Temukan berbagai informasi tentang Desa Karangtalun di sini.
            </p>
          </div>
          <div className="layanan__grid">
            {LAYANAN.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className={`layanan__card layanan__card--${item.color}`}
                id={`layanan-${item.id}`}
              >
                <span className="layanan__icon" aria-hidden="true">{item.icon}</span>
                <h3 className="layanan__title">{item.title}</h3>
                <p className="layanan__desc">{item.desc}</p>
                <span className="layanan__arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
                  <span className="dusun__leaf" aria-hidden="true">🌿</span>
                  <span className="dusun__name">Dusun {d.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  )
}
