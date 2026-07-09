/**
 * Menggabungkan beberapa dataset titik menjadi satu daftar datar
 * yang siap dipakai oleh SearchBox, masing-masing item diberi tag kategori.
 *
 * @param {{ umkm: Array<object>, wisata: Array<object>, fasilitas: Array<object> }} datasets
 */
export function buildSearchIndex({ umkm, wisata, fasilitas }) {
  const tag = (items, category) => items.map((item) => ({ ...item, category }));

  return [
    ...tag(umkm, "umkm"),
    ...tag(wisata, "wisata"),
    ...tag(fasilitas, "fasilitas"),
  ];
}
