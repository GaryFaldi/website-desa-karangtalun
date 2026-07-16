import matter from 'gray-matter'

/**
 * loadDusunData.js
 * Helper untuk membaca dan memproses semua file markdown di src/data/dusun/
 * Menggunakan fitur import.meta.glob dari Vite (PRD §6.3).
 */

// Baca semua file .md di folder dusun secara eager dan ambil konten raw-nya
const mdFiles = import.meta.glob('/src/data/dusun/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/**
 * Mendapatkan semua data dusun yang valid (mengabaikan file yang diawali underscore seperti _template.md)
 * @returns {Array<{ slug: string, frontmatter: Object, content: string }>}
 */
export function getAllDusun() {
  const dusunList = []

  for (const [path, rawContent] of Object.entries(mdFiles)) {
    // Abaikan template atau file hidden
    const fileName = path.split('/').pop()
    if (fileName.startsWith('_')) continue

    try {
      const { data: frontmatter, content } = matter(rawContent)
      
      // Gunakan slug dari frontmatter, atau fallback dari nama file
      const slug = frontmatter.slug || fileName.replace(/\.md$/, '')

      dusunList.push({
        slug,
        frontmatter,
        content,
      })
    } catch (err) {
      console.error(`[loadDusunData] Gagal memparsing file: ${path}`, err)
    }
  }

  return dusunList
}

/**
 * Mendapatkan data satu dusun berdasarkan slug
 * @param {string} slug 
 * @returns {Object|null} { slug, frontmatter, content } atau null jika belum dibuat
 */
export function getDusunBySlug(slug) {
  const allDusun = getAllDusun()
  return allDusun.find((d) => d.slug === slug) || null
}

/**
 * Daftar semua slug standar 12 dusun di Desa Karangtalun
 * Dipakai untuk validasi atau pembuatan skeleton di UI
 */
export const ALL_DUSUN_SLUGS = [
  { slug: 'baran',          label: 'Baran' },
  { slug: 'dangkel-kulon',  label: 'Dangkel Kulon' },
  { slug: 'dangkel-wetan',  label: 'Dangkel Wetan' },
  { slug: 'jambon',         label: 'Jambon' },
  { slug: 'jampiroso',      label: 'Jampiroso' },
  { slug: 'jangkang',       label: 'Jangkang' },
  { slug: 'jangkang-a',     label: 'Jangkang A' },
  { slug: 'jangkang-b',     label: 'Jangkang B' },
  { slug: 'joho',           label: 'Joho' },
  { slug: 'kajoran',        label: 'Kajoran' },
  { slug: 'karangtalun',    label: 'Karangtalun' },
  { slug: 'selingan',       label: 'Selingan' },
]
