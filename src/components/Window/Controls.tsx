import { Flex, Text, FlexProps } from "@chakra-ui/react";
import React, { RefObject } from "react";
import { DeskProcess } from "../../interfaces/Processes";

interface Props {
  process: DeskProcess;
  navRef: RefObject<HTMLDivElement>;
}

export default function Controls({
  navRef,
  process,
  ...rest
}: Props & FlexProps) {
  return (
    <Flex
      cursor="grab"
      ref={navRef}
      roundedTop="8px"
      alignItems="center"
      px="1rem"
      userSelect="none"
      backdropFilter="blur(5px)"
      bg="purple.800"
      bottom="-2px"
      position="relative"
      zIndex="10"
      {...rest}
    >
      <Text>
        {process.name}, id: {process.id}
      </Text>

      <Flex ml="auto" gap="1rem">
        <Text cursor="pointer" onClick={process.toggleMinimize}>
          Min
        </Text>
        <Text cursor="pointer" onClick={process.close}>
          Close
        </Text>
      </Flex>
    </Flex>
  );
}
