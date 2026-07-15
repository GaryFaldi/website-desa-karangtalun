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
  dataPendidikan,
  dataPekerjaan,
  statistikPerDusun,
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
      <p className="stat-card__value">{typeof value === 'number' ? value.toLocaleString('id-ID') : value}</p>
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
  const { totalJiwa, totalKK, lakiLaki, perempuan, sexRatio, tahunData } = summaryDesa

  return (
    <div className="statistik-desa">
      <SEO
        title="Statistik Kependudukan Desa"
        description={`Data statistik kependudukan Desa Karangtalun tahun ${tahunData} — jumlah jiwa, komposisi jenis kelamin, kelompok umur, pendidikan, dan mata pencaharian.`}
      />

      <Header
        title="Statistik Kependudukan"
        subtitle={`Desa Karangtalun · Data Tahun ${tahunData}`}
        green
      />

      <div className="container statistik-desa__content">

        {/* Disclaimer */}
        <div className="data-notice" role="note">
          <span className="data-notice__icon">⚠️</span>
          <p>Data bersifat <strong>sementara</strong> dan akan diperbarui setelah verifikasi dengan administrasi desa dan BPS Kabupaten Magelang.</p>
        </div>

        {/* ── Summary Cards ── */}
        <section aria-labelledby="summary-title">
          <SectionTitle sub="Ringkasan data kependudukan seluruh desa">
            Ringkasan Data Desa
          </SectionTitle>
          <div className="stat-cards-grid">
            <StatCard icon="👥" value={totalJiwa}    label="Total Jiwa"           accent />
            <StatCard icon="🏠" value={totalKK}      label="Kepala Keluarga"                />
            <StatCard icon="👨" value={lakiLaki}     label="Laki-Laki"                      />
            <StatCard icon="👩" value={perempuan}    label="Perempuan"                      />
            <StatCard icon="⚖️" value={`${sexRatio}`} label="Sex Ratio" sub="per 100 perempuan" />
            <StatCard icon="🏘️" value={12}           label="Dusun"                          />
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
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={dataJenisKelamin}
                    dataKey="value"
                    nameKey="name"
                    cx="50%" cy="50%"
                    innerRadius={60} outerRadius={100}
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
              <h3 className="chart-card__title">Kelompok Umur</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={dataKelompokUmur} margin={{ top: 0, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="umur" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="laki"      name="Laki-Laki"  fill="#96D539" radius={[3,3,0,0]} />
                  <Bar dataKey="perempuan" name="Perempuan"  fill="#1B4332" radius={[3,3,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* ── Pendidikan & Pekerjaan ── */}
        <section className="charts-row" aria-labelledby="sosial-title">
          <SectionTitle sub="Tingkat pendidikan dan mata pencaharian warga desa">
            Profil Sosial-Ekonomi
          </SectionTitle>

          <div className="charts-row__grid">
            {/* Bar: Pendidikan */}
            <div className="chart-card">
              <h3 className="chart-card__title">Tingkat Pendidikan</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={dataPendidikan} layout="vertical" margin={{ top: 0, right: 16, left: 60, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="label" tick={{ fontSize: 11 }} width={90} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="jumlah" name="Jumlah" fill="#96D539" radius={[0,3,3,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Bar: Pekerjaan */}
            <div className="chart-card">
              <h3 className="chart-card__title">Mata Pencaharian</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={dataPekerjaan} layout="vertical" margin={{ top: 0, right: 16, left: 70, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="label" tick={{ fontSize: 11 }} width={110} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="jumlah" name="Jumlah" fill="#1B4332" radius={[0,3,3,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* ── Tabel Per Dusun ── */}
        <section aria-labelledby="tabel-dusun-title">
          <SectionTitle sub="Ringkasan jumlah penduduk di setiap dusun">
            Rekap Penduduk Per Dusun
          </SectionTitle>

          <div className="tabel-wrapper">
            <table className="tabel-dusun" aria-label="Data kependudukan per dusun">
              <thead>
                <tr>
                  <th>Dusun</th>
                  <th>Jiwa</th>
                  <th>KK</th>
                  <th>Laki-Laki</th>
                  <th>Perempuan</th>
                  <th>Sex Ratio</th>
                </tr>
              </thead>
              <tbody>
                {statistikPerDusun.map((d) => (
                  <tr key={d.slug}>
                    <td><strong>{d.nama}</strong></td>
                    <td>{d.jiwa.toLocaleString('id-ID')}</td>
                    <td>{d.kk.toLocaleString('id-ID')}</td>
                    <td>{d.laki.toLocaleString('id-ID')}</td>
                    <td>{d.perempuan.toLocaleString('id-ID')}</td>
                    <td>{Math.round((d.laki / d.perempuan) * 100)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td><strong>Total Desa</strong></td>
                  <td><strong>{totalJiwa.toLocaleString('id-ID')}</strong></td>
                  <td><strong>{totalKK.toLocaleString('id-ID')}</strong></td>
                  <td><strong>{lakiLaki.toLocaleString('id-ID')}</strong></td>
                  <td><strong>{perempuan.toLocaleString('id-ID')}</strong></td>
                  <td><strong>{sexRatio}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

      </div>
    </div>
  )
}
