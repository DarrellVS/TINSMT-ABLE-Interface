import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import WeatherContextProvider from "../context/WeatherContext";
import ProcessesProvider from "../context/Processes";
import { extendTheme } from "@chakra-ui/react";
import DockProvider from "../context/DockProvider";
import Welcome from "../components/Welcome";
import Head from "next/head";

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
          href="/icons/wooting.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/wooting.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
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
    </>
  );
}
