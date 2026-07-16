import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "../../utils/mapIcons.jsx";

const LEGEND_ITEMS = [
  { type: "polygon", label: "Batas Desa", color: "#1e7145" },
  { type: "point", label: CATEGORY_LABELS.umkm, color: CATEGORY_COLORS.umkm },
  { type: "point", label: CATEGORY_LABELS.wisata, color: CATEGORY_COLORS.wisata },
  { type: "point", label: CATEGORY_LABELS.fasilitas, color: CATEGORY_COLORS.fasilitas },
];

/** Legenda peta — bisa dilipat (collapse) untuk layar kecil. */
export default function MapLegend() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="map-legend">
      <button
        type="button"
        className="map-legend__header"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span>Legenda</span>
        {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </button>

      {isOpen && (
        <ul className="map-legend__list">
          {LEGEND_ITEMS.map((item) => (
            <li key={item.label} className="map-legend__item">
              <span
                className={
                  item.type === "polygon"
                    ? "map-legend__swatch map-legend__swatch--polygon"
                    : "map-legend__swatch map-legend__swatch--point"
                }
                style={{ "--swatch-color": item.color }}
              />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
