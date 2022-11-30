import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import Layout from "../components/Layout";
import WeatherContextProvider from "../context/WeatherContext";
import ProcessesProvider from "../context/Processes";
import ProcessesManager from "../components/Processes/ProcessesManager";
import { ColorModeScript } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ProcessesProvider>
        <WeatherContextProvider>
          <ProcessesManager>
            <Layout>
              <ColorModeScript
                initialColorMode={theme.config.initialColorMode}
              />
              <Component {...pageProps} />
            </Layout>
          </ProcessesManager>
        </WeatherContextProvider>
      </ProcessesProvider>
    </ChakraProvider>
  );
}
