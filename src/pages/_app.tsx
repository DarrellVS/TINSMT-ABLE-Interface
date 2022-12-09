import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import WeatherContextProvider from "../context/WeatherContext";
import ProcessesProvider from "../context/Processes";
import DockProvider from "../context/DockProvider";
import Welcome from "../components/Welcome";
import Head from "next/head";
import { theme } from "../theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon.png"
          rel="favicon"
          type="image/png"
          sizes="16x16"
        />
        <meta name="theme-color" content="#212433" />
      </Head>
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
