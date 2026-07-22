import jsYaml from 'js-yaml'

/**
 * loadDusunData.js
 * Helper untuk membaca dan memproses semua file markdown di src/data/dusun/
 * Menggunakan fitur import.meta.glob dari Vite.
 */

// Baca semua file .md di folder dusun secara eager dan ambil konten raw-nya
const mdFiles = import.meta.glob('../data/dusun/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/**
 * Parser frontmatter berbasis js-yaml murni (100% aman di browser & Node.js)
 */
function parseFrontmatter(rawContent) {
  if (!rawContent || typeof rawContent !== 'string') {
    return { data: {}, content: '' }
  }

  const lines = rawContent.split('\n')
  if (lines[0].trim() !== '---') {
    return { data: {}, content: rawContent }
  }

  let endIdx = -1
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      endIdx = i
      break
    }
  }

  if (endIdx === -1) {
    return { data: {}, content: rawContent }
  }

  const yamlStr = lines.slice(1, endIdx).join('\n')
  const bodyContent = lines.slice(endIdx + 1).join('\n')

  try {
    const data = jsYaml.load(yamlStr) || {}
    return { data, content: bodyContent }
  } catch (err) {
    console.error('[loadDusunData] Gagal memparsing YAML frontmatter:', err)
    return { data: {}, content: bodyContent }
  }
}

/**
 * Mendapatkan semua data dusun yang valid
 * @returns {Array<{ slug: string, frontmatter: Object, content: string }>}
 */
export function getAllDusun() {
  const dusunList = []

  for (const [path, rawContent] of Object.entries(mdFiles)) {
    const fileName = path.split('/').pop()
    if (fileName.startsWith('_')) continue

    try {
      const parsed = parseFrontmatter(rawContent)
      const frontmatter = parsed.data || {}
      const content = parsed.content || ''
      const slug = frontmatter.slug || fileName.replace(/\.md$/, '')

      dusunList.push({
        slug,
        frontmatter,
        content,
      })
    } catch (err) {
      console.error(`[loadDusunData] Gagal memproses file: ${path}`, err)
    }
  }

  return dusunList
}

/**
 * Mendapatkan data satu dusun berdasarkan slug
 * @param {string} slug 
 * @returns {Object|null}
 */
export function getDusunBySlug(slug) {
  const allDusun = getAllDusun()
  return allDusun.find((d) => d.slug === slug) || null
}

/**
 * Daftar semua slug standar 10 dusun di Desa Karangtalun
 */
export const ALL_DUSUN_SLUGS = [
  { slug: 'dangkel-kulon',  label: 'Dangkel Kulon' },
  { slug: 'dangkel-wetan',  label: 'Dangkel Wetan' },
  { slug: 'jambon',         label: 'Jambon' },
  { slug: 'jampiroso',      label: 'Jampiroso' },
  { slug: 'jangkang-a',     label: 'Jangkang A' },
  { slug: 'jangkang-b',     label: 'Jangkang B' },
  { slug: 'joho',           label: 'Joho' },
  { slug: 'kajoran',        label: 'Kajoran' },
  { slug: 'karangtalun',    label: 'Karangtalun' },
  { slug: 'selingan',       label: 'Selingan' },
]
