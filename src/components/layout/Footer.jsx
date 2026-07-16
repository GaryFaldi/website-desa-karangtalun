import { Link } from 'react-router-dom'
import './Footer.css'

const FOOTER_LINKS = [
  {
    heading: 'Profil Desa',
    links: [
      { label: 'Overview Desa',        href: '/profil-desa/overview' },
      { label: 'Struktur Organisasi',  href: '/pemerintahan/struktur-organisasi' },
      { label: 'Statistik Desa',       href: '/pemerintahan/statistik-desa' },
    ],
  },
  {
    heading: 'Potensi Desa',
    links: [
      { label: 'Overview Potensi',      href: '/potensi-desa/overview' },
      { label: 'Galeri Desa',           href: '/galeri/overview' },
      { label: 'Peta Interaktif',       href: '/peta-lokasi/peta-interaktif' },
      { label: 'Fasilitas Umum',        href: '/peta-lokasi/fasilitas-umum' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" aria-label="Footer situs">
      <div className="container footer__inner">

        {/* ── Kolom 1: Identitas Desa ── */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span aria-hidden="true">🌿</span>
            <span>Desa <strong>Karangtalun</strong></span>
          </div>
          <p className="footer__desc">
            Website resmi Desa Karangtalun — menyajikan informasi profil desa,
            potensi dusun, dan layanan publik secara transparan.
          </p>
          <address className="footer__address">
            <p>📍 Desa Karangtalun, Kab. Magelang</p>
            <p>🕐 Senin–Jumat, 08.00–15.00 WIB</p>
          </address>
        </div>

        {/* ── Kolom 2 & 3: Link navigasi ── */}
        {FOOTER_LINKS.map((col) => (
          <nav key={col.heading} aria-label={`Navigasi ${col.heading}`}>
            <h3 className="footer__heading">{col.heading}</h3>
            <ul className="footer__links" role="list">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>
            &copy; {year} Desa Karangtalun. Dibuat oleh tim KKN.
          </p>
          <p>
            Dibangun dengan{' '}
            <a
              href="https://vite.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__bottom-link"
            >
              Vite
            </a>{' '}
            &{' '}
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__bottom-link"
            >
              React
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
