/**
 * statistik-kependudukan.js — Data kependudukan Desa Karangtalun
 *
 * ⚠️ DATA SEMENTARA — Akan diperbarui dengan data resmi dari BPS/administrasi desa.
 * Angka bersifat estimasi untuk keperluan tampilan. Hubungi perangkat desa untuk data valid.
 */

// ─── Ringkasan Tingkat Desa ────────────────────────────────────────────────
export const summaryDesa = {
  totalJiwa:    3_542,
  totalKK:      1_024,
  lakiLaki:     1_734,
  perempuan:    1_808,
  sexRatio:     96,          // per 100 perempuan
  luasWilayah:  '—',         // belum tersedia
  kepadatan:    '—',         // belum tersedia
  tahunData:    2024,
}

// ─── Komposisi Jenis Kelamin ───────────────────────────────────────────────
export const dataJenisKelamin = [
  { name: 'Laki-Laki',  value: 1_734, fill: '#96D539' },
  { name: 'Perempuan',  value: 1_808, fill: '#1B4332' },
]

// ─── Kelompok Umur (Piramida Penduduk) ────────────────────────────────────
export const dataKelompokUmur = [
  { umur: '0–4',   laki:  112, perempuan: 105 },
  { umur: '5–9',   laki:  145, perempuan: 138 },
  { umur: '10–14', laki:  152, perempuan: 147 },
  { umur: '15–19', laki:  148, perempuan: 143 },
  { umur: '20–24', laki:  135, perempuan: 132 },
  { umur: '25–29', laki:  128, perempuan: 135 },
  { umur: '30–34', laki:  142, perempuan: 148 },
  { umur: '35–39', laki:  138, perempuan: 144 },
  { umur: '40–44', laki:  130, perempuan: 136 },
  { umur: '45–49', laki:  125, perempuan: 130 },
  { umur: '50–54', laki:  112, perempuan: 118 },
  { umur: '55–59', laki:   98, perempuan: 108 },
  { umur: '60+',   laki:  169, perempuan: 224 },
]

// ─── Tingkat Pendidikan ────────────────────────────────────────────────────
export const dataPendidikan = [
  { label: 'Belum Sekolah',   jumlah: 312 },
  { label: 'SD / Sederajat',  jumlah: 875 },
  { label: 'SMP / Sederajat', jumlah: 698 },
  { label: 'SMA / Sederajat', jumlah: 942 },
  { label: 'D3 / S1+',        jumlah: 415 },
  { label: 'Tidak Sekolah',   jumlah: 300 },
]

// ─── Mata Pencaharian ──────────────────────────────────────────────────────
export const dataPekerjaan = [
  { label: 'Petani',              jumlah: 712 },
  { label: 'Buruh',               jumlah: 458 },
  { label: 'Pedagang',            jumlah: 213 },
  { label: 'PNS/TNI/Polri',       jumlah:  87 },
  { label: 'Wiraswasta',          jumlah: 345 },
  { label: 'Pelajar/Mahasiswa',   jumlah: 612 },
  { label: 'Belum/Tidak Bekerja', jumlah: 456 },
  { label: 'Lainnya',             jumlah: 459 },
]

// ─── Data Per Dusun ────────────────────────────────────────────────────────
export const statistikPerDusun = [
  {
    slug: 'baran',         nama: 'Baran',
    jiwa: 287, kk:  84, laki: 141, perempuan: 146,
    umurProduktif: 168, lansia: 38,
    jenisKelamin: [{ name: 'Laki-Laki', value: 141, fill: '#96D539' }, { name: 'Perempuan', value: 146, fill: '#1B4332' }],
  },
  {
    slug: 'dangkel-kulon', nama: 'Dangkel Kulon',
    jiwa: 312, kk:  91, laki: 152, perempuan: 160,
    umurProduktif: 189, lansia: 42,
    jenisKelamin: [{ name: 'Laki-Laki', value: 152, fill: '#96D539' }, { name: 'Perempuan', value: 160, fill: '#1B4332' }],
  },
  {
    slug: 'dangkel-wetan', nama: 'Dangkel Wetan',
    jiwa: 295, kk:  86, laki: 144, perempuan: 151,
    umurProduktif: 178, lansia: 40,
    jenisKelamin: [{ name: 'Laki-Laki', value: 144, fill: '#96D539' }, { name: 'Perempuan', value: 151, fill: '#1B4332' }],
  },
  {
    slug: 'jambon',        nama: 'Jambon',
    jiwa: 268, kk:  78, laki: 131, perempuan: 137,
    umurProduktif: 161, lansia: 36,
    jenisKelamin: [{ name: 'Laki-Laki', value: 131, fill: '#96D539' }, { name: 'Perempuan', value: 137, fill: '#1B4332' }],
  },
  {
    slug: 'jampiroso',    nama: 'Jampiroso',
    jiwa: 423, kk: 124, laki: 207, perempuan: 216,
    umurProduktif: 254, lansia: 57,
    jenisKelamin: [{ name: 'Laki-Laki', value: 207, fill: '#96D539' }, { name: 'Perempuan', value: 216, fill: '#1B4332' }],
  },
  {
    slug: 'jangkang',     nama: 'Jangkang',
    jiwa: 278, kk:  81, laki: 136, perempuan: 142,
    umurProduktif: 167, lansia: 37,
    jenisKelamin: [{ name: 'Laki-Laki', value: 136, fill: '#96D539' }, { name: 'Perempuan', value: 142, fill: '#1B4332' }],
  },
  {
    slug: 'jangkang-a',   nama: 'Jangkang A',
    jiwa: 245, kk:  72, laki: 120, perempuan: 125,
    umurProduktif: 147, lansia: 33,
    jenisKelamin: [{ name: 'Laki-Laki', value: 120, fill: '#96D539' }, { name: 'Perempuan', value: 125, fill: '#1B4332' }],
  },
  {
    slug: 'jangkang-b',   nama: 'Jangkang B',
    jiwa: 252, kk:  74, laki: 123, perempuan: 129,
    umurProduktif: 151, lansia: 34,
    jenisKelamin: [{ name: 'Laki-Laki', value: 123, fill: '#96D539' }, { name: 'Perempuan', value: 129, fill: '#1B4332' }],
  },
  {
    slug: 'joho',         nama: 'Joho',
    jiwa: 234, kk:  68, laki: 114, perempuan: 120,
    umurProduktif: 140, lansia: 31,
    jenisKelamin: [{ name: 'Laki-Laki', value: 114, fill: '#96D539' }, { name: 'Perempuan', value: 120, fill: '#1B4332' }],
  },
  {
    slug: 'kajoran',      nama: 'Kajoran',
    jiwa: 298, kk:  87, laki: 146, perempuan: 152,
    umurProduktif: 179, lansia: 40,
    jenisKelamin: [{ name: 'Laki-Laki', value: 146, fill: '#96D539' }, { name: 'Perempuan', value: 152, fill: '#1B4332' }],
  },
  {
    slug: 'karangtalun',  nama: 'Karangtalun',
    jiwa: 432, kk: 126, laki: 211, perempuan: 221,
    umurProduktif: 259, lansia: 58,
    jenisKelamin: [{ name: 'Laki-Laki', value: 211, fill: '#96D539' }, { name: 'Perempuan', value: 221, fill: '#1B4332' }],
  },
  {
    slug: 'selingan',     nama: 'Selingan',
    jiwa: 218, kk:  63, laki: 109, perempuan: 109,
    umurProduktif: 131, lansia: 29,
    jenisKelamin: [{ name: 'Laki-Laki', value: 109, fill: '#96D539' }, { name: 'Perempuan', value: 109, fill: '#1B4332' }],
  },
]
