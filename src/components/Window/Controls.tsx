import { Flex, Text, FlexProps, Box } from "@chakra-ui/react";
import React, { RefObject } from "react";
import { DeskProcess } from "../../interfaces/Processes";

interface MBProps {
  color: string;
  onClick: () => void;
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
      p="1rem"
      userSelect="none"
      backdropFilter="blur(5px)"
      position="relative"
      zIndex="10"
      {...rest}
      gap="2rem"
      bg="#0E121B"
      alignItems="center"
      justifyContent="center"
      roundedBottom="14px"
    >
      <Box bg="white" opacity="0.6" h="5px" w="8rem" rounded="50vh"></Box>
    </Flex>
  );
}
