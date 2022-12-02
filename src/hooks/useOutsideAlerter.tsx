import { useEffect } from "react";
import { eventListenerManager } from "../utils/interactionWrapper";

export default function useOutsideAlerter(ref: any, cb: () => void) {
  function handleClickOutside(event: MouseEvent | TouchEvent) {
    if (ref.current && !ref.current.contains(event.target)) {
      cb();
    }
  }

  const eventManager = eventListenerManager({
    start: handleClickOutside,
    move: handleClickOutside,
    end: handleClickOutside,
  });

  useEffect(() => {
    // eventManager.down.add();
    return () => {
      // eventManager.down.remove();
    };
  }, [cb, eventManager.down, ref]);
}
