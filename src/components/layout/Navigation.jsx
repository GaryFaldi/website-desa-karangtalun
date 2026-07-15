import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import './Navigation.css'

// ─── Struktur navigasi sesuai peta situs PRD §3 ──────────────────────────────
const NAV_ITEMS = [
  {
    label: 'Beranda',
    href: '/',
  },
  {
    label: 'Profil Desa', href: '/profil-desa/overview'
  },
  {
    label: 'Pemerintahan',
    children: [
      { label: 'Struktur Organisasi', href: '/pemerintahan/struktur-organisasi' },
      { label: 'Statistik Desa',      href: '/pemerintahan/statistik-desa' },
      { label: 'Statistik Dusun',     href: '/pemerintahan/statistik-dusun' },
    ],
  },
  {
    label: 'Potensi & Wisata',
    children: [
      { label: 'Peta Wisata & Kuliner', href: '/potensi-wisata/peta-wisata-kuliner' },
      { label: 'UMKM',           href: '/potensi-wisata/umkm/jampiroso' },
    ],
  },
  {
    label: 'Galeri',
    children: [
      { label: 'Kegiatan Desa',    href: '/galeri/kegiatan-desa' },
      { label: 'Dokumentasi', href: '/galeri/dusun/jampiroso' },
    ],
  },
  {
    label: 'Peta Lokasi',
    children: [
      { label: 'Peta Interaktif', href: '/peta-lokasi/peta-interaktif' },
      { label: 'Fasilitas Umum',  href: '/peta-lokasi/fasilitas-umum' },
    ],
  },
]

export default function Navigation() {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [scrolled, setScrolled]       = useState(false)
  const navRef = useRef(null)
  const location = useLocation()

  // Tutup mobile menu saat berpindah halaman
  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  // Tambah shadow saat scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Tutup dropdown saat klik di luar navbar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleDropdown = (label) =>
    setOpenDropdown(prev => (prev === label ? null : label))

  return (
    <nav
      ref={navRef}
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      aria-label="Navigasi utama"
    >
      <div className="container navbar__inner">

        {/* ── Logo ── */}
        <Link to="/" className="navbar__logo" aria-label="Kembali ke Beranda">
          <span className="navbar__logo-icon" aria-hidden="true">🌿</span>
          <span className="navbar__logo-text">
            Desa <strong>Karangtalun</strong>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <ul className="navbar__menu" role="list">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              // Item dengan dropdown
              <li
                key={item.label}
                className={`navbar__item navbar__item--dropdown ${
                  openDropdown === item.label ? 'navbar__item--open' : ''
                }`}
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="navbar__link navbar__link--parent"
                  aria-expanded={openDropdown === item.label}
                  aria-haspopup="true"
                  onClick={() => toggleDropdown(item.label)}
                  id={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {item.label}
                  <span className="navbar__chevron" aria-hidden="true">▾</span>
                </button>

                <ul
                  className="navbar__dropdown"
                  role="list"
                  aria-labelledby={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <NavLink
                        to={child.href}
                        className={({ isActive }) =>
                          `navbar__dropdown-link ${isActive ? 'navbar__dropdown-link--active' : ''}`
                        }
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              // Item tanpa dropdown
              <li key={item.label} className="navbar__item">
                <NavLink
                  to={item.href}
                  end
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )
          )}
        </ul>

        {/* ── Hamburger (mobile) ── */}
        <button
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen(prev => !prev)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        id="mobile-menu"
        className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <ul role="list" className="navbar__mobile-list">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <li key={item.label}>
                <button
                  className={`navbar__mobile-parent ${
                    openDropdown === item.label ? 'navbar__mobile-parent--open' : ''
                  }`}
                  onClick={() => toggleDropdown(item.label)}
                  aria-expanded={openDropdown === item.label}
                >
                  {item.label}
                  <span className="navbar__chevron" aria-hidden="true">▾</span>
                </button>
                {openDropdown === item.label && (
                  <ul className="navbar__mobile-sub" role="list">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <NavLink
                          to={child.href}
                          className={({ isActive }) =>
                            `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
                          }
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={item.label}>
                <NavLink
                  to={item.href}
                  end
                  className={({ isActive }) =>
                    `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  )
}
