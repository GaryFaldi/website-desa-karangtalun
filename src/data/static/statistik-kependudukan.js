/**
 * statistik-kependudukan.js — Data kependudukan Desa Karangtalun
 *
 * Sumber data:
 *  - Website resmi Desa Karangtalun (Sistem Informasi Desa / SID Kab. Magelang)
 *  - Publikasi referensi: Kecamatan Ngluwar Dalam Angka, BPS Kab. Magelang
 *
 * Catatan: Data per-dusun (kelompok umur, pendidikan, pekerjaan) merupakan estimasi
 * proporsional berdasarkan data agregat desa. Perbarui dengan monografi desa terbaru
 * jika tersedia data resmi per dusun yang lebih detail.
 *
 * Terakhir diperbarui: Juli 2024
 */

// ─── Ringkasan Tingkat Desa ────────────────────────────────────────────────
export const summaryDesa = {
  totalJiwa:    3_350,
  totalKK:      1_110,
  lakiLaki:     1_672,
  perempuan:    1_678,
  sexRatio:     99.6,       // per 100 perempuan
  jumlahRt:     43,
  jumlahRw:     21,
  jumlahDusun:  10,
  luasWilayah:  '—',        // belum tersedia data resmi
  kepadatan:    '—',        // belum tersedia data resmi
  sumberData:   'Sistem Informasi Desa (SID) Kab. Magelang',
  tahunData:    2024,
}

// ─── Komposisi Jenis Kelamin ───────────────────────────────────────────────
export const dataJenisKelamin = [
  { name: 'Laki-Laki',  value: 1_672, fill: '#96D539' },
  { name: 'Perempuan',  value: 1_678, fill: '#1B4332' },
]

// ─── Kelompok Umur (Piramida Penduduk) ────────────────────────────────────
// Estimasi proporsional mengacu pada struktur umur Kec. Ngluwar (BPS 2023)
export const dataKelompokUmur = [
  { umur: '0–4',   laki:   98, perempuan:  95 },
  { umur: '5–9',   laki:  126, perempuan: 121 },
  { umur: '10–14', laki:  133, perempuan: 128 },
  { umur: '15–19', laki:  129, perempuan: 124 },
  { umur: '20–24', laki:  118, perempuan: 115 },
  { umur: '25–29', laki:  112, perempuan: 118 },
  { umur: '30–34', laki:  124, perempuan: 129 },
  { umur: '35–39', laki:  121, perempuan: 126 },
  { umur: '40–44', laki:  114, perempuan: 119 },
  { umur: '45–49', laki:  109, perempuan: 114 },
  { umur: '50–54', laki:   98, perempuan: 103 },
  { umur: '55–59', laki:   86, perempuan:  94 },
  { umur: '60+',   laki:  124, perempuan: 172 },
]

// ─── Tingkat Pendidikan ────────────────────────────────────────────────────
// Estimasi proporsional; mayoritas lulusan SD sesuai karakteristik kecamatan
export const dataPendidikan = [
  { label: 'Belum / Tidak Sekolah', jumlah: 285 },
  { label: 'SD / Sederajat',        jumlah: 1_020 },
  { label: 'SMP / Sederajat',       jumlah:   720 },
  { label: 'SMA / Sederajat',       jumlah:   870 },
  { label: 'D3 / S1 ke atas',       jumlah:   295 },
  { label: 'Tidak Sekolah',         jumlah:   160 },
]

// ─── Mata Pencaharian ──────────────────────────────────────────────────────
// Sesuai karakteristik: mayoritas petani/buruh tani, lalu karyawan swasta
export const dataPekerjaan = [
  { label: 'Petani / Buruh Tani',   jumlah: 680 },
  { label: 'Karyawan Swasta',       jumlah: 420 },
  { label: 'Buruh Harian Lepas',    jumlah: 310 },
  { label: 'Pedagang / Wiraswasta', jumlah: 265 },
  { label: 'PNS / TNI / Polri',     jumlah:  75 },
  { label: 'Pelajar / Mahasiswa',   jumlah: 540 },
  { label: 'Belum / Tidak Bekerja', jumlah: 380 },
  { label: 'Lainnya',               jumlah: 310 },
]

// ─── Data Per Dusun ────────────────────────────────────────────────────────
// Sumber: Website resmi Desa Karangtalun (SID Kab. Magelang)
// Jumlah laki/perempuan per dusun adalah estimasi proporsional dari total desa (49,9% : 50,1%)
export const statistikPerDusun = [
  {
    slug: 'baran',
    nama: 'Baran',
    jiwa: 151, kk: 47, rt: 2, rw: 1,
    laki: 75, perempuan: 76,
    umurProduktif: 89, lansia: 20,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 75,  fill: '#96D539' },
      { name: 'Perempuan', value: 76,  fill: '#1B4332' },
    ],
  },
  {
    slug: 'dangkel-kulon',
    nama: 'Dangkel Kulon',
    jiwa: 287, kk: 93, rt: 10, rw: 4,
    laki: 143, perempuan: 144,
    umurProduktif: 170, lansia: 38,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 143, fill: '#96D539' },
      { name: 'Perempuan', value: 144, fill: '#1B4332' },
    ],
  },
  {
    slug: 'dangkel-wetan',
    nama: 'Dangkel Wetan',
    jiwa: 533, kk: 178, rt: 8, rw: 3,
    laki: 266, perempuan: 267,
    umurProduktif: 316, lansia: 72,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 266, fill: '#96D539' },
      { name: 'Perempuan', value: 267, fill: '#1B4332' },
    ],
  },
  {
    slug: 'jambon',
    nama: 'Jambon',
    jiwa: 445, kk: 155, rt: 6, rw: 2,
    laki: 222, perempuan: 223,
    umurProduktif: 264, lansia: 60,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 222, fill: '#96D539' },
      { name: 'Perempuan', value: 223, fill: '#1B4332' },
    ],
  },
  {
    slug: 'jampiroso',
    nama: 'Jampiroso',
    jiwa: 340, kk: 112, rt: 4, rw: 1,
    laki: 170, perempuan: 170,
    umurProduktif: 202, lansia: 46,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 170, fill: '#96D539' },
      { name: 'Perempuan', value: 170, fill: '#1B4332' },
    ],
  },
  {
    slug: 'jangkang',
    nama: 'Jangkang',
    jiwa:  67, kk: 25, rt: 4, rw: 1,
    laki: 33, perempuan: 34,
    umurProduktif: 40, lansia: 9,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 33,  fill: '#96D539' },
      { name: 'Perempuan', value: 34,  fill: '#1B4332' },
    ],
  },
  {
    slug: 'jangkang-a',
    nama: 'Jangkang A',
    jiwa: 288, kk: 101, rt: 3, rw: 1,
    laki: 144, perempuan: 144,
    umurProduktif: 171, lansia: 39,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 144, fill: '#96D539' },
      { name: 'Perempuan', value: 144, fill: '#1B4332' },
    ],
  },
  {
    slug: 'jangkang-b',
    nama: 'Jangkang B',
    jiwa: 305, kk: 93, rt: 5, rw: 2,
    laki: 152, perempuan: 153,
    umurProduktif: 181, lansia: 41,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 152, fill: '#96D539' },
      { name: 'Perempuan', value: 153, fill: '#1B4332' },
    ],
  },
  {
    slug: 'joho',
    nama: 'Joho',
    jiwa: 409, kk: 137, rt: 5, rw: 2,
    laki: 204, perempuan: 205,
    umurProduktif: 243, lansia: 55,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 204, fill: '#96D539' },
      { name: 'Perempuan', value: 205, fill: '#1B4332' },
    ],
  },
  {
    slug: 'kajoran',
    nama: 'Kajoran',
    jiwa: 525, kk: 169, rt: 8, rw: 4,
    laki: 263, perempuan: 262,
    umurProduktif: 311, lansia: 71,
    jenisKelamin: [
      { name: 'Laki-Laki', value: 263, fill: '#96D539' },
      { name: 'Perempuan', value: 262, fill: '#1B4332' },
    ],
  },
]
