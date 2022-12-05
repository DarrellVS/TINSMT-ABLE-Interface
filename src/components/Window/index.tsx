import { Box, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { ReactNode, useEffect, useRef, useState } from "react";
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
    let shouldMinimizeOnRelease = false;
    const { current } = draggableRef;
    if (!current) return;

    const { clientX, clientY } = getPositionForEvent(e);
    const { offsetLeft, offsetTop } = current;

    const x = clientX - offsetLeft;
    const y = clientY - offsetTop;

    process.setActive(true);

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
        clientX > window.innerWidth / 2 - 150 &&
        clientX < window.innerWidth / 2 + 150 &&
        window.innerHeight - clientY < 100;
    };

    const handleMouseUp = () => {
      if (shouldMinimizeOnRelease) {
        process.minimize();
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
