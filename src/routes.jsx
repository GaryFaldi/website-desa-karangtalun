/**
 * routes.jsx — Definisi semua route dalam format data router (PRD §3)
 *
 * vite-react-ssg menggunakan react-router-dom createBrowserRouter secara internal,
 * bukan <BrowserRouter>/<Routes>. Route didefinisikan sebagai array objek, bukan JSX.
 *
 * Cara menambah halaman baru:
 * 1. Import komponen halaman di atas
 * 2. Tambah objek { path, element } ke dalam array children di bawah
 */

import Layout from './components/layout/Layout'
import Beranda from './pages/Beranda'
import Overview from './pages/profil-desa/Overview'
import Dusun from './pages/profil-desa/Dusun'
import PetaInteraktif from './pages/peta-lokasi/PetaInteraktif'

// Placeholder sementara — ganti dengan import halaman nyata satu per satu
function Placeholder({ title }) {
  return (
    <div style={{
      padding: 'var(--spacing-section) var(--spacing-lg)',
      maxWidth: 'var(--layout-max-width)',
      margin: '0 auto',
    }}>
      <h1 style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-md)' }}>
        {title}
      </h1>
      <p style={{ color: 'var(--color-text-muted)' }}>
        Halaman ini sedang dalam pengembangan.
      </p>
    </div>
  )
}

export const routes = [
  {
    // Layout membungkus semua halaman (Navigation + main + Footer)
    element: <Layout />,
    children: [

      // Beranda
      { index: true, element: <Beranda /> },

      // Profil Desa
      { path: '/profil-desa/overview',    element: <Overview /> },
      { path: '/profil-desa/dusun/:slug', element: <Dusun /> },

      // Pemerintahan
      { path: '/pemerintahan/struktur-organisasi', element: <StrukturOrganisasi /> },
      { path: '/pemerintahan/statistik-desa',      element: <Placeholder title="Statistik Kependudukan Desa" /> },
      { path: '/pemerintahan/statistik-dusun',     element: <Placeholder title="Statistik Kependudukan Dusun" /> },

      // Potensi & Wisata
      { path: '/potensi-wisata/peta-wisata-kuliner', element: <Placeholder title="Peta Wisata & Kuliner" /> },
      { path: '/potensi-wisata/umkm/:slug',           element: <Placeholder title="UMKM Dusun" /> },

      // Galeri
      { path: '/galeri/kegiatan-desa',  element: <Placeholder title="Galeri Kegiatan Desa" /> },
      { path: '/galeri/dusun/:slug',    element: <Placeholder title="Dokumentasi Dusun" /> },

      // Peta Lokasi
      { path: '/peta-lokasi/peta-interaktif', element: <PetaInteraktif /> },
      { path: '/peta-lokasi/fasilitas-umum',  element: <Placeholder title="Fasilitas Umum" /> },

    ],
  },
]
