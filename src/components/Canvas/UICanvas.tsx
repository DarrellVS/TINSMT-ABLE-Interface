import { Box, Button, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import useHandleTouches from "../../hooks/HandleTouches";
import { OutsideAlerter } from "../OutsideAlerter";
import { Position } from "./DrawingCanvas";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const listItem = {
  hidden: { opacity: 0, x: -25 },
  show: { opacity: 1, x: 0 },
};

function Buttons({
  position,
  setIsHeld,
}: {
  position: Position;
  setIsHeld: (isHeld: boolean) => void;
}) {
  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: position.y,
        left: position.x,
        gap: "1rem",
      }}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={listItem}>
        <Button
          colorScheme="blue"
          onClick={() => {
            setIsHeld(false);
            alert("Clicked 1");
          }}
        >
          1
        </Button>
      </motion.div>
      <motion.div variants={listItem}>
        <Button
          colorScheme="blue"
          onClick={() => {
            setIsHeld(false);
            alert("Clicked 2");
          }}
        >
          2
        </Button>
      </motion.div>
      <motion.div variants={listItem}>
        <Button
          colorScheme="blue"
          onClick={() => {
            setIsHeld(false);
            alert("Clicked 3");
          }}
        >
          3
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default function UICanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { position, isHeld, setIsHeld } = useHandleTouches(containerRef);

  return (
    <Box ref={containerRef} w="100vw" h="100vh">
      {isHeld && (
        <OutsideAlerter cb={() => setIsHeld(false)}>
          <Buttons position={position} setIsHeld={setIsHeld} />
        </OutsideAlerter>
      )}
    </Box>
  );
}
