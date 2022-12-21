import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsFullscreen } from "react-icons/bs";
import { MdOutlineDoNotTouch, MdOutlineTouchApp } from "react-icons/md";
import { useSystem } from "../context/SystemProvider";
import useFullscreen from "../hooks/useFullscreen";

export default function SystemControls() {
  const { touch } = useSystem();
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [isFullscreenTooltipOpen, setIsFullscreenTooltipOpen] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFullscreenTooltipOpen(false);
    }, 3250);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Flex
      gap="1rem"
      direction="column"
      position="absolute"
      right="20px"
      bottom="20px"
      bg="able.700"
      rounded="14px"
      p="1rem"
      zIndex={9999}
    >
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
      <IconButton
        icon={touch.enabled ? <MdOutlineTouchApp /> : <MdOutlineDoNotTouch />}
        aria-label="Toggle Touchscreen"
        onClick={() => touch.setEnabled(!touch.enabled)}
        size="lg"
      />
    </Flex>
  );
}
