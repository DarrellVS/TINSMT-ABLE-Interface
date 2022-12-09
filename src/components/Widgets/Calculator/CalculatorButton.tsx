import { Box } from "@chakra-ui/react";

export default function CalcButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      onClick={onClick}
      py=".5rem"
      bg="#1E2840"
      _hover={{
        filter: "brightness(1.3)",
      }}
      _active={{
        filter: "brightness(1.5)",
      }}
      userSelect="none"
      rounded="md"
    >
      {label}
    </Box>
  );
}
