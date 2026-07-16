/**
 * Data Struktur Organisasi Perangkat Desa Karangtalun
 * 
 * File ini berisi data perangkat desa untuk ditampilkan di halaman
 * /pemerintahan/struktur-organisasi
 * 
 * Format data disesuaikan dengan bagan organisasi pemerintahan desa standar:
 * - Kepala Desa (top level)
 * - Sekretaris Desa
 * - Kepala Urusan (Kaur) - Finance, General Affairs, Planning
 * - Kepala Seksi (Kasi) - Government, Welfare, Services
 * - Kepala Dusun (12 dusun)
 * 
 * TODO: Isi data sesuai struktur perangkat desa yang sebenarnya
 */

export const strukturOrganisasi = {
  // Kepala Desa (Level 1)
  kepalaDesa: {
    nama: '[Nama Kepala Desa]',
    jabatan: 'Kepala Desa',
    foto: null, // Path ke foto, misal: '/assets/perangkat/kades.jpg'
    niap: null, // Nomor Induk Aparatur Pemerintah (optional)
  },

  // Sekretaris Desa (Level 2)
  sekretarisDesa: {
    nama: '[Nama Sekretaris Desa]',
    jabatan: 'Sekretaris Desa',
    foto: null,
    niap: null,
  },

  // Kepala Urusan (Level 3) - 3 posisi
  kepalaUrusan: [
    {
      id: 'kaur-keuangan',
      nama: '[Nama Kaur Keuangan]',
      jabatan: 'Kaur Keuangan',
      singkatan: 'Kaur Keuangan',
      foto: null,
      niap: null,
    },
    {
      id: 'kaur-umum',
      nama: '[Nama Kaur Umum]',
      jabatan: 'Kaur Umum dan Tata Usaha',
      singkatan: 'Kaur Umum',
      foto: null,
      niap: null,
    },
    {
      id: 'kaur-perencanaan',
      nama: '[Nama Kaur Perencanaan]',
      jabatan: 'Kaur Perencanaan',
      singkatan: 'Kaur Perencanaan',
      foto: null,
      niap: null,
    },
  ],

  // Kepala Seksi (Level 3) - 3 posisi
  kepalaSeksi: [
    {
      id: 'kasi-pemerintahan',
      nama: '[Nama Kasi Pemerintahan]',
      jabatan: 'Kasi Pemerintahan',
      singkatan: 'Kasi Pemerintahan',
      foto: null,
      niap: null,
    },
    {
      id: 'kasi-kesejahteraan',
      nama: '[Nama Kasi Kesejahteraan]',
      jabatan: 'Kasi Kesejahteraan',
      singkatan: 'Kasi Kesejahteraan',
      foto: null,
      niap: null,
    },
    {
      id: 'kasi-pelayanan',
      nama: '[Nama Kasi Pelayanan]',
      jabatan: 'Kasi Pelayanan',
      singkatan: 'Kasi Pelayanan',
      foto: null,
      niap: null,
    },
  ],

  // Kepala Dusun (Level 4) - 12 dusun
  kepalaDusun: [
    { id: 'baran', nama: '[Nama Kadus]', dusun: 'Baran', foto: null },
    { id: 'dangkel-kulon', nama: '[Nama Kadus]', dusun: 'Dangkel Kulon', foto: null },
    { id: 'dangkel-wetan', nama: '[Nama Kadus]', dusun: 'Dangkel Wetan', foto: null },
    { id: 'jambon', nama: '[Nama Kadus]', dusun: 'Jambon', foto: null },
    { id: 'jampiroso', nama: '[Nama Kadus]', dusun: 'Jampiroso', foto: null },
    { id: 'jangkang', nama: '[Nama Kadus]', dusun: 'Jangkang', foto: null },
    { id: 'jangkang-a', nama: '[Nama Kadus]', dusun: 'Jangkang A', foto: null },
    { id: 'jangkang-b', nama: '[Nama Kadus]', dusun: 'Jangkang B', foto: null },
    { id: 'joho', nama: '[Nama Kadus]', dusun: 'Joho', foto: null },
    { id: 'kajoran', nama: '[Nama Kadus]', dusun: 'Kajoran', foto: null },
    { id: 'karangtalun', nama: '[Nama Kadus]', dusun: 'Karangtalun', foto: null },
    { id: 'selingan', nama: '[Nama Kadus]', dusun: 'Selingan', foto: null },
  ],
}
