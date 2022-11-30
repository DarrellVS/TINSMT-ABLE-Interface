import { Box, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import useProcess from "../../hooks/useProcess";
import { DeskProcess } from "../../interfaces/Processes";
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

  const handleMouseDown = (e: MouseEvent) => {
    const { current } = draggableRef;
    if (!current) return;

    const { clientX, clientY } = e;
    const { offsetLeft, offsetTop } = current;

    const x = clientX - offsetLeft;
    const y = clientY - offsetTop;

    setIsDragging(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      current.style.left = `${clientX - x}px`;
      current.style.top = `${clientY - y}px`;
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    const { current } = draggableHeaderRef;
    if (!current) return;

    current.addEventListener("mousedown", handleMouseDown);
    return () => {
      current.removeEventListener("mousedown", handleMouseDown);
    };
  });

  return (
    <Box
      position="absolute"
      userSelect={isDragging ? "none" : "auto"}
      ref={draggableRef}
      pointerEvents={process.isMinimized ? "none" : "auto"}
    >
      <motion.div
        variants={variants}
        initial="default"
        animate={process.isMinimized ? "minimized" : "default"}
      >
        <Grid templateRows="3rem auto" gap="1rem">
          <Controls navRef={draggableHeaderRef} process={process} />
          <Box border="1px solid" borderColor="gray.400" rounded="8px">
            {children}
          </Box>
        </Grid>
      </motion.div>
    </Box>
  );
}
