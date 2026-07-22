import { Helmet } from 'react-helmet-async'

/**
 * Komponen SEO Helper untuk Website Desa Karangtalun
 * 
 * Menghasilkan meta tags untuk SEO, social media preview (OpenGraph, Twitter Card),
 * serta Schema.org JSON-LD Structured Data untuk Google Rich Snippet.
 * 
 * @component
 * @param {Object} props
 * @param {string} [props.title] - Judul halaman (akan ditambahkan suffix " — Desa Karangtalun")
 * @param {string} [props.description] - Deskripsi meta tag untuk halaman
 * @param {string} [props.image] - URL gambar untuk OpenGraph preview (absolut atau relatif)
 * @param {string} [props.url] - URL canonical untuk halaman (opsional)
 * @param {string} [props.type='website'] - Tipe OpenGraph (website, article, profile, dll)
 */
export default function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
}) {
  // ─── Default Fallback Values ─────────────────────────────────────────────
  const BASE_URL = import.meta.env.VITE_SITE_URL || 'https://karangtalun.my.id'
  const DEFAULT_TITLE = 'Website Resmi Desa Karangtalun'
  const DEFAULT_DESCRIPTION = 'Portal resmi Pemerintahan Desa Karangtalun, Kabupaten Magelang, Jawa Tengah. Informasi pelayanan publik, profil wilayah, potensi 10 dusun, dan transparansi pemerintahan desa.'
  const DEFAULT_IMAGE = '/assets/hero-desa.jpg'
  const SITE_NAME = 'Desa Karangtalun'

  // ─── Computed Values ──────────────────────────────────────────────────────
  const pageTitle = title 
    ? `${title} — ${SITE_NAME}` 
    : DEFAULT_TITLE

  const pageDescription = description || DEFAULT_DESCRIPTION
  
  // Pastikan image URL absolut untuk OpenGraph
  const pageImage = image || DEFAULT_IMAGE
  const absoluteImage = pageImage.startsWith('http') 
    ? pageImage 
    : `${BASE_URL}${pageImage.startsWith('/') ? '' : '/'}${pageImage}`

  const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : BASE_URL)

  // ─── Schema.org Structured Data (JSON-LD) ────────────────────────────────
  const schemaOrgJSONLD = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: 'Pemerintahan Desa Karangtalun',
    alternateName: 'Desa Karangtalun',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    image: absoluteImage,
    description: pageDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Ngluwar-Tamanagung, Karangtalun',
      addressLocality: 'Ngluwar',
      addressRegion: 'Kabupaten Magelang',
      postalCode: '56485',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -7.6517,
      longitude: 110.2718,
    },
    telePhone: '+628123456789',
    email: 'pemdes@karangtalun.my.id',
  }

  return (
    <Helmet>
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

      {/* ── Canonical URL ── */}
      {pageUrl && <link rel="canonical" href={pageUrl} />}

      {/* ── Schema.org JSON-LD Structured Data ── */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  )
}
