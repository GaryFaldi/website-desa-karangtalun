/**
 * Data Dummy Fasilitas Umum Desa Karangtalun
 * 
 * File ini berisi data contoh fasilitas umum untuk ditampilkan di halaman
 * /peta-lokasi/fasilitas-umum
 * 
 * NOTE: Ini adalah data DUMMY/PLACEHOLDER
 * Data riil akan berasal dari src/data/generated/fasilitas.json
 * (hasil fetch dari Google Sheets via scripts/fetch-sheets.js)
 * 
 * Struktur data mengikuti PRD §6.2:
 * - nama: string
 * - kategori: 'sekolah' | 'tempat-ibadah' | 'fasilitas-umum'
 * - dusun: slug dusun
 * - alamat: string
 * - latitude: number (untuk Google Maps link)
 * - longitude: number (untuk Google Maps link)
 * - foto: string (path ke foto fasilitas)
 */

export const fasilitasDummy = [
  // ─── Sekolah ──────────────────────────────────────────────────────────────
  {
    id: 1,
    nama: 'SD Negeri 1 Karangtalun',
    kategori: 'sekolah',
    dusun: 'karangtalun',
    dusunLabel: 'Karangtalun',
    alamat: 'Jl. Raya Karangtalun No. 12',
    latitude: -7.5231,
    longitude: 110.2176,
    foto: '/assets/hero-desa.jpg', // Placeholder - ganti dengan foto riil
  },
  {
    id: 2,
    nama: 'SD Negeri 2 Karangtalun',
    kategori: 'sekolah',
    dusun: 'jampiroso',
    dusunLabel: 'Jampiroso',
    alamat: 'Jl. Pendidikan Jampiroso',
    latitude: -7.5245,
    longitude: 110.2189,
    foto: '/assets/hero-desa.jpg',
  },
  {
    id: 3,
    nama: 'PAUD Tunas Harapan',
    kategori: 'sekolah',
    dusun: 'dangkel-kulon',
    dusunLabel: 'Dangkel Kulon',
    alamat: 'Dusun Dangkel Kulon RT 02/RW 01',
    latitude: -7.5198,
    longitude: 110.2145,
    foto: '/assets/hero-desa.jpg',
  },

  // ─── Tempat Ibadah ────────────────────────────────────────────────────────
  {
    id: 4,
    nama: 'Masjid Al-Ikhlas',
    kategori: 'tempat-ibadah',
    dusun: 'jampiroso',
    dusunLabel: 'Jampiroso',
    alamat: 'Jl. Masjid Jampiroso',
    latitude: -7.5250,
    longitude: 110.2192,
    foto: '/assets/hero-desa.jpg',
  },
  {
    id: 5,
    nama: 'Masjid Nurul Huda',
    kategori: 'tempat-ibadah',
    dusun: 'baran',
    dusunLabel: 'Baran',
    alamat: 'Dusun Baran RT 03/RW 02',
    latitude: -7.5210,
    longitude: 110.2160,
    foto: '/assets/hero-desa.jpg',
  },
  {
    id: 6,
    nama: 'Mushola Al-Falah',
    kategori: 'tempat-ibadah',
    dusun: 'joho',
    dusunLabel: 'Joho',
    alamat: 'Dusun Joho RT 01/RW 01',
    latitude: -7.5270,
    longitude: 110.2210,
    foto: '/assets/hero-desa.jpg',
  },
  {
    id: 7,
    nama: 'Gereja Santo Yusuf',
    kategori: 'tempat-ibadah',
    dusun: 'kajoran',
    dusunLabel: 'Kajoran',
    alamat: 'Jl. Gereja Kajoran',
    latitude: -7.5190,
    longitude: 110.2130,
    foto: '/assets/hero-desa.jpg',
  },

  // ─── Fasilitas Umum ───────────────────────────────────────────────────────
  {
    id: 8,
    nama: 'Balai Desa Karangtalun',
    kategori: 'fasilitas-umum',
    dusun: 'karangtalun',
    dusunLabel: 'Karangtalun',
    alamat: 'Jl. Raya Karangtalun No. 1',
    latitude: -7.5225,
    longitude: 110.2170,
    foto: '/assets/hero-desa.jpg',
  },
  {
    id: 9,
    nama: 'Puskesmas Pembantu Karangtalun',
    kategori: 'fasilitas-umum',
    dusun: 'jampiroso',
    dusunLabel: 'Jampiroso',
    alamat: 'Jl. Kesehatan Jampiroso',
    latitude: -7.5248,
    longitude: 110.2195,
    foto: '/assets/hero-desa.jpg',
  },
  {
    id: 10,
    nama: 'Posyandu Melati 1',
    kategori: 'fasilitas-umum',
    dusun: 'dangkel-wetan',
    dusunLabel: 'Dangkel Wetan',
    alamat: 'Dusun Dangkel Wetan RT 01/RW 03',
    latitude: -7.5205,
    longitude: 110.2185,
    foto: '/assets/hero-desa.jpg',
  },
  {
    id: 11,
    nama: 'Posyandu Melati 2',
    kategori: 'fasilitas-umum',
    dusun: 'jambon',
    dusunLabel: 'Jambon',
    alamat: 'Dusun Jambon RT 02/RW 01',
    latitude: -7.5260,
    longitude: 110.2200,
    foto: '/assets/hero-desa.jpg',
  },
  {
    id: 12,
    nama: 'Lapangan Olahraga Desa',
    kategori: 'fasilitas-umum',
    dusun: 'karangtalun',
    dusunLabel: 'Karangtalun',
    alamat: 'Jl. Olahraga Karangtalun',
    latitude: -7.5235,
    longitude: 110.2180,
    foto: '/assets/hero-desa.jpg',
  },
]

// Helper: Generate Google Maps URL
export const getGoogleMapsUrl = (lat, lng, placeName) => {
  // Format: https://www.google.com/maps/search/?api=1&query=lat,lng
  // Atau dengan place name: https://www.google.com/maps/search/?api=1&query=PlaceName
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
}

// Helper: Kategori Label Mapping
export const kategoriLabels = {
  'sekolah': {
    label: 'Pendidikan',
    icon: '🏫',
    color: 'blue',
  },
  'tempat-ibadah': {
    label: 'Tempat Ibadah',
    icon: '🕌',
    color: 'teal',
  },
  'fasilitas-umum': {
    label: 'Fasilitas Umum',
    icon: '🏛️',
    color: 'green',
  },
}

// Helper: Filter by kategori
export const filterByKategori = (kategori) => {
  if (!kategori || kategori === 'semua') return fasilitasDummy
  return fasilitasDummy.filter(f => f.kategori === kategori)
}

// Helper: Count by kategori
export const countByKategori = () => {
  return {
    sekolah: fasilitasDummy.filter(f => f.kategori === 'sekolah').length,
    'tempat-ibadah': fasilitasDummy.filter(f => f.kategori === 'tempat-ibadah').length,
    'fasilitas-umum': fasilitasDummy.filter(f => f.kategori === 'fasilitas-umum').length,
    total: fasilitasDummy.length,
  }
}
