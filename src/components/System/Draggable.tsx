import { Box } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { getPositionForEvent } from "../../utils/EventListenerHelpers";

const defaultOptions = {
  axis: {
    x: true,
    y: true,
  },
};

export default function Draggable({
  children,
  draggableRef,
  handleRef,
  options,
}: {
  children: React.ReactNode;
  draggableRef: React.RefObject<HTMLDivElement>;
  handleRef?: React.RefObject<HTMLDivElement>;
  options?: {
    axis?: {
      x?: boolean;
      y?: boolean;
    };
    onStart?: (x: number, y: number) => void;
    onMove?: (x: number, y: number) => void;
    onEnd?: (x: number, y: number) => void;
  };
}) {
  const opts = useMemo(() => ({ ...defaultOptions, ...options }), [options]);

  const handleMouseDown = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const { current } = draggableRef;
      if (!current) return;

      const { clientX, clientY } = getPositionForEvent(e);
      const { offsetLeft, offsetTop } = current;

      const x = clientX - offsetLeft;
      const y = clientY - offsetTop;

      if (opts?.onStart) {
        opts.onStart(clientX, clientY);
      }

      const handleMouseMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const { clientX, clientY } = getPositionForEvent(e);

        // Keep element within bounds
        const { bottom, height, width } = current.getBoundingClientRect();
        const newY =
          bottom >= window.innerHeight
            ? Math.max(0, Math.min(clientY - y, window.innerHeight - height))
            : Math.max(0, Math.min(clientY - y, window.innerHeight));

        const newX =
          clientX + width >= window.innerWidth
            ? Math.max(0, Math.min(clientX - x, window.innerWidth - width))
            : Math.max(0, Math.min(clientX - x, window.innerWidth));

        if (opts?.axis?.x) {
          current.style.left = `${newX}px`;
        }

        if (opts?.axis?.y) {
          current.style.top = `${newY}px`;
        }

        if (opts?.onMove) {
          opts.onMove(clientX, clientY);
        }
      };

      const handleMouseUp = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (opts?.onEnd) {
          const { clientX, clientY } = getPositionForEvent(e);
          opts.onEnd(clientX, clientY);
        }

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleMouseMove);
        window.removeEventListener("touchend", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);
    },
    [draggableRef, opts]
  );

  useEffect(() => {
    const { current } = handleRef || draggableRef;
    if (!current) return;

    current.addEventListener("mousedown", handleMouseDown);
    current.addEventListener("touchstart", handleMouseDown);
    return () => {
      current.removeEventListener("mousedown", handleMouseDown);
      current.removeEventListener("touchstart", handleMouseDown);
    };
  });

  return <>{children}</>;
}
