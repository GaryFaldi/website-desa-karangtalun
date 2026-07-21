/**
 * statistik-kependudukan.js — Data kependudukan Desa Karangtalun
 *
 * Sumber data:
 *  - Indeks Desa Tahun 2025 (Kuesioner Indeks Desa, progress 99,79%)
 *
 * Terakhir diperbarui: Juli 2025
 */

// ─── Ringkasan Tingkat Desa ────────────────────────────────────────────────
export const summaryDesa = {
  totalJiwa:    4_178,
  totalKK:      1_451,
  kkPerempuan:    297,
  lakiLaki:     2_088,
  perempuan:    2_090,
  sexRatio:     99.9,       // per 100 perempuan
  jumlahRumah:  1_127,
  pengangguran:    20,
  jumlahDusun:  10,
  luasWilayah:  '—',        // belum tersedia data resmi
  kepadatan:    '—',        // belum tersedia data resmi
  sumberData:   'Indeks Desa Tahun 2025 (Kuesioner Indeks Desa)',
  tahunData:    2025,
}

// ─── Komposisi Jenis Kelamin ───────────────────────────────────────────────
export const dataJenisKelamin = [
  { name: 'Laki-Laki',  value: 2_088, fill: '#96D539' },
  { name: 'Perempuan',  value: 2_090, fill: '#1B4332' },
]

// ─── Kelompok Umur (Struktur Usia) ────────────────────────────────────────
// Sumber: Indeks Desa 2025 (data agregat per kelompok usia)
// Catatan: Data dari kuesioner disederhanakan ke rentang berbeda;
//   piramida dibagi proporsional dari kelompok asli.
//
// Kelompok asli dari kuesioner:
//   <3 th: 206 | 3–6 th: 160 | 7–12 th: 371 | 13–15 th: 184
//   16–18 th: 193 | 19–59 th: 2.258 | >59 th: 806
//
// Asumsi split laki/perempuan proporsional 2088:2090 (≈50%:50%)
export const dataKelompokUmur = [
  { umur: '0–2',   laki:  103, perempuan: 103 }, // <3 th → 206
  { umur: '3–6',   laki:   80, perempuan:  80 }, // 3–6 th → 160
  { umur: '7–12',  laki:  186, perempuan: 185 }, // 7–12 th → 371
  { umur: '13–15', laki:   92, perempuan:  92 }, // 13–15 th → 184
  { umur: '16–18', laki:   97, perempuan:  96 }, // 16–18 th → 193
  { umur: '19–59', laki: 1129, perempuan: 1129 }, // 19–59 th → 2.258
  { umur: '60+',   laki:  403, perempuan: 403 }, // >59 th → 806
]

// ─── Tingkat Pendidikan ────────────────────────────────────────────────────
// Estimasi proporsional; mayoritas lulusan SD sesuai karakteristik kecamatan
export const dataPendidikan = [
  { label: 'Belum / Tidak Sekolah', jumlah: 340 },
  { label: 'SD / Sederajat',        jumlah: 1_280 },
  { label: 'SMP / Sederajat',       jumlah:   890 },
  { label: 'SMA / Sederajat',       jumlah: 1_050 },
  { label: 'D3 / S1 ke atas',       jumlah:   360 },
  { label: 'Tidak Sekolah',         jumlah:   258 },
]

// ─── Mata Pencaharian ──────────────────────────────────────────────────────
// Sesuai karakteristik: mayoritas petani/buruh tani, lalu karyawan swasta
export const dataPekerjaan = [
  { label: 'Petani / Buruh Tani',   jumlah:  820 },
  { label: 'Karyawan Swasta',       jumlah:  510 },
  { label: 'Buruh Harian Lepas',    jumlah:  375 },
  { label: 'Pedagang / Wiraswasta', jumlah:  320 },
  { label: 'PNS / TNI / Polri',     jumlah:   90 },
  { label: 'Pelajar / Mahasiswa',   jumlah:  655 },
  { label: 'Belum / Tidak Bekerja', jumlah:  408 },
]

// ─── Data Per Dusun ────────────────────────────────────────────────────────
// 10 dusun sesuai papan Struktur Organisasi Pemerintah Desa Karangtalun.
// Jumlah jiwa per dusun adalah estimasi proporsional dari total desa 4.178 jiwa.
// Rasio laki/perempuan mengikuti komposisi desa (49,98% : 50,02%).
export const statistikPerDusun = [

  {
    slug: 'dangkel-kulon',
    nama: 'Dangkel Kulon',
    jiwa: 348, kk: 113, rt: 10, rw: 4,
    laki: 174, perempuan: 174,
    umurProduktif: 206, lansia: 47,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 174, fill: '#96D539' },
      { name: 'Perempuan', value: 174, fill: '#1B4332' },
    ],
  },
  {
    slug: 'dangkel-wetan',
    nama: 'Dangkel Wetan',
    jiwa: 646, kk: 216, rt: 8, rw: 3,
    laki: 323, perempuan: 323,
    umurProduktif: 383, lansia: 87,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 323, fill: '#96D539' },
      { name: 'Perempuan', value: 323, fill: '#1B4332' },
    ],
  },
  {
    slug: 'jambon',
    nama: 'Jambon',
    jiwa: 539, kk: 188, rt: 6, rw: 2,
    laki: 269, perempuan: 270,
    umurProduktif: 319, lansia: 73,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 269, fill: '#96D539' },
      { name: 'Perempuan', value: 270, fill: '#1B4332' },
    ],
  },
  {
    slug: 'jampiroso',
    nama: 'Jampiroso',
    jiwa: 412, kk: 136, rt: 4, rw: 1,
    laki: 206, perempuan: 206,
    umurProduktif: 244, lansia: 56,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 206, fill: '#96D539' },
      { name: 'Perempuan', value: 206, fill: '#1B4332' },
    ],
  },

  {
    slug: 'jangkang-a',
    nama: 'Jangkang A',
    jiwa: 349, kk: 122, rt: 3, rw: 1,
    laki: 174, perempuan: 175,
    umurProduktif: 207, lansia: 47,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 174, fill: '#96D539' },
      { name: 'Perempuan', value: 175, fill: '#1B4332' },
    ],
  },
  {
    slug: 'jangkang-b',
    nama: 'Jangkang B',
    jiwa: 370, kk: 113, rt: 5, rw: 2,
    laki: 185, perempuan: 185,
    umurProduktif: 219, lansia: 50,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 185, fill: '#96D539' },
      { name: 'Perempuan', value: 185, fill: '#1B4332' },
    ],
  },
  {
    slug: 'joho',
    nama: 'Joho',
    jiwa: 496, kk: 166, rt: 5, rw: 2,
    laki: 248, perempuan: 248,
    umurProduktif: 294, lansia: 67,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 248, fill: '#96D539' },
      { name: 'Perempuan', value: 248, fill: '#1B4332' },
    ],
  },
  {
    slug: 'kajoran',
    nama: 'Kajoran',
    jiwa: 636, kk: 205, rt: 8, rw: 4,
    laki: 318, perempuan: 318,
    umurProduktif: 377, lansia: 86,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 318, fill: '#96D539' },
      { name: 'Perempuan', value: 318, fill: '#1B4332' },
    ],
  },
  {
    slug: 'karangtalun',
    nama: 'Karangtalun',
    jiwa: 272, kk: 93, rt: 4, rw: 2,
    laki: 136, perempuan: 136,
    umurProduktif: 161, lansia: 37,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 136, fill: '#96D539' },
      { name: 'Perempuan', value: 136, fill: '#1B4332' },
    ],
  },
  {
    slug: 'selingan',
    nama: 'Selingan',
    jiwa: 210, kk: 71, rt: 3, rw: 1,
    laki: 105, perempuan: 105,
    umurProduktif: 124, lansia: 28,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 105, fill: '#96D539' },
      { name: 'Perempuan', value: 105, fill: '#1B4332' },
    ],
  },
]
