import {
  ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend,
} from 'recharts'
import Header from '../../components/layout/Header'
import SEO from '../../lib/seo'
import {
  summaryDesa,
  dataJenisKelamin,
  dataKelompokUmur,
} from '../../data/static/statistik-kependudukan'
import './StatistikDesa.css'

// ─── Custom Tooltip ──────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      {label && <p className="chart-tooltip__label">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.fill || p.color }}>
          {p.name}: <strong>{p.value.toLocaleString('id-ID')}</strong>
        </p>
      ))}
    </div>
  )
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ icon, value, label, sub, accent }) {
  return (
    <div className={`stat-card ${accent ? 'stat-card--accent' : ''}`}>
      <span className="stat-card__icon" aria-hidden="true">{icon}</span>
      <p className="stat-card__value">
        {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
      </p>
      <p className="stat-card__label">{label}</p>
      {sub && <p className="stat-card__sub">{sub}</p>}
    </div>
  )
}

// ─── Section Header ──────────────────────────────────────────────────────────
function SectionTitle({ children, sub }) {
  return (
    <div className="section-heading">
      <h2 className="section-heading__title">{children}</h2>
      {sub && <p className="section-heading__sub">{sub}</p>}
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function StatistikDesa() {
  const {
    totalJiwa, totalKK, kkPerempuan,
    jumlahRumah, lakiLaki, perempuan,
    sexRatio, pengangguran,
    tahunData, sumberData,
  } = summaryDesa

  return (
    <div className="statistik-desa">
      <SEO
        title="Statistik Kependudukan Desa"
        description={`Data statistik kependudukan Desa Karangtalun tahun ${tahunData} — jumlah jiwa, komposisi jenis kelamin, dan struktur usia penduduk.`}
      />

      <Header
        title="Statistik Kependudukan"
        subtitle={`Desa Karangtalun · Data Tahun ${tahunData}`}
        green
      />

      <div className="container statistik-desa__content">

        {/* Sumber Data */}
        <div className="data-notice" role="note">
          <span className="data-notice__icon">📋</span>
          <p>
            Sumber: <strong>{sumberData}</strong>. Data diperbarui berdasarkan
            kuesioner indeks desa tahun {tahunData} dengan progress pengisian{' '}
            <strong>99,79%</strong>.
          </p>
        </div>

        {/* ── Summary Cards ── */}
        <section aria-labelledby="summary-title">
          <SectionTitle sub="Ringkasan data kependudukan seluruh desa">
            Ringkasan Data Desa
          </SectionTitle>

          {/* Baris 1 — data utama */}
          <div className="stat-cards-grid stat-cards-grid--main">
            <StatCard icon="👥" value={totalJiwa}  label="Total Jiwa"       sub="jiwa" />
            <StatCard icon="👨" value={lakiLaki}   label="Laki-Laki"        sub="jiwa" />
            <StatCard icon="👩" value={perempuan}  label="Perempuan"        sub="jiwa" />
          </div>

          {/* Baris 2 — data rumah tangga & lainnya */}
          <div className="stat-cards-grid stat-cards-grid--secondary">
            <StatCard icon="🏠" value={totalKK}      label="Kepala Keluarga"     sub={`${kkPerempuan.toLocaleString('id-ID')} KK Perempuan`} />
            <StatCard icon="🏡" value={jumlahRumah}  label="Rumah Dihuni"        sub="unit" />
            <StatCard icon="📊" value={`${sexRatio}`} label="Sex Ratio"          sub="per 100 perempuan" />
            <StatCard icon="🏘️" value={10}            label="Jumlah Dusun"       sub="dusun" />
            <StatCard icon="🔍" value={pengangguran}  label="Pengangguran Terbuka" sub="jiwa" />
          </div>
        </section>

        {/* ── Jenis Kelamin & Kelompok Umur ── */}
        <section className="charts-row" aria-labelledby="demografi-title">
          <SectionTitle sub="Komposisi penduduk berdasarkan jenis kelamin dan usia">
            Demografi Penduduk
          </SectionTitle>

          <div className="charts-row__grid">
            {/* Pie: Jenis Kelamin */}
            <div className="chart-card">
              <h3 className="chart-card__title">Komposisi Jenis Kelamin</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={dataJenisKelamin}
                    dataKey="value"
                    nameKey="name"
                    cx="50%" cy="50%"
                    innerRadius={65} outerRadius={105}
                    paddingAngle={4}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                    labelLine={false}
                  >
                    {dataJenisKelamin.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar: Kelompok Umur */}
            <div className="chart-card chart-card--wide">
              <h3 className="chart-card__title">Struktur Usia Penduduk</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={dataKelompokUmur} margin={{ top: 0, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="umur" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="laki"      name="Laki-Laki" fill="#96D539" radius={[3,3,0,0]} />
                  <Bar dataKey="perempuan" name="Perempuan" fill="#1B4332" radius={[3,3,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
