import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { CATEGORY_LABELS } from "../../utils/mapIcons.jsx";

/**
 * Kotak pencarian lokasi titik (UMKM/Wisata/Fasilitas) di atas peta.
 * @param {{ items: Array<{id: string, nama: string, category: string, lat: number, lng: number}>, onSelectLocation: (lat: number, lng: number) => void }} props
 */
export default function SearchBox({ items, onSelectLocation }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return [];

    return items
      .filter((item) => item.nama.toLowerCase().includes(keyword))
      .slice(0, 6);
  }, [items, query]);

  const handleSelect = (item) => {
    onSelectLocation(item.lat, item.lng);
    setQuery(item.nama);
  };

  return (
    <div className="search-box">
      <div className="search-box__input-wrapper">
        <Search size={16} strokeWidth={2.2} />
        <input
          type="text"
          value={query}
          placeholder="Cari UMKM, wisata, atau fasilitas..."
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            type="button"
            className="search-box__clear"
            onClick={() => setQuery("")}
            aria-label="Hapus pencarian"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {results.length > 0 && (
        <ul className="search-box__results">
          {results.map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => handleSelect(item)}>
                <span className="search-box__result-name">{item.nama}</span>
                <span className="search-box__result-category">
                  {CATEGORY_LABELS[item.category]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
