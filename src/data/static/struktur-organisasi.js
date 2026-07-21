/**
 * Data Struktur Organisasi Perangkat Desa Karangtalun
 *
 * Sumber: Papan Struktur Organisasi Pemerintah Desa Karangtalun
 *         Kec. Ngluwar, Kab. Magelang
 *
 * Terakhir diperbarui: Juli 2025
 */

export const strukturOrganisasi = {
  // ── Level 1: Kepala Desa ──────────────────────────────────────────────────
  kepalaDesa: {
    nama: 'Muzaeni',
    jabatan: 'Kepala Desa',
    foto: null,
    niap: null,
  },

  // ── Level 2: Sekretaris Desa ──────────────────────────────────────────────
  sekretarisDesa: {
    nama: 'Ahmad Zubaedi',
    jabatan: 'Sekretaris Desa',
    foto: null,
    niap: null,
  },

  // ── Level 3: Kepala Urusan (Kaur) ─────────────────────────────────────────
  kepalaUrusan: [
    {
      id: 'kaur-umum',
      nama: 'Romadhon',
      jabatan: 'Kaur Umum dan Tata Usaha',
      singkatan: 'Kaur Umum',
      foto: null,
      niap: null,
    },
    {
      id: 'kaur-keuangan',
      nama: 'A Rofi A',
      jabatan: 'Kaur Keuangan',
      singkatan: 'Kaur Keuangan',
      foto: null,
      niap: null,
    },
  ],

  // ── Level 3: Kepala Seksi (Kasi) ──────────────────────────────────────────
  kepalaSeksi: [
    {
      id: 'kasi-pemerintahan',
      nama: 'Heli Pardjita',
      jabatan: 'Kepala Seksi Pemerintahan',
      singkatan: 'Kasi Pemerintahan',
      foto: null,
      niap: null,
    },
    {
      id: 'kasi-pelayanan',
      nama: 'Elissa Z.',
      jabatan: 'Kepala Seksi Pelayanan',
      singkatan: 'Kasi Pelayanan',
      foto: null,
      niap: null,
    },
    {
      id: 'kasi-kesra',
      nama: 'Diah Ayu Asri W.',
      jabatan: 'Kepala Seksi Kesejahteraan Rakyat',
      singkatan: 'Kasi Kesra',
      foto: null,
      niap: null,
    },
  ],

  // ── Level 4: Kepala Dusun ─────────────────────────────────────────────────
  // Catatan: 1 kadus merangkap beberapa dusun sesuai papan struktur
  kepalaDusun: [
    {
      id: 'jampiroso',
      nama: 'Tatri Mulyani',
      dusun: 'Jampiroso',
      foto: null,
    },
    {
      id: 'dangkel-kulon-wetan',
      nama: 'Puji Ashari',
      dusun: 'Dangkel Kulon & Dangkel Wetan',
      foto: null,
    },
    {
      id: 'jangkang-ab',
      nama: 'Ismangil',
      dusun: 'Jangkang A & Jangkang B',
      foto: null,
    },
    {
      id: 'kajoran',
      nama: 'Marwanto',
      dusun: 'Kajoran',
      foto: null,
    },
    {
      id: 'karangtalun-selingan',
      nama: 'Usman',
      dusun: 'Karangtalun & Selingan',
      foto: null,
    },
    {
      id: 'jambon-joho',
      nama: 'Kambali',
      dusun: 'Jambon & Joho',
      foto: null,
    },
  ],
}
