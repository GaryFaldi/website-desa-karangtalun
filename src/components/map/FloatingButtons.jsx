import { Maximize2, Minimize2, RotateCcw } from "lucide-react";

/**
 * Tombol aksi mengambang di atas peta: reset tampilan & fullscreen.
 * Zoom control ditangani terpisah oleh Leaflet ZoomControl bawaan.
 * @param {{ isFullscreen: boolean, onToggleFullscreen: () => void, onReset: () => void }} props
 */
export default function FloatingButtons({ isFullscreen, onToggleFullscreen, onReset }) {
  return (
    <div className="floating-buttons">
      <button
        type="button"
        className="floating-buttons__btn"
        onClick={onReset}
        title="Reset tampilan peta"
        aria-label="Reset tampilan peta"
      >
        <RotateCcw size={17} strokeWidth={2.2} />
      </button>

      <button
        type="button"
        className="floating-buttons__btn"
        onClick={onToggleFullscreen}
        title={isFullscreen ? "Keluar dari layar penuh" : "Layar penuh"}
        aria-label={isFullscreen ? "Keluar dari layar penuh" : "Layar penuh"}
      >
        {isFullscreen ? (
          <Minimize2 size={17} strokeWidth={2.2} />
        ) : (
          <Maximize2 size={17} strokeWidth={2.2} />
        )}
      </button>
    </div>
  );
}
