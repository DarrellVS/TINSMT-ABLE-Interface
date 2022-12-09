import { useEffect, useMemo, useState } from "react";

export default function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (typeof document === "undefined" || !document) {
    return { isFullscreen: false };
  }

  document.onfullscreenchange = () => {
    setIsFullscreen(document.fullscreenElement !== null);
  };

  return { isFullscreen };
}
