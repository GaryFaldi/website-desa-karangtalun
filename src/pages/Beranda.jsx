import { Link } from 'react-router-dom'
import SEO from '../lib/seo'
import './Beranda.css'


const iconImages = import.meta.glob('../assets/icons/*.{png,jpg,jpeg,svg}', { eager: true })

const IMAGE_ICONS = Object.fromEntries(
  Object.entries(iconImages).map(([path, mod]) => {
    // Ekstrak nama file tanpa ekstensi — tanpa regex agar tidak ada masalah escaping
    const lastSlash = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'))
    const lastDot   = path.lastIndexOf('.')
    const fileName  = path.substring(lastSlash + 1, lastDot > lastSlash ? lastDot : undefined)
    return [fileName, mod.default]
  })
)



const ICON_PATHS = {
  buildings: (
    <>
      <path d="M4 21V8l6-4v17" />
      <path d="M10 21V4l10 5v12" />
      <path d="M7 12h0M7 16h0M14 10h0M14 14h0M14 18h0" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  landmark: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V10M10 21V10M14 21V10M19 21V10" />
      <path d="M2 10 12 4l10 6" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="1.5" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 11h6M9 15h6" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c-9 0-16 6-16 15 9 0 15-7 16-15Z" />
      <path d="M5 19c3-4 6-7 12-11" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
}

function Icon({ name, className }) {
  const image = IMAGE_ICONS[name]
  if (image) {
    return <img src={image} className={className} alt="" aria-hidden="true" />
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  )
}

// ─── Data Placeholder ────────────────────────────────────────────────────────
// Ganti dengan data real dari src/data/static/desa.js saat konten tersedia

const STATS = [
  { icon: 'users-alt', value: '4.178', label: 'Jiwa',            note: 'Indeks Desa 2025' },
  { icon: 'family',    value: '1.451', label: 'Kepala Keluarga', note: 'Indeks Desa 2025' },
  { icon: 'house',     value: '10',    label: 'Dusun',           note: '' },
  { icon: 'land-plot', value: '—',      label: 'Luas Wilayah',    note: 'segera diperbarui' },
]

const LAYANAN = [
  {
    id: 'profil-desa',
    icon: 'landmark',
    title: 'Profil Desa',
    desc: 'Sejarah, visi-misi, letak geografis, dan kontak resmi Desa Karangtalun.',
    href: '/profil-desa/overview',
    color: 'green',
  },
  {
    id: 'pemerintahan',
    icon: 'clipboard',
    title: 'Pemerintahan',
    desc: 'Struktur organisasi perangkat desa dan data statistik kependudukan.',
    href: '/pemerintahan/struktur-organisasi',
    color: 'blue',
  },
  {
    id: 'wisata',
    icon: 'leaf',
    title: 'Potensi Desa',
    desc: 'Potensi unggulan, UMKM, dan kuliner lokal desa.',
    href: '/potensi-desa/overview',
    color: 'teal',
  },
  {
    id: 'galeri',
    icon: 'camera',
    title: 'Galeri',
    desc: 'Dokumentasi kegiatan dan momen penting tingkat desa.',
    href: '/galeri/overview',
    color: 'amber',
  },
  {
    id: 'peta',
    icon: 'mapPin',
    title: 'Peta Lokasi',
    desc: 'Peta interaktif fasilitas umum, sekolah, dan tempat ibadah.',
    href: '/peta-lokasi/peta-interaktif',
    color: 'rose',
  },
]

export const DUSUN_SLUGS = [
  { slug: 'dangkel-kulon',  label: 'Dangkel Kulon' },
  { slug: 'dangkel-wetan',  label: 'Dangkel Wetan' },
  { slug: 'jambon',         label: 'Jambon' },
  { slug: 'jampiroso',      label: 'Jampiroso' },
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

        <img
          src="/assets/hero-desa.jpg"
          alt="Pemandangan Desa Karangtalun"
          className="hero__image"
          loading="eager"
        />

        <div className="hero__overlay" aria-hidden="true"></div>

        <div className="container hero__content">
          <h1 className="hero__title">
            Selamat Datang di
            <br />
            <span className="hero__title-accent">Desa Karangtalun</span>
          </h1>

          <p className="hero__subtitle">
            Website resmi Desa Karangtalun yang menyajikan profil desa,
            potensi 10 dusun, serta layanan publik secara transparan dan
            mudah diakses masyarakat.
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

      </section>

      {/* ── Statistik Kilat ── */}
      <section className="stats" aria-label="Statistik desa">
        <div className="container stats__grid">
          {STATS.map((s) => (
            <div key={s.label} className="stats__card">
              <Icon name={s.icon} className="stats__icon" />
              <div className="stats__body">
                <strong className="stats__value">{s.value}</strong>
                <span className="stats__label">{s.label}</span>
                {s.note && <span className="stats__note">{s.note}</span>}
              </div>
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
              Kabupaten Magelang, Jawa Tengah. Desa ini terdiri dari 10 dusun
              yang masing-masing memiliki potensi dan keunikan tersendiri.
            </p>
            <p className="about__body">
              Dengan kekayaan alam dan budaya yang dimiliki, Desa Karangtalun
              terus berbenah untuk mewujudkan desa yang mandiri, transparan,
              dan sejahtera bagi seluruh warganya.
            </p>
            <Link to="/profil-desa/overview" className="btn btn--primary about__cta" id="about-cta-selengkapnya">
              Selengkapnya
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
                <Icon name={item.icon} className="layanan__icon" />
                <h3 className="layanan__title">{item.title}</h3>
                <p className="layanan__desc">{item.desc}</p>
                <span className="layanan__arrow" aria-hidden="true">Lihat detail →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Profil Dusun ── */}
      <section className="dusun section" aria-label="Daftar dusun">
        <div className="container">
          <div className="section-header">
            <span className="section-label">10 Dusun</span>
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
  )
}
