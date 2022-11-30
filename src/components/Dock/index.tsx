import { Flex, IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
import { BsSun } from "react-icons/bs";
import { useProcesses } from "../../context/Processes";

export default function Dock() {
  const { processes } = useProcesses();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      position="absolute"
      bottom="20px"
      left="0"
      right="0"
      alignItems="center"
      justifyContent="center"
      gap="1rem"
      zIndex={2}
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

      {/* Toggle color mode button */}
      {/* <IconButton
        icon={<BsSun />}
        onClick={toggleColorMode}
        aria-label="color mode button"
        size="lg"
        ml={processes.length > 0 ? "2rem" : "0"}
      /> */}
    </Flex>
  );
}
