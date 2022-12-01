import { Flex, Text, FlexProps } from "@chakra-ui/react";
import React, { RefObject } from "react";
import { DeskProcess } from "../../interfaces/Processes";

interface MBProps {
  color: string;
  onClick: () => void;
}

function ManipulationButton({ color, onClick }: MBProps) {
  return (
    <Flex
      w="10px"
      h="10px"
      borderRadius="50%"
      bg={color}
      onClick={onClick}
      cursor="pointer"
    />
  );
}

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
      gap="2rem"
    >
      <Text>
        {process.name}, id: {process.id}
      </Text>

      <Flex ml="auto" gap="1rem">
        <ManipulationButton color="orange" onClick={process.toggleMinimize} />
        <ManipulationButton color="green" onClick={process.toggleMaximize} />
        <ManipulationButton color="red" onClick={process.close} />
      </Flex>
    </Flex>
  );
}
