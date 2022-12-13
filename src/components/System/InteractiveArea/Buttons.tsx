import { motion } from "framer-motion";
import { useCallback } from "react";
import { useProcesses } from "../../../context/Processes";
import { PROCESS_TYPES } from "../../../interfaces/Processes";
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

const max = 100;
const min = 75;

const posMap = [
  {
    x: -max,
    y: 0,
  },
  {
    x: -min,
    y: -min,
  },
  {
    x: 0,
    y: -max,
  },
  {
    x: min,
    y: -min,
  },
  {
    x: max,
    y: 0,
  },
  {
    x: min,
    y: min,
  },
  {
    x: 0,
    y: max,
  },
  {
    x: -min,
    y: min,
  },
];

export default function MotionButtons({
  position,
  setIsHeld,
}: {
  position: Position;
  setIsHeld: (isHeld: boolean) => void;
}) {
  const { processes, minimizeProcess, createProcess } = useProcesses();
  const types = Object.keys(PROCESS_TYPES);

  const create = useCallback(
    (type: PROCESS_TYPES) => {
      const highestId =
        processes.length > 0 ? Math.max(...processes.map((p) => p.id)) : 0;

      createProcess(type, false, false, highestId + 1);
    },
    [createProcess, processes]
  );

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
      {types.sort().map((type, index) => {
        const process = processes.find((p) => p.type === type);
        const onClick = process
          ? () => minimizeProcess(process.id, !process.isMinimized)
          : () => create(type as PROCESS_TYPES);
        return (
          <MotionButton
            key={type}
            type={type as PROCESS_TYPES}
            setIsHeld={setIsHeld}
            onClick={onClick}
            x={posMap[index].x}
            y={posMap[index].y}
          />
        );
      })}
    </motion.div>
  );
}
