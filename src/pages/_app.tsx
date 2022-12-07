import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import WeatherContextProvider from "../context/WeatherContext";
import ProcessesProvider from "../context/Processes";
import { extendTheme } from "@chakra-ui/react";
import DockProvider from "../context/DockProvider";
import Welcome from "../components/Welcome";

const theme = extendTheme({
  initialColorMode: "dark",
  color: {
    brand: {
      100: "#0E121B",
      200: "#0E121B",
      300: "#0E121B",
      400: "#0E121B",
      500: "#0E121B",
      600: "#0E121B",
      700: "#0E121B",
      800: "#0E121B",
      900: "#0E121B",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DockProvider>
        <ProcessesProvider>
          <WeatherContextProvider>
            {/* <Welcome> */}
            <Component {...pageProps} />
            {/* </Welcome> */}
          </WeatherContextProvider>
        </ProcessesProvider>
      </DockProvider>
    </ChakraProvider>
  );
}
