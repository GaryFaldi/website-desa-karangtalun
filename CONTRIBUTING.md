# Panduan Kontribusi

Dokumen ini untuk kelompok KKN berikutnya (atau siapa pun) yang ingin menambah/mengubah profil dusun di website ini. Tidak perlu paham seluruh codebase — cukup ikuti langkah di §1.

---

## 1. Menambah atau Mengubah Profil Dusun (Paling Umum)

Setiap dusun punya **satu file** berisi datanya sendiri di:
```
src/data/dusun/<slug-dusun>.md
```
Contoh: Dusun Jampiroso → `src/data/dusun/jampiroso.md`

### Langkah-langkah

1. **Clone repo ini** (atau kalau sudah punya salinan lokal, `git pull` dulu untuk update terbaru).
2. Cari file dusun anda di `src/data/dusun/`. Kalau belum ada, copy file `_template.md` di folder yang sama, lalu rename sesuai nama dusun (huruf kecil, spasi diganti tanda `-`, contoh: `dangkel-kulon.md`).
3. Isi bagian **frontmatter** (bagian di antara `---`) — ini data terstruktur, jangan ubah nama field-nya:

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
  - "/assets/dusun/jampiroso/kegiatan-2.jpg"
---
```

4. Tulis konten bebas di bawah frontmatter (bagian ini boleh sepanjang yang anda mau, format Markdown biasa):

```markdown
## Sejarah Dusun

Tulis narasi sejarah dusun anda di sini...

## Potensi & Keunikan

Tulis potensi, keunikan, atau hal menarik dari dusun anda...
```

5. **Foto/gambar** ditaruh di `public/assets/dusun/<slug-dusun>/`, lalu direferensikan di frontmatter seperti contoh di atas. Kompres dulu foto anda (misal pakai [squoosh.app](https://squoosh.app), gratis) sebelum upload — foto besar memperlambat situs dan bisa menurunkan skor SEO.
6. Jalankan situs secara lokal untuk memastikan halaman anda tampil benar sebelum dikirim (lihat §3).
7. Commit perubahan anda dan buka **Pull Request** — jangan langsung push ke branch `main`. Beri judul PR yang jelas, contoh: `Tambah profil Dusun Jampiroso`.
8. Tunggu review sebelum di-merge (lihat §4 untuk kenapa ini penting).

### Yang TIDAK boleh diubah tanpa diskusi lebih dulu
- File `src/pages/profil-desa/Dusun.jsx` (template/layout) — ini dipakai bersama oleh semua 12 dusun. Kalau anda ubah, tampilan semua dusun lain ikut berubah.
- File CSS global di `src/styles/` — sama alasannya, ini menjaga branding tetap konsisten di seluruh situs.

Kalau anda merasa perlu elemen visual baru yang belum ada di template (misal galeri jenis baru), diskusikan dulu lewat Issue di repo ini sebelum membuat perubahan, supaya tidak merusak konsistensi 11 dusun lain.

---

## 2. Menambah/Update Data Lain (UMKM Umum, Galeri Desa)

Data yang bukan spesifik satu dusun (UMKM umum desa, galeri kegiatan desa) diisi lewat **Google Sheets**, bukan file di repo. Hubungi pemegang akses spreadsheet untuk mendapat akses edit. Tidak perlu coding untuk bagian ini.

---

## 3. Menjalankan Situs Secara Lokal

Prasyarat: [Node.js](https://nodejs.org) (versi LTS terbaru) sudah terinstall.

```bash
# 1. Install dependencies
npm install

# 2. Tarik data terbaru dari BPS & Google Sheets
npm run fetch-data

# 3. Jalankan mode development
npm run dev
```

Buka `http://localhost:5173` di browser. Perubahan pada file akan otomatis ter-refresh.

Untuk build versi production (simulasi seperti yang akan di-deploy):
```bash
npm run build
npm run preview
```

---

## 4. Kenapa Ada Proses Review (Pull Request)

Situs ini dipakai bersama oleh banyak dusun dan akan terus diisi oleh kelompok KKN yang berbeda-beda dari tahun ke tahun. Proses Pull Request (bukan langsung commit ke `main`) ada supaya:
- Ada kesempatan cek apakah format frontmatter sudah benar sebelum tayang (kesalahan format bisa membuat build gagal untuk **seluruh situs**, bukan cuma halaman dusun anda).
- Konsistensi branding & kualitas konten terjaga.
- Ada jejak riwayat siapa berkontribusi apa, kapan — berguna kalau ada pertanyaan di kemudian hari.

Kalau Pull Request anda belum direspon dalam waktu wajar, hubungi pemegang akses repo.

---

## 5. Pertanyaan?

Buka **Issue** baru di repository ini dengan penjelasan singkat kendala anda.
