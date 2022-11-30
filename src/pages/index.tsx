import { Button, Flex } from "@chakra-ui/react";
import { useCallback } from "react";
import { useProcesses } from "../context/Processes";
import { BsFillCloudSunFill } from "react-icons/bs";
import { PROCESS_TYPES } from "../interfaces/Processes";
import { getIconForProcessType } from "../utils/processType";
import InteractiveArea from "../components/InteractiveArea";

export default function Home() {
  const { processes, addProcess } = useProcesses();
  const highestProcessId = processes.reduce(
    (prev, curr) => (prev > curr.id ? prev : curr.id),
    0
  );

  const addDevProcess = useCallback(
    (type: PROCESS_TYPES) => {
      if (processes.some((process) => process.type === type)) return;

      addProcess({
        id: highestProcessId + 1,
        type,
        name: "Weather",
        icon: getIconForProcessType(type),
        isMinimized: false,
        isActive: false,
      });
    },
    [addProcess, highestProcessId, processes]
  );

  return (
    <>
      <InteractiveArea />
      <Flex
        position="absolute"
        right="2rem"
        top="2rem"
        gap="1rem"
        direction="column"
      >
        {Object.keys(PROCESS_TYPES).map((key) => {
          const type = PROCESS_TYPES[key as keyof typeof PROCESS_TYPES];
          if (processes.some((process) => process.type === type)) return null;

          return (
            <Button
              key={type}
              onClick={() => {
                addDevProcess(type);
              }}
              colorScheme="blue"
            >
              Add {type}
            </Button>
          );
        })}
      </Flex>
    </>
  );
}
