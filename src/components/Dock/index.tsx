import { Box, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { BsBoxArrowInDown, BsGear } from "react-icons/bs";
import { useDock } from "../../context/DockProvider";
import { useProcesses } from "../../context/Processes";
import { PROCESS_TYPES } from "../../interfaces/Processes";
import { getIconForProcessType } from "../../utils/processType";
import ContextMenu from "../ContextMenu";
import { OutsideAlerter } from "../OutsideAlerter";
import SettingsModal from "../SettingsModal";

interface ContextMenuControl {
  id: number;
  isOpen: boolean;
}

export default function Dock() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { processes, addProcess } = useProcesses();
  const [contextMenuControls, setContextMenuControls] = useState<
    ContextMenuControl[]
  >([]);
  const types = Object.keys(PROCESS_TYPES);
  const { displayDropArea } = useDock();

  const createProcess = useCallback(
    (type: PROCESS_TYPES) => {
      if (processes.some((process) => process.type === type)) return;

      const highestProcessId = processes.reduce(
        (prev, curr) => (prev > curr.id ? prev : curr.id),
        0
      );

      addProcess({
        id: highestProcessId + 1,
        type,
        name: type,
        icon: getIconForProcessType(type),
        isMinimized: false,
        isMaximized: false,
        isActive: false,
      });
    },
    [addProcess, processes]
  );

  useEffect(() => {
    setContextMenuControls(
      processes.map((process) => ({
        id: process.id,
        isOpen: false,
      }))
    );
  }, [processes]);

  return (
    <>
      <Flex
        position="absolute"
        alignItems="center"
        justifyContent="center"
        bottom="20px"
        left="0"
        right="0"
        zIndex={2}
      >
        <Box position="relative">
          <Flex
            bg="#0E121B"
            alignItems="center"
            justifyContent="center"
            gap="1rem"
            p="1rem"
            rounded="14px"
            id="window-dock"
          >
            {types.sort().map((type) => {
              const process = processes.find(
                (process) => process.type === type
              );
              const controls = process
                ? contextMenuControls.find((c) => c.id === process.id)
                : undefined;

              return (
                <Box key={type} position="relative">
                  <IconButton
                    aria-label={type}
                    icon={getIconForProcessType(type as PROCESS_TYPES)}
                    onClick={() => {
                      if (process) {
                        process.toggleMinimize();
                      } else {
                        createProcess(type as PROCESS_TYPES);
                      }
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      if (!controls) return;
                      setContextMenuControls(
                        contextMenuControls.map((c) => ({
                          ...c,
                          isOpen: c.id === controls.id,
                        }))
                      );
                    }}
                    colorScheme={
                      process ? (process.isActive ? "green" : "blue") : "gray"
                    }
                    opacity={process ? (process.isMinimized ? 0.75 : 1) : 1}
                    size="lg"
                  />
                  {controls && controls.isOpen && (
                    <OutsideAlerter
                      cb={() => {
                        setContextMenuControls(
                          contextMenuControls.map((c) => ({
                            ...c,
                            isOpen: false,
                          }))
                        );
                      }}
                    >
                      <ContextMenu
                        isOpen={controls.isOpen}
                        items={[
                          {
                            label: "Close",
                            onClick: () => {
                              if (process) process.close();
                            },
                          },
                        ]}
                      />
                    </OutsideAlerter>
                  )}
                </Box>
              );
            })}

            <IconButton
              aria-label="Settings"
              icon={<BsGear />}
              onClick={onOpen}
              colorScheme={"gray"}
              opacity={0.75}
              size="lg"
            />
          </Flex>

          <Flex
            w={displayDropArea ? "100%" : "0"}
            opacity={displayDropArea ? 1 : 0}
            p="1rem"
            position="absolute"
            top="0"
            bottom="0"
            left="50%"
            right="0"
            transform="translateX(-50%)"
            rounded="14px"
            alignItems="center"
            justifyContent="center"
            bg="rgba(14, 18, 27, 0.8)"
            transition={"all 0.2s ease-in-out"}
          >
            <BsBoxArrowInDown size="1.5rem" />
          </Flex>
        </Box>
      </Flex>

      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
