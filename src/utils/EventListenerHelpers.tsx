import { RefObject } from "react";

interface Props {
  ref?: RefObject<HTMLDivElement>;
  start: (e: MouseEvent | TouchEvent) => void;
  move: (e: MouseEvent | TouchEvent) => void;
  end: (e: MouseEvent | TouchEvent) => void;
}

export function getPositionForEvent(e: MouseEvent | TouchEvent) {
  if (e instanceof MouseEvent) {
    return { clientX: e.clientX, clientY: e.clientY };
  } else {
    return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
  }
}

export function eventListenerManager({ ref, start, move, end }: Props) {
  function getRef() {
    return ref?.current || document;
  }

  function addMouseDown() {
    const ref = getRef();
    ref.addEventListener("mousedown", (e) => {
      if (e instanceof MouseEvent || e instanceof TouchEvent) {
        start(e);
      }
    });
    ref.addEventListener("touchstart", (e) => {
      if (e instanceof MouseEvent || e instanceof TouchEvent) {
        start(e);
      }
    });
  }

  function removeMouseDown() {
    const ref = getRef();
    ref.removeEventListener("mousedown", (e) => {
      if (e instanceof MouseEvent || e instanceof TouchEvent) {
        start(e);
      }
    });
    ref.removeEventListener("touchstart", (e) => {
      if (e instanceof MouseEvent || e instanceof TouchEvent) {
        start(e);
      }
    });
  }

  function addMouseMove() {
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);
  }

  function removeMouseMove() {
    window.removeEventListener("mousemove", move);
    window.removeEventListener("touchmove", move);
  }

  function addMouseUp() {
    window.addEventListener("mouseup", end);
    window.addEventListener("touchend", end);
  }

  function removeMouseUp() {
    window.removeEventListener("mouseup", end);
    window.removeEventListener("touchend", end);
  }

  return {
    down: {
      add: addMouseDown,
      remove: removeMouseDown,
    },
    move: {
      add: addMouseMove,
      remove: removeMouseMove,
    },
    up: {
      add: addMouseUp,
      remove: removeMouseUp,
    },
  };
}
