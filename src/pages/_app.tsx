import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import WeatherContextProvider from "../context/WeatherContext";
import ProcessesProvider from "../context/Processes";
import ProcessesManager from "../components/Processes/ProcessesManager";
import { extendTheme } from "@chakra-ui/react";

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
      <ProcessesProvider>
        <WeatherContextProvider>
          <ProcessesManager>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProcessesManager>
        </WeatherContextProvider>
      </ProcessesProvider>
    </ChakraProvider>
  );
}
