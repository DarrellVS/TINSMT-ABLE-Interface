import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import WeatherContextProvider from "../context/WeatherContext";
import ProcessesProvider from "../context/Processes";
import DockProvider from "../context/DockProvider";
import { theme } from "../theme";
import PageHead from "../components/PageHead";
import SystemProvider from "../context/SystemProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PageHead />
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <SystemProvider>
          <DockProvider>
            <ProcessesProvider>
              <WeatherContextProvider>
                <Component {...pageProps} />
              </WeatherContextProvider>
            </ProcessesProvider>
          </DockProvider>
        </SystemProvider>
      </ChakraProvider>
    </>
  );
}
