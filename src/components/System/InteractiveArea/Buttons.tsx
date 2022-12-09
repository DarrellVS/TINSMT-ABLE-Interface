import { motion } from "framer-motion";
import { Position } from "../../Widgets/DrawingCanvas";
import MotionButton from "./MotionButton";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};

export default function MotionButtons({
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
