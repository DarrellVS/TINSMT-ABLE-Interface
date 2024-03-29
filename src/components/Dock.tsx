import { Box, Flex, IconButton } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { BsBoxArrowInDown } from "react-icons/bs";
import { useDock } from "../context/DockProvider";
import { useProcesses } from "../context/Processes";
import { PROCESS_TYPES } from "../interfaces/Processes";
import { getIconForProcessType } from "../utils/processType";
import ContextMenu from "./System/ContextMenu";
import { OutsideAlerter } from "./OutsideAlerter";
import { useSystem } from "../context/SystemProvider";

interface ContextMenuControl {
  id: number;
  isOpen: boolean;
}

export default function Dock() {
  const { processes, minimizeProcess, createProcess, closeProcess } =
    useProcesses();
  const [contextMenuControls, setContextMenuControls] = useState<
    ContextMenuControl[]
  >([]);
  const types = Object.keys(PROCESS_TYPES);
  const { displayDropArea } = useDock();
  const { touch } = useSystem();

  const create = useCallback(
    (type: PROCESS_TYPES) => {
      const highestId =
        processes.length > 0 ? Math.max(...processes.map((p) => p.id)) : 0;

      createProcess(type, false, false, highestId + 1);
    },
    [createProcess, processes]
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
            bg="able.700"
            alignItems="center"
            justifyContent="center"
            gap="1rem"
            p="1rem"
            rounded="14px"
            id="window-dock"
            transform={
              touch.enabled ? "translateY(0)" : "translateY(calc(100% + 20px))"
            }
            transition="transform 0.25s ease-in-out"
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
                        minimizeProcess(process.id, !process.isMinimized);
                      } else {
                        create(type as PROCESS_TYPES);
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
                              if (process) closeProcess(process.id);
                            },
                          },
                        ]}
                      />
                    </OutsideAlerter>
                  )}
                </Box>
              );
            })}
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
            pointerEvents="none"
          >
            <BsBoxArrowInDown size="1.5rem" />
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
