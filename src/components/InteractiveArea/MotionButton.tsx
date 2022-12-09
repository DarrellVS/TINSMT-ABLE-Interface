import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function MotionButton({
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
        position="absolute"
        colorScheme="blue"
        onClick={() => {
          setIsHeld(false);
          console.log("ok");
        }}
        onTouchEndCapture={() => {
          setIsHeld(false);
          console.log("touch");
        }}
      >
        {title}
      </Button>
    </motion.div>
  );
}
