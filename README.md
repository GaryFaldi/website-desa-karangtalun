# Website Profil Desa Karangtalun

Website profil desa statis (SSG) untuk Desa Karangtalun, Kabupaten Magelang, Jawa Tengah. Proyek ini dibangun menggunakan React, Vite, dan `vite-react-ssg`.

---

## 🗺️ Peta Situs & Navigasi

```text
Beranda (Landing Page)
├── 1. Profil Desa
│   ├── Overview Desa
│   │   ├── Sejarah Desa
│   │   ├── Visi & Misi
│   │   └── Letak Geografis
│   ├── Kontak Desa
│   │   ├── Alamat Kantor Desa
│   │   ├── Nomor Telepon / WhatsApp
│   │   ├── Email
│   │   └── Jam Pelayanan
│   └── Profil Wilayah Dusun
│       ├── Dusun Baran
│       │   ├── Profil Singkat
│       │   ├── Kontak Kepala Dusun
│       │   ├── Peta Lokasi Dusun
│       │   ├── Potensi Dusun
│       │   ├── Fasilitas Dusun
│       │   └── Galeri Dusun
│       ├── Dusun Dangkel Kulon
│       ├── Dusun Dangkel Wetan
│       ├── Dusun Jambon
│       ├── Dusun Jampiroso
│       ├── Dusun Jangkang
│       ├── Dusun Jangkang A
│       ├── Dusun Jangkang B
│       ├── Dusun Joho
│       ├── Dusun Kajoran
│       ├── Dusun Karangtalun
│       └── Dusun Selingan
│
├── 2. Pemerintahan & Kependudukan
│   ├── Struktur Organisasi Pemerintah Desa
│   ├── Statistik Kependudukan Desa
│   │   └── Data Makro Penduduk
│   └── Data Kependudukan per Dusun
│       ├── Tabel
│       └── Grafik
│
├── 3. Potensi & Wisata
│   ├── Peta Wisata & Kuliner Desa
│   └── UMKM / Potensi skala desa (rangkuman seluruh potensi dusun)
│
├── 4. Galeri Kegiatan
│   ├── Kegiatan Desa
│   └── Dokumentasi Event Desa
│
└── 5. Peta Lokasi & Fasilitas
    ├── Peta Interaktif
    │   └── Filter Berdasarkan Dusun
    └── Fasilitas Umum
        ├── Fasilitas Umum
        ├── Sekolah
        └── Tempat Ibadah
```

---

## Cara Menjalankan Proyek (Untuk Kolaborator/Teman)

Jika Anda baru pertama kali meng-clone repositori ini, ikuti langkah berikut:

### Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) (versi 18 LTS atau lebih baru).

### Langkah-Langkah:
1. **Buka Terminal** di folder proyek ini.
2. **Instal Dependensi**:
   ```bash
   npm install
   ```
   *Perintah ini akan mengunduh folder `node_modules` yang berisi semua library yang dibutuhkan.*
3. **Jalankan Server Development**:
   ```bash
   npm run dev
   ```
4. **Buka di Browser**: Akses `http://localhost:5173`.
5. **Membuat Build Statis (Uji Coba Production)**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 📂 Struktur Folder Proyek

```text
website-desa-karangtalun/
│
├── public/
│   └── assets/
│       └── dusun/
│           └── <slug>/          ← Foto per dusun (contoh: jampiroso/umkm-1.jpg)
│
├── scripts/
│   ├── fetch-bps.js             ← Script penarik data BPS
│   └── fetch-sheets.js          ← Script penarik data Google Sheets
│
├── src/
│   ├── components/
│   │   ├── layout/              ← Header, Footer, Navigation, Layout Wrapper
│   │   └── ui/                  ← Komponen reusable (Card, Table, dll)
│   │
│   ├── data/
│   │   ├── static/              ← Data statis ditulis manual (sejarah, visi-misi)
│   │   │   ├── desa.js          
│   │   │   └── struktur-organisasi.js
│   │   │
│   │   ├── generated/           ← ⚠️ HASIL OTOMATIS DARI SCRIPT (Jangan diedit manual/dicommit)
│   │   │   ├── bps.json
│   │   │   └── ...
│   │   │
│   │   └── dusun/               ← Konten markdown per dusun
│   │       ├── _template.md     ← Panduan membuat profil dusun baru
│   │       └── ...
│   │
│   ├── pages/                   ← Halaman-halaman utama website
│   │   ├── Beranda.jsx          ← Halaman utama (SUDAH SELESAI)
│   │   ├── profil-desa/
│   │   │   ├── Overview.jsx     ← Sedang dikerjakan
│   │   │   └── Dusun.jsx        ← Template detail dusun
│   │   └── ...
│   │
│   ├── styles/
│   │   ├── tokens.css           ← Variabel desain (Warna, Font, Spacing)
│   │   └── global.css           ← Reset CSS & styling global
│   │
│   ├── routes.jsx               ← Jalur/routing website
│   └── main.jsx                 ← Entry point aplikasi
│
├── temp/                        ← File referensi sementara (tidak masuk Git)
├── PRD.md                       ← Dokumen spesifikasi teknis utama
└── CONTRIBUTING.md              ← Panduan kontribusi tim KKN
```

## Pembagian Tugas (Biar Tidak Tabrakan/Conflict)

Untuk menghindari konflik saat melakukan `git merge` / `git push`, silakan bagi tugas dengan aturan berikut:

### 👤 Tugas Orang 1 (Fokus Halaman & Fitur Umum)
Teman Anda akan mengerjakan implementasi halaman-halaman berikut (desain & konten):
1. **Pemerintahan & Kependudukan** (`src/pages/pemerintahan/`):
   * Struktur Organisasi, Statistik Desa, dan Statistik Dusun.
2. **Potensi & Wisata** (`src/pages/potensi-wisata/`):
   * Peta Wisata & Kuliner Desa, serta list UMKM Dusun.
3. **Galeri Kegiatan** (`src/pages/galeri/`):
   * Galeri Kegiatan Desa dan Dokumentasi Dusun.
4. **Peta Lokasi & Fasilitas** (`src/pages/peta-lokasi/`):
   * Peta Interaktif dan data Fasilitas Umum (Sekolah, Tempat Ibadah, dll).

### 👤 Tugas Orang 2 (Fokus Pondasi & Profil Desa/Dusun)
Kita akan menyelesaikan fondasi inti website terlebih dahulu secara bertahap:
1. **Menyelesaikan Halaman Profil Desa**:
   * Membuat halaman **Overview Desa** (`/profil-desa/overview`) beserta data statis penunjang di `src/data/static/desa.js`.
2. **Membuat Template Detail Dusun (DIKERJAKAN NANTI)**:
   * *Catatan:* Profil dusun ditunda dan baru dikerjakan setelah Profil Desa selesai secara utuh.
   * Ketika tiba waktunya, kita akan membuat template dinamis `Dusun.jsx` (`/profil-desa/dusun/:slug`) beserta data markdown untuk Dusun Jampiroso.
3. **Infrastruktur Pendukung**:
   * Membuat helper SEO (`src/lib/seo.js`) untuk meta tag.
   * Menyiapkan script penarik data (`scripts/fetch-sheets.js` & `scripts/fetch-bps.js`).

---

## ⚠️ Aturan Penting Developer
* **Jangan mengubah file CSS di luar `src/styles/`** kecuali untuk styling lokal komponen. Gunakan variabel dari `tokens.css`.
* **Jangan membuat file halaman tersendiri untuk tiap dusun** (seperti `Jampiroso.jsx`, `Baran.jsx`). Semua dusun menggunakan satu file template yang sama, yaitu `Dusun.jsx`, dengan sumber data dari file markdown `.md`.
* **Selalu buat branch baru atau Pull Request** sebelum menggabungkan ke `main` jika bekerja secara tim.
