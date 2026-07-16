import Header from '../../components/layout/Header'
import SEO from '../../lib/seo'
import { strukturOrganisasi } from '../../data/static/struktur-organisasi'
import './StrukturOrganisasi.css'

export default function StrukturOrganisasi() {
  const { kepalaDesa, sekretarisDesa, kepalaUrusan, kepalaSeksi, kepalaDusun } = strukturOrganisasi

  return (
    <div className="struktur-organisasi">
      {/* SEO Meta Tags */}
      <SEO 
        title="Struktur Organisasi"
        description="Bagan struktur organisasi dan susunan perangkat Pemerintahan Desa Karangtalun, Kabupaten Magelang, Jawa Tengah."
      />

      {/* Header Halaman */}
      <Header
        title="Struktur Organisasi"
        subtitle="Susunan Perangkat Pemerintahan Desa Karangtalun"
        green={true}
      />

      <div className="container struktur-org__content">
        {/* Intro Section */}
        <section className="struktur-org__intro">
          <p className="struktur-org__intro-text">
            Struktur organisasi pemerintahan Desa Karangtalun mengikuti ketentuan peraturan perundang-undangan 
            yang berlaku, dengan Kepala Desa sebagai pimpinan tertinggi yang dibantu oleh Sekretaris Desa, 
            Kepala Urusan, Kepala Seksi, dan Kepala Dusun.
          </p>
        </section>

        {/* Bagan Organisasi */}
        <div className="org-chart">
          
          {/* Level 1: Kepala Desa */}
          <div className="org-level org-level--1">
            <div className="org-card org-card--kades">
              <div className="org-card__icon">👤</div>
              <div className="org-card__content">
                <h3 className="org-card__nama">{kepalaDesa.nama}</h3>
                <p className="org-card__jabatan">{kepalaDesa.jabatan}</p>
              </div>
            </div>
          </div>

          {/* Connector Line */}
          <div className="org-connector org-connector--vertical" aria-hidden="true"></div>

          {/* Level 2: Sekretaris Desa */}
          <div className="org-level org-level--2">
            <div className="org-card org-card--sekdes">
              <div className="org-card__icon">📋</div>
              <div className="org-card__content">
                <h3 className="org-card__nama">{sekretarisDesa.nama}</h3>
                <p className="org-card__jabatan">{sekretarisDesa.jabatan}</p>
              </div>
            </div>
          </div>

          {/* Connector Line */}
          <div className="org-connector org-connector--vertical" aria-hidden="true"></div>

          {/* Level 3: Kepala Urusan & Kepala Seksi */}
          <div className="org-level org-level--3">
            
            {/* Kepala Urusan (Left Side) */}
            <div className="org-subsection">
              <h4 className="org-subsection__title">Kepala Urusan</h4>
              <div className="org-card-grid org-card-grid--kaur">
                {kepalaUrusan.map((kaur) => (
                  <div key={kaur.id} className="org-card org-card--kaur">
                    <div className="org-card__icon">💼</div>
                    <div className="org-card__content">
                      <h3 className="org-card__nama">{kaur.nama}</h3>
                      <p className="org-card__jabatan">{kaur.singkatan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kepala Seksi (Right Side) */}
            <div className="org-subsection">
              <h4 className="org-subsection__title">Kepala Seksi</h4>
              <div className="org-card-grid org-card-grid--kasi">
                {kepalaSeksi.map((kasi) => (
                  <div key={kasi.id} className="org-card org-card--kasi">
                    <div className="org-card__icon">🏢</div>
                    <div className="org-card__content">
                      <h3 className="org-card__nama">{kasi.nama}</h3>
                      <p className="org-card__jabatan">{kasi.singkatan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Connector Line */}
          <div className="org-connector org-connector--vertical" aria-hidden="true"></div>

          {/* Level 4: Kepala Dusun */}
          <div className="org-level org-level--4">
            <h4 className="org-subsection__title">Kepala Dusun (12 Dusun)</h4>
            <div className="org-card-grid org-card-grid--kadus">
              {kepalaDusun.map((kadus) => (
                <div key={kadus.id} className="org-card org-card--kadus">
                  <div className="org-card__icon">🌿</div>
                  <div className="org-card__content">
                    <h3 className="org-card__nama">{kadus.nama}</h3>
                    <p className="org-card__jabatan">Dusun {kadus.dusun}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Info Note */}
        <div className="struktur-org__note">
          <div className="note-card">
            <span className="note-card__icon">ℹ️</span>
            <div className="note-card__content">
              <h3>Catatan Data</h3>
              <p>
                Data di atas adalah struktur organisasi sementara yang akan diperbarui secara berkala. 
                Untuk informasi lebih lanjut atau konfirmasi data terbaru, silakan hubungi Kantor Desa Karangtalun.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
