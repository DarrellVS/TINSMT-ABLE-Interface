import { Box, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import useHandleTouches from "../../hooks/HandleTouches";
import { OutsideAlerter } from "../OutsideAlerter";
import { Position } from "../Canvas/DrawingCanvas";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};

function MotionButton({
  title,
  setIsHeld,
  x,
  y,
}: {
  title: string;
  setIsHeld: (isHeld: boolean) => void;
  x: number;
  y: number;
}) {
  const variants = {
    hidden: { opacity: 0, x: 0, y: 0 },
    show: { opacity: 1, x, y },
  };

  return (
    <motion.div
      style={{
        position: "absolute",
      }}
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        colorScheme="blue"
        onClick={() => {
          setIsHeld(false);
        }}
      >
        {title}
      </Button>
    </motion.div>
  );
}

function Buttons({
  position,
  setIsHeld,
}: {
  position: Position;
  setIsHeld: (isHeld: boolean) => void;
}) {
  const max = 100;
  const min = 75;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: position.y - 18,
        left: position.x - 18,
      }}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <MotionButton title="1" setIsHeld={setIsHeld} x={0} y={-max} />
      <MotionButton title="2" setIsHeld={setIsHeld} x={min} y={-min} />
      <MotionButton title="3" setIsHeld={setIsHeld} x={max} y={0} />
      <MotionButton title="4" setIsHeld={setIsHeld} x={min} y={min} />
      <MotionButton title="5" setIsHeld={setIsHeld} x={0} y={max} />
      <MotionButton title="6" setIsHeld={setIsHeld} x={-min} y={min} />
      <MotionButton title="7" setIsHeld={setIsHeld} x={-max} y={0} />
      <MotionButton title="8" setIsHeld={setIsHeld} x={-min} y={-min} />
    </motion.div>
  );
}

export default function InteractiveArea() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { position, isHeld, setIsHeld } = useHandleTouches(containerRef);

  return (
    <Box
      ref={containerRef}
      w="100vw"
      h="100vh"
      position="absolute"
      zIndex={0}
      backgroundImage="url('/images/bg.png')"
      backgroundSize="cover"
    >
      {isHeld && (
        <OutsideAlerter cb={() => setIsHeld(false)}>
          <Buttons position={position} setIsHeld={setIsHeld} />
        </OutsideAlerter>
      )}
    </Box>
  );
}
