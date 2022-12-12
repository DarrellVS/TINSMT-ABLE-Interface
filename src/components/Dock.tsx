import { Box, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { BsBoxArrowInDown, BsFullscreen } from "react-icons/bs";
import { useDock } from "../context/DockProvider";
import { useProcesses } from "../context/Processes";
import useFullscreen from "../hooks/useFullscreen";
import { PROCESS_TYPES } from "../interfaces/Processes";
import { getIconForProcessType } from "../utils/processType";
import ContextMenu from "./System/ContextMenu";
import { OutsideAlerter } from "./OutsideAlerter";

interface ContextMenuControl {
  id: number;
  isOpen: boolean;
}

export default function Dock() {
  const { processes, createProcess } = useProcesses();
  const [contextMenuControls, setContextMenuControls] = useState<
    ContextMenuControl[]
  >([]);
  const types = Object.keys(PROCESS_TYPES);
  const { displayDropArea } = useDock();
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [isFullscreenTooltipOpen, setIsFullscreenTooltipOpen] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFullscreenTooltipOpen(false);
    }, 3250);

    return () => clearTimeout(timeout);
  }, []);

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
                        process.minimize(!process.isMinimized);
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

            {!isFullscreen && (
              <Tooltip
                isOpen={isFullscreenTooltipOpen}
                label="Enter fullscreen!"
                bg="blue.400"
                px="1.25rem"
                py=".5rem"
                hasArrow
              >
                <IconButton
                  icon={<BsFullscreen />}
                  aria-label="Fullscreen"
                  onClick={toggleFullscreen}
                  colorScheme={"gray"}
                  opacity={0.75}
                  size="lg"
                />
              </Tooltip>
            )}
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
