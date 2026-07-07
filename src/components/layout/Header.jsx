import './Header.css'

/**
 * Header — Komponen judul halaman yang reusable.
 * Dipakai di dalam halaman individual untuk menampilkan judul + subtitle.
 *
 * Props:
 * - title (string) — judul utama halaman, wajib
 * - subtitle (string) — teks deskripsi di bawah judul, opsional
 * - centered (bool) — pusatkan teks, default false
 * - green (bool) — pakai latar belakang hijau muda, default false
 */
export default function Header({ title, subtitle, centered = false, green = false }) {
  return (
    <header
      className={[
        'page-header',
        centered ? 'page-header--centered' : '',
        green ? 'page-header--green' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="container page-header__inner">
        <h1 className="page-header__title">{title}</h1>
        {subtitle && (
          <p className="page-header__subtitle">{subtitle}</p>
        )}
      </div>
    </header>
  )
}
