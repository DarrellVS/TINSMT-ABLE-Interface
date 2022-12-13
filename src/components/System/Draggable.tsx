import { Box } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useSystem } from "../../context/SystemProvider";
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
    onStart?: () => void;
    onMove?: (x: number, y: number) => void;
    onEnd?: () => void;
  };
}) {
  const opts = useMemo(() => ({ ...defaultOptions, ...options }), [options]);

  return <>{children}</>;
}
