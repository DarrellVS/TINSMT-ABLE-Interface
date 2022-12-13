import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { PROCESS_TYPES } from "../../../interfaces/Processes";
import { getIconForProcessType } from "../../../utils/processType";

export default function MotionButton({
  type,
  setIsHeld,
  onClick,
  x,
  y,
}: {
  type: PROCESS_TYPES;
  setIsHeld: (isHeld: boolean) => void;
  onClick?: () => void;
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
        position="absolute"
        colorScheme="blue"
        onClick={() => {
          setIsHeld(false);
          onClick && onClick();
        }}
        onTouchEndCapture={() => {
          setIsHeld(false);
          onClick && onClick();
        }}
      >
        {getIconForProcessType(type)}
      </Button>
    </motion.div>
  );
}
