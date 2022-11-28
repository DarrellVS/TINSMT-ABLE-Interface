import React, { RefObject, useCallback, useEffect, useState } from "react";
import { Position } from "../components/Canvas/DrawingCanvas";

export default function useHandleTouches(
  containerRef: RefObject<HTMLDivElement>,
  options?: {
    precision?: number;
    duration?: number;
  }
) {
  const [mouseHoldTimeout, setMouseHoldTimeout] = useState<NodeJS.Timeout>();
  const [currentMousePos, setCurrentMousePos] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [mouseDownPosition, setMouseDownPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [heldPosition, setHeldPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [isHeld, setIsHeld] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const precision = options?.precision || 10;
    if (
      Math.abs(mouseDownPosition.x - currentMousePos.x) > precision ||
      Math.abs(mouseDownPosition.y - currentMousePos.y) > precision
    ) {
      clearTimeout(mouseHoldTimeout);
    }
  }, [
    currentMousePos,
    currentMousePos.x,
    currentMousePos.y,
    mouseDownPosition,
    mouseDownPosition.x,
    mouseDownPosition.y,
    mouseHoldTimeout,
    options?.precision,
  ]);

  const mouseHeldDown = useCallback((pos: Position) => {
    setIsHeld(true);
    setIsTouch(false);
    setHeldPosition(pos);
  }, []);

  const mouseDownHandler = useCallback(
    (event: MouseEvent) => {
      const duration = options?.duration || 500;
      setIsTouch(false);

      const pos = {
        x: event.clientX,
        y: event.clientY,
      };

      setMouseDownPosition(pos);
      setMouseHoldTimeout(
        setTimeout(() => {
          mouseHeldDown(pos);
        }, duration)
      );
    },
    [mouseHeldDown, options?.duration]
  );

  const mouseUpHandler = useCallback(
    (event: MouseEvent) => {
      clearTimeout(mouseHoldTimeout);
      setIsTouch(false);
    },
    [mouseHoldTimeout]
  );

  const mouseMoveHandler = useCallback(
    (event: MouseEvent) => {
      if (isTouch) return;

      setCurrentMousePos({
        x: event.clientX,
        y: event.clientY,
      });
    },
    [isTouch]
  );

  const touchStartHandler = useCallback(
    (event: TouchEvent) => {
      setIsTouch(true);
      const pos = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
      setMouseDownPosition(pos);
      setCurrentMousePos(pos);

      setMouseHoldTimeout(
        setTimeout(() => {
          mouseHeldDown(pos);
        }, 1000)
      );
    },
    [mouseHeldDown]
  );

  const touchEndHandler = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      clearTimeout(mouseHoldTimeout);
      setIsTouch(false);
    },
    [mouseHoldTimeout]
  );

  const touchMoveHandler = useCallback(
    (event: TouchEvent) => {
      setCurrentMousePos({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });
      setIsTouch(true);
    },
    [setCurrentMousePos]
  );

  useEffect(() => {
    const { current } = containerRef;
    if (!current) return;

    current.addEventListener("mousedown", mouseDownHandler);
    current.addEventListener("mouseup", mouseUpHandler);
    current.addEventListener("mousemove", mouseMoveHandler);

    current.addEventListener("touchstart", touchStartHandler);
    current.addEventListener("touchend", touchEndHandler);
    current.addEventListener("touchmove", touchMoveHandler);

    return () => {
      current.removeEventListener("mousedown", mouseDownHandler);
      current.removeEventListener("mouseup", mouseUpHandler);
      current.removeEventListener("mousemove", mouseMoveHandler);

      current.removeEventListener("touchstart", touchStartHandler);
      current.removeEventListener("touchend", touchEndHandler);
      current.removeEventListener("touchmove", touchMoveHandler);
    };
  }, [
    containerRef,
    mouseDownHandler,
    mouseMoveHandler,
    mouseUpHandler,
    touchEndHandler,
    touchMoveHandler,
    touchStartHandler,
  ]);

  return { position: heldPosition, isHeld, setIsHeld };
}
