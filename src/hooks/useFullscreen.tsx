import { useCallback, useEffect, useMemo, useState } from "react";

export default function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const setState = useCallback(() => {
    setIsFullscreen(document.fullscreenElement !== null);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (typeof document === "undefined" || !document) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || !document) return;

    document.addEventListener("fullscreenchange", setState);

    return () => {
      document.removeEventListener("fullscreenchange", setState);
    };
  }, [setState]);

  return { isFullscreen, toggleFullscreen };
}
