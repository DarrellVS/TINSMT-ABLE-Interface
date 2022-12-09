import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import WeatherContextProvider from "../context/WeatherContext";
import ProcessesProvider from "../context/Processes";
import DockProvider from "../context/DockProvider";
import Welcome from "../components/System/Welcome";
import { theme } from "../theme";
import PageHead from "../components/PageHead";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PageHead />
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <DockProvider>
          <ProcessesProvider>
            <WeatherContextProvider>
              <Welcome>
                <Component {...pageProps} />
              </Welcome>
            </WeatherContextProvider>
          </ProcessesProvider>
        </DockProvider>
      </ChakraProvider>
    </>
  );
}
