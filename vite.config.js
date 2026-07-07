import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Daftar slug dusun sesuai PRD §3 — jangan ubah tanpa update data di src/data/dusun/
const DUSUN_SLUGS = [
  'baran', 'dangkel-kulon', 'dangkel-wetan', 'jambon',
  'jampiroso', 'jangkang', 'jangkang-a', 'jangkang-b',
  'joho', 'kajoran', 'karangtalun', 'selingan',
]

export default defineConfig({
  plugins: [react()],

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
