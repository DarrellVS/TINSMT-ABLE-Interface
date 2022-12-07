import { Box, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDock } from "../../context/DockProvider";
import { DeskProcess } from "../../interfaces/Processes";
import { getPositionForEvent } from "../../utils/interactionWrapper";
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
  const draggableHeaderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { displayDropArea, setDisplayDropArea } = useDock();

  const handleMouseDown = useCallback(
    (e: MouseEvent | TouchEvent) => {
      let shouldMinimizeOnRelease = false;
      const dock = document.getElementById("window-dock");
      const {
        left: dL,
        top: dT,
        width: dW,
        height: dH,
      } = dock
        ? dock.getBoundingClientRect()
        : { left: 0, top: 0, width: 0, height: 0 };

      const { current } = draggableRef;
      if (!current) return;

      const { clientX, clientY } = getPositionForEvent(e);
      const { offsetLeft, offsetTop } = current;

      const x = clientX - offsetLeft;
      const y = clientY - offsetTop;

      process.setActive(true);
      setIsDragging(true);

      const handleMouseMove = (e: MouseEvent | TouchEvent) => {
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

        current.style.left = `${newX}px`;
        current.style.top = `${newY}px`;

        shouldMinimizeOnRelease =
          clientX > dL &&
          clientX < dL + dW &&
          clientY > dT &&
          clientY < dT + dH;

        setDisplayDropArea(shouldMinimizeOnRelease);
      };

      const handleMouseUp = () => {
        if (shouldMinimizeOnRelease) {
          process.minimize();
          setDisplayDropArea(false);
          setIsDragging(false);
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
    [process, setDisplayDropArea]
  );

  useEffect(() => {
    const { current } = draggableHeaderRef;
    if (!current) return;

    current.addEventListener("mousedown", handleMouseDown);
    current.addEventListener("touchstart", handleMouseDown);
    return () => {
      current.removeEventListener("mousedown", handleMouseDown);
      current.removeEventListener("touchstart", handleMouseDown);
    };
  });

  return (
    <Box
      ref={draggableRef}
      position="absolute"
      userSelect={process.isActive ? "none" : "auto"}
      pointerEvents={process.isMinimized ? "none" : "auto"}
      zIndex={process.isActive ? "10" : "3"}
      opacity={isDragging && displayDropArea ? "0.5" : "1"}
      transition="opacity 0.2s ease-in-out"
      boxShadow={
        process.isActive ? "5px 5px 20px rgba(255, 255, 255, 0.05)" : "none"
      }
      rounded="14px"
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
            bg="#0E121B"
          >
            {children}
          </Box>
          <Controls navRef={draggableHeaderRef} process={process} />
        </Grid>
      </motion.div>
    </Box>
  );
}
