import { Layers, Store, Camera, Building2, Shapes, Waypoints } from "lucide-react";

const LAYER_OPTIONS = [
  { key: "batasDesa", label: "Batas Desa", Icon: Shapes },
  { key: "batasDusun", label: "Batas Dusun", Icon: Waypoints },
  { key: "umkm", label: "UMKM", Icon: Store },
  { key: "wisata", label: "Wisata", Icon: Camera },
  { key: "fasilitas", label: "Fasilitas Umum", Icon: Building2 },
];

/**
 * Panel untuk mengaktifkan/menonaktifkan layer pada peta.
 * @param {{ layers: Record<string, boolean>, onToggle: (key: string) => void }} props
 */
export default function LayerControl({ layers, onToggle }) {
  return (
    <div className="layer-control">
      <div className="layer-control__header">
        <Layers size={16} strokeWidth={2.2} />
        <span>Layer Peta</span>
      </div>

      <ul className="layer-control__list">
        {LAYER_OPTIONS.map(({ key, label, Icon }) => (
          <li key={key} className="layer-control__item">
            <label className="layer-control__label">
              <input
                type="checkbox"
                checked={layers[key]}
                onChange={() => onToggle(key)}
              />
              <span className="layer-control__checkbox" aria-hidden="true" />
              <Icon size={15} strokeWidth={2.2} />
              <span>{label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
