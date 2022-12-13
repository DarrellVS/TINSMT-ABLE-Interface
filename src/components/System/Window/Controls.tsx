import { Flex, FlexProps, Box } from "@chakra-ui/react";
import React, { RefObject } from "react";
import { useSystem } from "../../../context/SystemProvider";

interface Props {
  navRef: RefObject<HTMLDivElement>;
}

export default function Controls({ navRef, ...rest }: Props & FlexProps) {
  const { touch } = useSystem();

  return (
    <Flex
      cursor={touch.enabled ? "grab" : "default"}
      ref={navRef}
      userSelect="none"
      position="relative"
      zIndex="10"
      bg="able.700"
      alignItems="center"
      justifyContent="center"
      roundedBottom="14px"
      p={touch.enabled ? "1rem" : "0rem"}
      transition="padding 0.2s ease-in-out"
      {...rest}
    >
      <Box
        bg="white"
        opacity={touch.enabled ? "0.6" : "0"}
        h="5px"
        w="8rem"
        rounded="50vh"
        transition="opacity 0.2s ease-in-out"
      ></Box>
    </Flex>
  );
}
