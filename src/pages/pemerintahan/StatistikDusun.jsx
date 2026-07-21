import { useState } from 'react'
import {
  ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend,
} from 'recharts'
import Header from '../../components/layout/Header'
import SEO from '../../lib/seo'
import { statistikPerDusun } from '../../data/static/statistik-kependudukan'
import './StatistikDusun.css'

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

// ─── Stat Mini Card ──────────────────────────────────────────────────────────
function MiniCard({ icon, value, label, accent }) {
  return (
    <div className={`mini-card ${accent ? 'mini-card--accent' : ''}`}>
      <span className="mini-card__icon" aria-hidden="true">{icon}</span>
      <div>
        <p className="mini-card__value">{typeof value === 'number' ? value.toLocaleString('id-ID') : value}</p>
        <p className="mini-card__label">{label}</p>
      </div>
    </div>
  )
}

// ─── Dusun Selector ──────────────────────────────────────────────────────────
function DusunSelector({ dusunList, selected, onChange }) {
  return (
    <div className="dusun-selector" role="navigation" aria-label="Pilih Dusun">
      <p className="dusun-selector__label">Pilih Dusun:</p>
      <div className="dusun-selector__chips">
        {dusunList.map((d) => (
          <button
            key={d.slug}
            id={`dusun-btn-${d.slug}`}
            className={`dusun-chip ${selected === d.slug ? 'dusun-chip--active' : ''}`}
            onClick={() => onChange(d.slug)}
            aria-pressed={selected === d.slug}
          >
            {d.nama}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function StatistikDusun() {
  const [selectedSlug, setSelectedSlug] = useState(statistikPerDusun[0].slug)

  const dusun = statistikPerDusun.find(d => d.slug === selectedSlug) ?? statistikPerDusun[0]

  // Buat data bar chart perbandingan jenis kelamin untuk semua dusun
  const dataPerbandingan = statistikPerDusun.map(d => ({
    nama: d.nama.replace('Dusun ', ''),
    'Laki-Laki': d.laki,
    'Perempuan': d.perempuan,
    isSelected: d.slug === selectedSlug,
  }))

  return (
    <div className="statistik-dusun">
      <SEO
        title="Statistik Kependudukan Dusun"
        description="Data statistik kependudukan per dusun di Desa Karangtalun — perbandingan jumlah jiwa, KK, dan komposisi penduduk 10 dusun."
      />

      <Header
        title="Statistik Per Dusun"
        subtitle="Perbandingan data kependudukan 10 dusun · Desa Karangtalun"
        green
      />

      <div className="container statistik-dusun__content">

        {/* Disclaimer */}
        <div className="data-notice" role="note">
          <span className="data-notice__icon">⚠️</span>
          <p>Data bersifat <strong>sementara</strong> dan akan diperbarui setelah verifikasi dengan administrasi desa dan BPS Kabupaten Magelang.</p>
        </div>

        {/* ── Selector Dusun ── */}
        <DusunSelector
          dusunList={statistikPerDusun}
          selected={selectedSlug}
          onChange={setSelectedSlug}
        />

        {/* ── Detail Dusun Terpilih ── */}
        <section className="dusun-detail" aria-live="polite" aria-label={`Detail ${dusun.nama}`}>
          <div className="dusun-detail__header">
            <span className="dusun-detail__badge">Data Dusun</span>
            <h2 className="dusun-detail__name">Dusun {dusun.nama}</h2>
          </div>

          {/* Mini Cards */}
          <div className="mini-cards-grid">
            <MiniCard icon="👥" value={dusun.jiwa}        label="Total Jiwa"        accent />
            <MiniCard icon="🏠" value={dusun.kk}          label="Kepala Keluarga"          />
            <MiniCard icon="👨" value={dusun.laki}        label="Laki-Laki"                />
            <MiniCard icon="👩" value={dusun.perempuan}   label="Perempuan"                />
            <MiniCard icon="💪" value={dusun.umurProduktif} label="Usia Produktif (15–59)" />
            <MiniCard icon="👴" value={dusun.lansia}      label="Lansia (60+)"             />
          </div>

          {/* Pie Chart Gender */}
          <div className="dusun-chart-wrapper">
            <h3 className="dusun-chart__title">Komposisi Jenis Kelamin</h3>
            <div className="dusun-pie-container">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={dusun.jenisKelamin}
                    dataKey="value"
                    nameKey="name"
                    cx="50%" cy="50%"
                    innerRadius={55} outerRadius={90}
                    paddingAngle={4}
                    label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
                    labelLine={false}
                  >
                    {dusun.jenisKelamin.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* ── Perbandingan Semua Dusun ── */}
        <section aria-labelledby="perbandingan-title">
          <div className="section-heading">
            <h2 className="section-heading__title">Perbandingan Semua Dusun</h2>
            <p className="section-heading__sub">Jumlah jiwa laki-laki dan perempuan per dusun</p>
          </div>
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={dataPerbandingan}
                margin={{ top: 8, right: 8, left: -8, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="nama"
                  tick={{ fontSize: 10 }}
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '8px' }} />
                <Bar dataKey="Laki-Laki" fill="#96D539" radius={[3,3,0,0]} />
                <Bar dataKey="Perempuan" fill="#1B4332" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ── Tabel Ringkas ── */}
        <section aria-labelledby="tabel-rank-title">
          <div className="section-heading">
            <h2 className="section-heading__title">Peringkat Dusun</h2>
            <p className="section-heading__sub">Urutan berdasarkan jumlah penduduk (terbanyak)</p>
          </div>
          <div className="tabel-wrapper">
            <table className="tabel-dusun" aria-label="Peringkat penduduk per dusun">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Dusun</th>
                  <th>Jiwa</th>
                  <th>KK</th>
                  <th>Rata-rata / KK</th>
                </tr>
              </thead>
              <tbody>
                {[...statistikPerDusun]
                  .sort((a, b) => b.jiwa - a.jiwa)
                  .map((d, i) => (
                    <tr
                      key={d.slug}
                      className={d.slug === selectedSlug ? 'tabel-row--active' : ''}
                      onClick={() => setSelectedSlug(d.slug)}
                      style={{ cursor: 'pointer' }}
                      title={`Lihat detail ${d.nama}`}
                    >
                      <td>{i + 1}</td>
                      <td><strong>{d.nama}</strong></td>
                      <td>{d.jiwa.toLocaleString('id-ID')}</td>
                      <td>{d.kk.toLocaleString('id-ID')}</td>
                      <td>{(d.jiwa / d.kk).toFixed(1)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <p className="tabel-note">💡 Klik baris untuk melihat detail dusun.</p>
        </section>

      </div>
    </div>
  )
}
