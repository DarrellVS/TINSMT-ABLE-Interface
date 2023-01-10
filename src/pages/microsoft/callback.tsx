import { Button, Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";

export default function MicrosoftCallback() {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      h="80vh"
    >
      <Image src="/logo/svg.svg" alt="logo" h="30vh" />
      <Heading>Successfully connected Microsoft</Heading>
      <Heading size="lg" fontWeight="400" opacity={0.8} mt="1rem">
        You will be automatically redirected to the dashboard
      </Heading>
    </Flex>
  );
}
