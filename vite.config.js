import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// Daftar slug dusun sesuai PRD §3 — jangan ubah tanpa update data di src/data/dusun/
const DUSUN_SLUGS = [
  'dangkel-kulon', 'dangkel-wetan', 'jambon',
  'jampiroso', 'jangkang-a', 'jangkang-b',
  'joho', 'kajoran', 'karangtalun', 'selingan',
]

export default defineConfig({
  plugins: [react(), cloudflare()],

  // Paksa satu instance react-helmet-async agar HelmetProvider (SSG) dan
  // Helmet (seo.jsx) berbagi context yang sama saat SSG build.
  resolve: {
    dedupe: ['react-helmet-async', 'react', 'react-dom'],
  },

  // Konfigurasi vite-react-ssg (PRD §7)
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    // Daftarkan semua route dinamis agar di-generate jadi HTML statis saat build
    includedRoutes(paths) {
      return [
        ...paths,
        ...DUSUN_SLUGS.map(slug => `/profil-desa/dusun/${slug}`),
      ]
    },
  },
})