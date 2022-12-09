import { Flex, FlexProps, Box } from "@chakra-ui/react";
import React, { RefObject } from "react";

interface Props {
  navRef: RefObject<HTMLDivElement>;
}

export default function Controls({ navRef, ...rest }: Props & FlexProps) {
  return (
    <Flex
      cursor="grab"
      ref={navRef}
      p="1rem"
      userSelect="none"
      position="relative"
      zIndex="10"
      bg="able.700"
      alignItems="center"
      justifyContent="center"
      roundedBottom="14px"
      {...rest}
    >
      <Box bg="white" opacity="0.6" h="5px" w="8rem" rounded="50vh"></Box>
    </Flex>
  );
}
