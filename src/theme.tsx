import { extendTheme } from "@chakra-ui/react";

const colors = {
  able: {
    900: "#111622",
    800: "#202052",
    700: "#0E121B",
  },
};

const config = {
  initialColorMode: "dark",
};

export const theme = extendTheme({ config, colors });
