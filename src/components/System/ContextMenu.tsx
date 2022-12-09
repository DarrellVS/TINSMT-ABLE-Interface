import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function ContextMenu({
  isOpen,
  items,
}: {
  isOpen: boolean;
  items: { label: string; onClick: () => void }[];
}) {
  return (
    <Flex
      p="1rem"
      boxShadow="inset 0px 0px 2px rgba(255, 255, 255, 0.5)"
      backdropFilter="blur(5px)"
      background="rgba(0, 0, 0, 0.25)"
      position="absolute"
      top="0"
      display={isOpen ? "flex" : "none"}
      transform="translateY(calc(-100% - 1rem))"
      borderRadius="8px"
      direction="column"
      w="10rem"
      gap=".5rem"
      userSelect="none"
    >
      {items.map((item) => (
        <Text
          key={item.label}
          onClick={item.onClick}
          _hover={{
            cursor: "pointer",
            background: "rgba(255, 255, 255, 0.05)",
          }}
          px="1rem"
          rounded="3px"
        >
          {item.label}
        </Text>
      ))}
    </Flex>
  );
}
