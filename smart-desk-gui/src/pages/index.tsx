import { Button } from "@chakra-ui/react";
import { useCallback } from "react";
import { useProcesses } from "../context/Processes";
import { BsFillCloudSunFill } from "react-icons/bs";
import { VALID_PROCESSES } from "../interfaces/Processes";

export default function Home() {
  const { processes, addProcess } = useProcesses();
  const highestProcessId = processes.reduce(
    (prev, curr) => (prev > curr.id ? prev : curr.id),
    0
  );

  const addDevProcess = useCallback(() => {
    addProcess({
      id: highestProcessId + 1,
      type: VALID_PROCESSES.WEATHER,
      name: "Weather",
      icon: <BsFillCloudSunFill />,
      isMinimized: false,
    });
  }, [addProcess, highestProcessId]);

  return (
    <Button
      onClick={addDevProcess}
      colorScheme="blue"
      position="absolute"
      right="2rem"
      top="2rem"
    >
      Add Dev Process
    </Button>
  );
}
