import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { MdOutlineDoNotTouch, MdOutlineTouchApp } from "react-icons/md";
import { useSystem } from "../context/SystemProvider";

export default function SystemControls() {
  const { touch } = useSystem();

  return (
    <Flex
      gap="1rem"
      direction="column"
      position="absolute"
      right="20px"
      bottom="20px"
      bg="#0E121B"
      rounded="14px"
      p="1rem"
      zIndex={9999}
    >
      <IconButton
        icon={touch.enabled ? <MdOutlineTouchApp /> : <MdOutlineDoNotTouch />}
        aria-label="Toggle Touchscreen"
        onClick={() => touch.setEnabled(!touch.enabled)}
      />
    </Flex>
  );
}
