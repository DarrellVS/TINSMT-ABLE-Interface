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
      {...rest}
      cursor="grab"
      ref={navRef}
      bg="gray.400"
      rounded="8px"
      alignItems="center"
      px="1rem"
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
