import { Box } from "@chakra-ui/react";
import React, { useRef } from "react";
import useHandleTouches from "../../../hooks/HandleTouches";
import { OutsideAlerter } from "../../OutsideAlerter";
import Buttons from "./Buttons";

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
      background="url(/images/bg.jpg)"
    >
      {isHeld && (
        <OutsideAlerter cb={() => setIsHeld(false)}>
          <Buttons position={position} setIsHeld={setIsHeld} />
        </OutsideAlerter>
      )}
    </Box>
  );
}
