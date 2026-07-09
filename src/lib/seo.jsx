import { Helmet } from 'react-helmet-async'

/**
 * Komponen SEO Helper untuk Website Desa Karangtalun
 * 
 * Menghasilkan meta tags untuk SEO dan social media preview (OpenGraph, Twitter Card)
 * yang ter-render secara statis di HTML saat build SSG.
 * 
 * Menggunakan react-helmet-async yang sudah terintegrasi dengan vite-react-ssg.
 * 
 * @component
 * @param {Object} props
 * @param {string} [props.title] - Judul halaman (akan ditambahkan suffix " — Desa Karangtalun")
 * @param {string} [props.description] - Deskripsi meta tag untuk halaman
 * @param {string} [props.image] - URL gambar untuk OpenGraph preview (absolut atau relatif)
 * @param {string} [props.url] - URL canonical untuk halaman (opsional)
 * @param {string} [props.type='website'] - Tipe OpenGraph (website, article, profile, dll)
 * 
 * @example
 * <SEO 
 *   title="Beranda" 
 *   description="Portal resmi Desa Karangtalun"
 *   image="/assets/hero-desa.jpg"
 * />
 */
export default function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
}) {
  // ─── Default Fallback Values ─────────────────────────────────────────────
  const DEFAULT_TITLE = 'Website Resmi Desa Karangtalun'
  const DEFAULT_DESCRIPTION = 'Portal resmi Pemerintahan Desa Karangtalun, Kabupaten Magelang, Jawa Tengah. Informasi pelayanan publik, profil wilayah, potensi 12 dusun, dan transparansi pemerintahan desa.'
  const DEFAULT_IMAGE = '/assets/hero-desa.jpg'
  const SITE_NAME = 'Desa Karangtalun'

  // ─── Computed Values ──────────────────────────────────────────────────────
  const pageTitle = title 
    ? `${title} — ${SITE_NAME}` 
    : DEFAULT_TITLE

  const pageDescription = description || DEFAULT_DESCRIPTION
  
  // Pastikan image URL absolut untuk OpenGraph (jika relatif, tambahkan domain di production)
  const pageImage = image || DEFAULT_IMAGE
  const absoluteImage = pageImage.startsWith('http') 
    ? pageImage 
    : `${import.meta.env.VITE_SITE_URL || ''}${pageImage}`

  const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  return (
    <Head>
      {/* ── Basic Meta Tags ── */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      {/* ── Open Graph (Facebook, WhatsApp, LinkedIn) ── */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={absoluteImage} />
      {pageUrl && <meta property="og:url" content={pageUrl} />}

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* ── Canonical URL (opsional) ── */}
      {pageUrl && <link rel="canonical" href={pageUrl} />}
    </Head>
  )
}
