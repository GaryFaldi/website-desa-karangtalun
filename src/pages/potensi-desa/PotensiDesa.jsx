import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import SEO from "../../lib/seo";
import "./PotensiDesa.css";
import WISATA_ALAM from "../../data/static/wisata.json"

function PotensiDesa() {
  return (
    <div className="potensi-desa">
      <SEO
        title="Potensi Desa"
        description="Profil potensi unggulan Desa Karangtalun: pertanian, perkebunan, wisata alam, dan tambak ikan."
      />

      <Header
        title="Potensi Desa"
        subtitle="Mengenal lebih dekat potensi unggulan Desa Karangtalun — dari sawah, kebun, destinasi wisata, hingga tambak ikan warga."
        green
      />

      <div className="potensi-desa__content container">
        {/* ═══ Pengantar ═══ */}
        <section className="potensi-intro">
          <p className="potensi-intro__text">
            Terletak di pesisir Jawa Tengah dengan hutan yang lebat dan aliran air yang melimpah, Desa
            Karangtalun tumbuh sebagai desa agraris yang menggantungkan
            sebagian besar perekonomiannya pada hasil bumi. Berikut adalah
            profil potensi unggulan yang menjadi tulang punggung kehidupan
            warga.
          </p>
        </section>

        {/* ═══ Pertanian ═══ */}
        <section className="potensi-section" id="pertanian">
          <div className="potensi-section__media potensi-section__media--pertanian">
            <img
              src="../../assets/potensi/sawah.jpg"
              alt="Sawah pertanian Desa Karangtalun"
              loading="lazy"
            />
          </div>
          <div className="potensi-section__content">
            <span className="potensi-section__eyebrow">🌾 Pertanian</span>
            <h2 className="potensi-section__title">
              Sawah yang Menopang Kehidupan Warga
            </h2>
            <p className="potensi-section__desc">
              Hamparan sawah menjadi wajah utama Desa Karangtalun. Sebagian
              besar warga bekerja sebagai petani padi, memanfaatkan aliran
              irigasi dari bendung-bendung di sekitar desa untuk menjaga
              produktivitas lahan sepanjang musim. Hasil panen padi menjadi
              sumber pangan sekaligus penggerak ekonomi rumah tangga di desa.
            </p>
            <div className="potensi-tags">
              <span className="potensi-tag">Padi Sawah</span>
              <span className="potensi-tag">Irigasi Bendung Desa</span>
              <span className="potensi-tag">Gabah &amp; Beras</span>
            </div>
          </div>
        </section>

        {/* ═══ Perkebunan ═══ */}
        <section className="potensi-section potensi-section--reverse" id="perkebunan">
          <div className="potensi-section__media potensi-section__media--perkebunan">
            <img
              src="../../assets/potensi/tembakau.jpg"
              alt="Lahan perkebunan Desa Karangtalun"
              loading="lazy"
            />
          </div>
          <div className="potensi-section__content">
            <span className="potensi-section__eyebrow">🌽 Perkebunan</span>
            <h2 className="potensi-section__title">
              Palawija di Sela Musim Tanam
            </h2>
            <p className="potensi-section__desc">
              Selain padi, warga juga memanfaatkan lahan tegalan dan pekarangan
              untuk menanam beragam komoditas palawija. Jagung dan tembakau
              menjadi andalan saat musim kemarau, sementara sayur-sayuran dan
              cabai ditanam bergiliran untuk memenuhi kebutuhan pasar harian.
            </p>
            <div className="potensi-tags">
              <span className="potensi-tag">Jagung</span>
              <span className="potensi-tag">Tembakau</span>
              <span className="potensi-tag">Sayur-sayuran</span>
              <span className="potensi-tag">Cabai</span>
            </div>
          </div>
        </section>

        {/* ═══ Wisata Alam ═══ */}
        <section className="potensi-section-wisata" id="wisata">
          <div className="potensi-section-wisata__intro">
            <span className="potensi-section__eyebrow">🏞️ Wisata Alam</span>
            <h2 className="potensi-section__title">
              Kesejukan di Sepanjang Aliran Sungai
            </h2>
            <p className="potensi-section__desc">
              Desa Karangtalun memiliki beberapa titik wisata alam yang
              memanfaatkan keberadaan bendung dan aliran sungai di sekitar
              desa. Suasana rindang dan udara segar menjadikannya tempat
              favorit warga untuk bersantai bersama keluarga.
            </p>
          </div>

          <div className="potensi-wisata-list">
            {WISATA_ALAM.map((wisata) => (
              <article className="potensi-wisata-item" key={wisata.id}>
                <div className="potensi-wisata-item__media">
                  <img src={wisata.gambar} alt={wisata.nama} loading="lazy" />
                </div>
                <div className="potensi-wisata-item__body">
                  <h3 className="potensi-wisata-item__title">{wisata.nama}</h3>
                  <p className="potensi-wisata-item__desc">{wisata.deskripsi}</p>
                  <a
                    className="potensi-wisata-item__lokasi"
                    href={`https://maps.google.com/?q=${wisata.lat},${wisata.lng}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📍 {wisata.alamat}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ═══ Tambak Ikan ═══ */}
        <section className="potensi-section" id="tambak-ikan">
          <div className="potensi-section__media potensi-section__media--tambak">
            <img
              src="../../assets/potensi/mina-padi.jpg"
              alt="Tambak ikan warga Desa Karangtalun"
              loading="lazy"
            />
          </div>
          <div className="potensi-section__content">
            <span className="potensi-section__eyebrow">🐟 Tambak Ikan</span>
            <h2 className="potensi-section__title">
              Kolam Warga di Antara Lahan Sawah
            </h2>
            <p className="potensi-section__desc">
              Memanfaatkan sumber air yang melimpah dari sistem irigasi desa,
              sejumlah warga mengelola tambak ikan air tawar sebagai usaha
              sampingan. Hasil budidaya ini menjadi tambahan penghasilan
              sekaligus memenuhi kebutuhan konsumsi ikan warga sehari-hari.
            </p>
            <div className="potensi-tags">
              <span className="potensi-tag">Ikan Air Tawar</span>
              <span className="potensi-tag">Budidaya Kolam Warga</span>
            </div>
          </div>
        </section>

        {/* ═══ Potensi Lainnya ═══ */}
        <section className="potensi-lainnya">
          <h3 className="potensi-lainnya__title">Potensi Lainnya yang Terus Berkembang</h3>
          <p className="potensi-lainnya__desc">
            Di luar empat sektor utama di atas, warga Desa Karangtalun juga
            aktif mengembangkan usaha mikro (UMKM), peternakan skala rumahan,
            serta menjaga warisan budaya dan tradisi lokal yang terus
            diwariskan lintas generasi.
          </p>
        </section>

        {/* ═══ CTA Peta Interaktif ═══ */}
        <section className="potensi-cta">
          <div className="cta-card">
            <div className="cta-card__content">
              <h3>Masih banyak potensi yang dapat dikembangkan.</h3>
              <p>
                Jelajahi persebaran potensi melalui peta interaktif desa
                untuk melihat lokasi setiap potensi secara langsung.
              </p>
            </div>
            <Link to="/peta-lokasi/peta-interaktif" className="cta-card__link">
              Buka Peta Interaktif →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PotensiDesa;
