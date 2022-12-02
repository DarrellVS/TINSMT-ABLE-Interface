import { Box, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { ReactNode, useEffect, useRef } from "react";
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

  const handleMouseDown = (e: MouseEvent | TouchEvent) => {
    const { current } = draggableRef;
    if (!current) return;

    const { clientX, clientY } = getPositionForEvent(e);
    const { offsetLeft, offsetTop } = current;

    const x = clientX - offsetLeft;
    const y = clientY - offsetTop;

    process.setActive(true);

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const { clientX, clientY } = getPositionForEvent(e);
      current.style.left = `${clientX - x}px`;
      current.style.top = `${clientY - y}px`;
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
  };

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
      position="absolute"
      userSelect={process.isActive ? "none" : "auto"}
      ref={draggableRef}
      pointerEvents={process.isMinimized ? "none" : "auto"}
      zIndex={process.isActive ? "10" : "1"}
      {...(process.isMaximized && {
        left: "0 !important",
        top: "0 !important",
        width: "100vw !important",
        height: "100vh !important",
      })}
    >
      <motion.div
        variants={variants}
        initial="default"
        animate={process.isMinimized ? "minimized" : "default"}
        style={{
          height: "100%",
        }}
      >
        <Grid
          templateRows="3rem auto"
          boxShadow="5px 5px 10px rgba(0, 0, 0, 0.15)"
          height="100%"
        >
          <Controls navRef={draggableHeaderRef} process={process} />
          <Box
            roundedBottom="8px"
            overflow="hidden"
            zIndex="9"
            boxShadow="inset 0px 0px 2px rgba(255, 255, 255, 0.5)"
            backdropFilter="blur(5px)"
            background="rgba(0, 0, 0, 0.25)"
            height="100%"
          >
            {children}
          </Box>
        </Grid>
      </motion.div>
    </Box>
  );
}
