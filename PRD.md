# PRD — Website Profil Desa (Technical Specification)

**Status:** Locked — dokumen ini adalah sumber kebenaran tunggal (single source of truth) untuk implementasi.
**Audiens dokumen:** AI coding agent (Claude Code / agent lain) dan kontributor manusia.
**Dokumen terkait:** `CONTRIBUTING.md`

---

## 0. Instruksi untuk AI Agent yang Mengimplementasikan Dokumen Ini

- Dokumen ini **preskriptif, bukan deskriptif** — semua keputusan di sini FINAL kecuali ditandai `[OPEN]`. Jangan mengganti library, service, atau pendekatan arsitektur yang sudah ditentukan dengan alasan "lebih modern", "lebih simpel", atau "best practice" versi lain.
- Kalau ada instruksi dari user di percakapan yang tampak bertentangan dengan dokumen ini, **tanyakan dulu** sebelum mengubah — jangan asumsikan dokumen ini sudah usang.
- Untuk item yang ditandai `[OPEN]`, **berhenti dan tanyakan** ke user, jangan menebak/memutuskan sendiri.
- Jangan menambahkan dependency, service pihak ketiga, atau pola arsitektur yang tidak disebut di dokumen ini tanpa persetujuan eksplisit (contoh yang DILARANG tanpa izin: menambah backend/API server, menambah database, mengganti hosting ke Vercel/Netlify, menambah CMS headless, mengganti CSS ke Tailwind/styled-components, mengubah SSG jadi CSR biasa).
- Ikuti struktur folder, penamaan file, dan skema data **persis** seperti tertulis di §5–§7. Konsistensi penamaan penting karena banyak kontributor (kelompok KKN) akan mengikuti pola yang sama di masa depan.

---

## 1. Ringkasan Proyek

Website profil desa statis (SSG), menampilkan profil desa secara umum dan profil 12 dusun secara individual. Dikerjakan sebagai proker individu KKN, dengan model kontribusi berkelanjutan oleh kelompok KKN berikutnya per dusun.

**Non-goals (di luar cakupan, JANGAN dikerjakan):**
- Backend/API server custom
- Database (SQL/NoSQL)
- Sistem login/akun pengguna
- CMS admin panel custom
- Rebuild otomatis terjadwal (rebuild dipicu manual via `git push`)

---

## 2. Tech Stack (FINAL — tidak boleh diganti tanpa persetujuan)

| Layer | Pilihan | Versi minimum | Catatan |
|---|---|---|---|
| Runtime | Node.js | 18 LTS+ | Dibutuhkan untuk native `fetch` di build script |
| Package manager | npm | — | Commit `package-lock.json` |
| Framework UI | React | ^18 | — |
| Build tool | Vite | ^5 | — |
| Static site generation | `vite-react-ssg` | latest stable | **Wajib** — menggantikan `vite build` biasa. Menghasilkan HTML statis per-route untuk SEO |
| Routing | `react-router-dom` | ^6 | Dikonsumsi oleh `vite-react-ssg` |
| Styling | Vanilla CSS (CSS custom properties untuk design tokens) | — | **Dilarang** menambah Tailwind/styled-components/CSS-in-JS lain |
| Parsing Markdown + frontmatter | `gray-matter` | latest | Untuk parse `src/data/dusun/*.md` |
| Render Markdown ke HTML | `react-markdown` | latest | Untuk body konten dusun |
| Parsing CSV | `papaparse` | latest | Untuk hasil fetch Google Sheets |
| Chart/grafik | `recharts` | latest | Untuk halaman Statistik Kependudukan |
| Peta interaktif | `leaflet` + `react-leaflet` | latest | Basemap: OpenStreetMap (gratis, tanpa API key) |
| Hosting | Cloudflare Pages | — | Auto-deploy dari git push ke branch `main` |
| Domain | `.id` reguler | — | Bukan `.desa.id`, bukan `.my.id` — lihat PRD lama untuk alasan |

---

## 3. Peta Situs & Routing (Lengkap)

Semua route di-generate statis oleh `vite-react-ssg` (`ssgOptions.includedRoutes`).

| Route | Komponen | Sumber Data |
|---|---|---|
| `/` | `pages/Beranda.jsx` | Statis (hardcode) |
| `/profil-desa/overview` | `pages/profil-desa/Overview.jsx` | Statis (`src/data/static/desa.js`) |
| `/profil-desa/dusun/:slug` | `pages/profil-desa/Dusun.jsx` | `src/data/dusun/<slug>.md` (dynamic, lihat §6.3) |
| `/pemerintahan/struktur-organisasi` | `pages/pemerintahan/StrukturOrganisasi.jsx` | Statis (`src/data/static/struktur-organisasi.js`) |
| `/pemerintahan/statistik-desa` | `pages/pemerintahan/StatistikDesa.jsx` | `src/data/generated/bps.json` |
| `/potensi-wisata/peta-wisata-kuliner` | `pages/potensi-wisata/PetaWisataKuliner.jsx` | `src/data/generated/wisata-kuliner.json` |
| `/potensi-wisata/umkm-desa` | `pages/potensi-wisata/UmkmDesa.jsx` | `src/data/generated/umkm-desa.json` |
| `/galeri/kegiatan-desa` | `pages/galeri/KegiatanDesa.jsx` | `src/data/generated/galeri-desa.json` |
| `/galeri/dokumentasi-desa` | `pages/galeri/DokumentasiDesa.jsx` | `src/data/generated/dokumentasi-desa.json` |
| `/peta-lokasi/peta-interaktif` | `pages/peta-lokasi/PetaInteraktif.jsx` | `src/data/generated/fasilitas.json` |
| `/peta-lokasi/fasilitas-umum` | `pages/peta-lokasi/FasilitasUmum.jsx` | `src/data/generated/fasilitas.json` |

Daftar 12 slug dusun (dari struktur asli):
```
baran, dangkel-kulon, dangkel-wetan, jambon, jampiroso, jangkang,
jangkang-a, jangkang-b, joho, kajoran, karangtalun, selingan
```

---

## 4. Struktur Folder (WAJIB diikuti persis)

```
desa-web/
├── public/
│   └── assets/
│       └── dusun/
│           └── <slug>/           ← foto per dusun, contoh: jampiroso/umkm-1.jpg
├── scripts/
│   ├── fetch-bps.js               ← fetch data BPS, output ke src/data/generated/bps.json
│   └── fetch-sheets.js            ← fetch Google Sheets CSV, output ke src/data/generated/*.json
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Navigation.jsx
│   │   └── ui/                    ← komponen re-usable (Card, Table, ImageGallery, dll)
│   ├── data/
│   │   ├── static/                ← ditulis manual, jarang berubah
│   │   │   ├── desa.js
│   │   │   └── struktur-organisasi.js
│   │   ├── generated/             ← HASIL fetch-data, JANGAN edit manual, JANGAN di-commit ke git (gitignore)
│   │   │   ├── bps.json
│   │   │   ├── wisata-kuliner.json
│   │   │   ├── umkm-desa.json
│   │   │   ├── galeri-desa.json
│   │   │   ├── dokumentasi-desa.json
│   │   │   └── fasilitas.json
│   │   └── dusun/                 ← 1 file per dusun, lihat §6.3
│   │       ├── _template.md       ← template kosong untuk kontributor baru
│   │       ├── baran.md
│   │       ├── jampiroso.md
│   │       └── ... (12 file total)
│   ├── pages/
│   │   ├── Beranda.jsx
│   │   ├── profil-desa/
│   │   │   ├── Overview.jsx
│   │   │   └── Dusun.jsx          ← template SERAGAM untuk semua dusun, JANGAN diduplikasi per dusun
│   │   ├── pemerintahan/
│   │   │   ├── StrukturOrganisasi.jsx
│   │   │   ├── StatistikDesa.jsx
│   │   │   └── StatistikDusun.jsx
│   │   ├── potensi-wisata/
│   │   │   ├── PetaWisataKuliner.jsx
│   │   │   └── UmkmDesa.jsx
│   │   ├── galeri/
│   │   │   ├── KegiatanDesa.jsx
│   │   │   └── DokumentasiDesa.jsx
│   │   └── peta-lokasi/
│   │       ├── PetaInteraktif.jsx
│   │       └── FasilitasUmum.jsx
│   ├── styles/
│   │   ├── tokens.css             ← CSS custom properties (warna, tipografi, spacing) — lihat §8
│   │   ├── global.css
│   │   └── (CSS per komponen, co-located atau di sini — putuskan konsisten, jangan campur pola)
│   ├── lib/
│   │   ├── loadDusunData.js       ← helper baca semua file src/data/dusun/*.md pakai import.meta.glob + gray-matter
│   │   └── seo.js                 ← helper generate meta tag per halaman (boleh .jsx jika primary export adalah React component)
│   ├── main.jsx
│   └── App.jsx
├── .env.example                   ← daftar env var TANPA value asli, lihat §9
├── vite.config.js
├── package.json
└── README.md
```

---

## 5. Environment Variables

File `.env.example` (commit ke repo, sebagai dokumentasi):
```
BPS_API_KEY=
GOOGLE_SHEET_CSV_URL_UMKM_DESA=
GOOGLE_SHEET_CSV_URL_WISATA_KULINER=
GOOGLE_SHEET_CSV_URL_GALERI_DESA=
GOOGLE_SHEET_CSV_URL_DOKUMENTASI_DESA=
GOOGLE_SHEET_CSV_URL_FASILITAS=
```

**Aturan:**
- File `.env` asli (dengan value) **TIDAK BOLEH di-commit** — pastikan ada di `.gitignore`.
- Di Cloudflare Pages, value asli disimpan di dashboard project → Settings → Environment Variables.
- Script `scripts/fetch-bps.js` dan `scripts/fetch-sheets.js` membaca env var ini via `process.env.<NAMA>`.

---

## 6. Skema Data (WAJIB diikuti persis — jangan ubah nama field)

### 6.1 `src/data/generated/bps.json` (hasil `fetch-bps.js`)
```json
{
  "tahun_data": 2025,
  "sumber": "BPS Web API",
  "jumlah_penduduk": 0,
  "jumlah_kk": 0,
  "jumlah_laki_laki": 0,
  "jumlah_perempuan": 0,
  "detail_usia": [
    { "kelompok": "0-4", "jumlah": 0 }
  ]
}
```

### 6.2 `src/data/generated/wisata-kuliner.json`, `umkm-desa.json`, `galeri-desa.json`, `dokumentasi-desa.json`, `fasilitas.json`
Hasil convert CSV → JSON array, struktur mengikuti kolom spreadsheet apa adanya (tidak ada transformasi field selain rename ke `camelCase`). Contoh `fasilitas.json`:
```json
[
  {
    "nama": "SD Negeri 1",
    "kategori": "sekolah",
    "dusun": "jampiroso",
    "latitude": -7.xxxx,
    "longitude": 110.xxxx
  }
]
```
`kategori` harus salah satu dari: `sekolah`, `tempat-ibadah`, `fasilitas-umum`.

### 6.3 `src/data/dusun/<slug>.md` (frontmatter + Markdown body)
```markdown
---
nama: "Jampiroso"
slug: "jampiroso"
kepala_dusun: "Nama Kepala Dusun"
jumlah_penduduk: 0
umkm:
  - nama: "Nama UMKM"
    deskripsi: "Deskripsi singkat"
    foto: "/assets/dusun/jampiroso/umkm-1.jpg"
galeri:
  - "/assets/dusun/jampiroso/kegiatan-1.jpg"
---

## Sejarah Dusun
(narasi bebas)

## Potensi & Keunikan
(narasi bebas)
```
Field frontmatter WAJIB ada: `nama`, `slug`. Field lain opsional (boleh array kosong `[]`).

**Cara load ke React (`src/lib/loadDusunData.js`):**
```js
// Pseudocode — ikuti pola ini, jangan pakai fs.readdir runtime (tidak jalan di build statis)
const files = import.meta.glob('/src/data/dusun/*.md', { as: 'raw', eager: true });
// parse tiap isi file dengan gray-matter, exclude _template.md
```

---

## 7. Build Pipeline

```bash
npm install
npm run fetch-data   # jalankan scripts/fetch-bps.js + scripts/fetch-sheets.js secara berurutan
npm run build         # vite-react-ssg build — generate HTML statis semua route di §3
```

`package.json` scripts (WAJIB ada persis nama-nama ini):
```json
{
  "scripts": {
    "dev": "vite",
    "fetch-data": "node scripts/fetch-bps.js && node scripts/fetch-sheets.js",
    "build": "vite-react-ssg build",
    "preview": "vite preview"
  }
}
```

**Konfigurasi Cloudflare Pages:**
- Build command: `npm run fetch-data && npm run build`
- Output directory: `dist`
- Environment variables: sesuai §5

---

## 8. Konvensi CSS / Design Tokens

`src/styles/tokens.css` berisi CSS custom properties yang dipakai di seluruh situs — TIDAK boleh ada warna/font hardcode di file CSS lain, semua harus merujuk variabel di sini:
```css
:root {
  --color-primary: ; /* [OPEN] belum diputuskan — lihat §11 */
  --color-secondary: ;
  --color-background: ;
  --color-text: ;
  --font-display: ; /* [OPEN] */
  --font-body: ; /* [OPEN] */
  --spacing-unit: 8px;
}
```
Nilai warna & tipografi masih `[OPEN]` — agent HARUS bertanya ke user sebelum mengisi nilai final, jangan menebak palet sendiri.

---

## 9. SEO — Implementasi Teknis

### 9.1 Meta Tags & Social Sharing (Priority: High)
- Setiap komponen halaman di `src/pages/` WAJIB set `<title>` dan `<meta name="description">` unik via helper `src/lib/seo.js` — TIDAK boleh ada title/description default yang sama di semua halaman.
- Open Graph tags (`og:title`, `og:description`, `og:image`) di halaman yang punya foto representatif (terutama halaman dusun).
- **Deliverable:** Komponen `<SEO />` reusable yang terintegrasi dengan `vite-react-ssg`

### 9.2 Sitemap & Robots (Priority: Medium)
- `sitemap.xml` di-generate saat build, ditaruh di `dist/` root
- `robots.txt` di-generate saat build, ditaruh di `dist/` root
- **Deliverable:** Plugin Vite atau script custom untuk auto-generate

### 9.3 Structured Data (Priority: Medium)
- Structured data `schema.org` tipe `GovernmentOrganization` di halaman Beranda dan Overview
- **Deliverable:** Helper function atau integration ke komponen `<SEO />`

### 9.4 Post-Launch (Manual)
- Submit ke Google Search Console (di luar cakupan kode, task manual user)

**Catatan Implementasi:**
Requirement di atas boleh diimplementasikan secara bertahap. Phase 1 (§9.1) adalah blocking untuk launch, Phase 2-3 (§9.2-9.3) dapat dikerjakan post-launch sebagai enhancement.

---

## 10. Model Kontribusi Dusun

Lihat `CONTRIBUTING.md` untuk instruksi kontributor. Ringkasan aturan teknis untuk agent:
- `pages/profil-desa/Dusun.jsx` adalah template TUNGGAL untuk 12 dusun — dilarang membuat file `Jampiroso.jsx`, `Baran.jsx`, dst secara terpisah.
- Perubahan visual/layout di file ini mempengaruhi semua dusun — perlakukan sebagai shared component, bukan halaman spesifik.
- Kontribusi dusun baru = tambah 1 file `.md` di `src/data/dusun/`, TIDAK menyentuh file `.jsx` atau `.css` manapun.

---

## 11. Item Terbuka `[OPEN]` — Agent WAJIB Bertanya, Jangan Asumsi

1. **Palet warna & tipografi** (§8) — belum ada arahan desain visual sama sekali.
2. **Alur review kontribusi**: commit langsung ke `main`, atau wajib lewat Pull Request yang direview?
3. **Nama domain final** `.id` — belum dicek ketersediaan & belum dibeli.
4. **Skema kolom pasti** di tiap Google Sheet (nama kolom persis di spreadsheet UMKM/galeri/fasilitas belum ditentukan — §6.2 baru estimasi struktur akhir, kolom sumber CSV mentahnya belum ada).
5. **Isi konten desa** (sejarah, visi-misi, struktur organisasi) — belum ditulis, masih placeholder di `src/data/static/`.

---

## 12. Anggaran

| Item | Estimasi |
|---|---|
| Domain `.id` (1 tahun) | Rp120.000–250.000 |
| Hosting, BPS API, Sheets, SSL | Rp0 |
| Total minimum | ± Rp150.000, sisa dari Rp450.000 dianggarkan tidak wajib dihabiskan |
