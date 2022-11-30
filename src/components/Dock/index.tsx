import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { useProcesses } from "../../context/Processes";

export default function Dock() {
  const { processes } = useProcesses();

  return (
    <Flex
      position="absolute"
      bottom="20px"
      left="0"
      right="0"
      alignItems="center"
      justifyContent="center"
      gap="1rem"
    >
      {processes.map((process) => {
        return (
          <IconButton
            key={process.id}
            icon={process.icon}
            aria-label="Dock icon"
            colorScheme={process.isMinimized ? "gray" : "blue"}
            size="lg"
            onClick={process.toggleMinimize}
          />
        );
      })}
    </Flex>
  );
}
