import { Box, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDock } from "../../../context/DockProvider";
import { useProcesses } from "../../../context/Processes";
import { useSystem } from "../../../context/SystemProvider";
import useWindowActivity from "../../../hooks/useWindowActivity";
import { DeskProcess } from "../../../interfaces/Processes";
import { getPositionForEvent } from "../../../utils/EventListenerHelpers";
import Draggable from "../Draggable";
import Controls from "./Controls";

const variants = {
  default: { opacity: 1, y: 0 },
  minimized: { opacity: 0, y: 20 },
};

export default function Window({
  process,
  children,
}: {
  process: DeskProcess;
  children: ReactNode;
}) {
  const draggableRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { displayDropArea, setDisplayDropArea } = useDock();
  const [shouldMinimizeOnRelease, setShouldMinimizeOnRelease] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({
    top: 0,
    left: 0,
  });
  const { updateState, getProcessState } = useWindowActivity();
  const { setActiveProcess, minimizeProcess } = useProcesses();

  const { touch } = useSystem();

  const onStart = useCallback(
    (x: number, y: number) => {
      if (!touch.enabled) return;

      setActiveProcess(process.id, true);
      setIsDragging(true);

      const { current } = draggableRef;
      if (!current) return;

      const { offsetLeft, offsetTop } = current;
      setStartDragPosition({
        top: offsetTop,
        left: offsetLeft,
      });
    },
    [process.id, setActiveProcess, touch.enabled]
  );

  const onMove = useCallback(
    (x: number, y: number) => {
      if (!touch.enabled) return;

      const dock = document.getElementById("window-dock");
      const {
        left: dL,
        top: dT,
        width: dW,
        height: dH,
      } = dock
        ? dock.getBoundingClientRect()
        : { left: 0, top: 0, width: 0, height: 0 };

      const displayMinimize = x > dL && x < dL + dW && y > dT && y < dT + dH;

      setShouldMinimizeOnRelease(displayMinimize);
      setDisplayDropArea(displayMinimize);
    },
    [setDisplayDropArea, touch.enabled]
  );

  const onEnd = useCallback(
    (x: number, y: number) => {
      if (!touch.enabled) return;

      setIsDragging(false);

      const { current } = draggableRef;
      if (!current) return;

      const { offsetLeft, offsetTop } = current;
      updateState({
        type: process.type,
        position: { x: offsetLeft, y: offsetTop },
      });
    },
    [process.type, touch.enabled, updateState]
  );

  useEffect(() => {
    if (isDragging || !shouldMinimizeOnRelease) return;

    minimizeProcess(process.id, true);
    setDisplayDropArea(false);
    setShouldMinimizeOnRelease(false);

    const { current } = draggableRef;
    if (!current) return;

    updateState({
      type: process.type,
      position: { x: startDragPosition.left, y: startDragPosition.top },
      isActive: false,
      isMinimized: true,
    });

    setTimeout(() => {
      current.style.left = `${startDragPosition.left}px`;
      current.style.top = `${startDragPosition.top}px`;
    }, 500);
  }, [
    isDragging,
    shouldMinimizeOnRelease,
    process,
    setDisplayDropArea,
    startDragPosition,
    minimizeProcess,
    updateState,
  ]);

  useEffect(() => {
    const { current } = draggableRef;
    if (!current) return;

    const { x, y } = getProcessState(process.type)?.position || {
      x: 0,
      y: 0,
    };

    current.style.left = `${x}px`;
    current.style.top = `${y}px`;
  }, [getProcessState, process.type]);

  return (
    <Draggable
      draggableRef={draggableRef}
      handleRef={handleRef}
      options={{ onStart, onMove, onEnd }}
    >
      <Box
        ref={draggableRef}
        position="absolute"
        userSelect={process.isActive ? "none" : "auto"}
        pointerEvents={process.isMinimized ? "none" : "auto"}
        zIndex={process.isActive ? "10" : "3"}
        opacity={isDragging && displayDropArea ? "0.5" : "1"}
        transition="opacity 0.2s ease-in-out"
        boxShadow={
          process.isActive && touch.enabled
            ? "5px 5px 20px rgba(255, 255, 255, 0.05)"
            : "none"
        }
        rounded="14px"
        overflowY="hidden"
      >
        <motion.div
          variants={variants}
          initial="default"
          animate={process.isMinimized ? "minimized" : "default"}
          style={{
            height: "100%",
          }}
        >
          <Grid templateRows="auto auto" height="100%">
            <Box
              roundedTop="14px"
              overflow="hidden"
              zIndex="9"
              background="rgba(0, 0, 0, 0.25)"
              height="100%"
              bg="able.700"
            >
              {children}
            </Box>
            <Controls navRef={handleRef} />
          </Grid>
        </motion.div>
      </Box>
    </Draggable>
  );
}
