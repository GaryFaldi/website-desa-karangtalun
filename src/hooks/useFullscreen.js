import { useCallback, useEffect, useState } from "react";

/**
 * Mengaktifkan/menonaktifkan mode fullscreen pada elemen yang direferensikan.
 * @param {React.RefObject<HTMLElement>} targetRef
 */
export function useFullscreen(targetRef) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    const el = targetRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {
        // Diabaikan: beberapa browser/mobile tidak mendukung Fullscreen API.
      });
    } else {
      document.exitFullscreen?.();
    }
  }, [targetRef]);

  useEffect(() => {
    const handleChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  return { isFullscreen, toggleFullscreen };
}
