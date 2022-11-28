import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import Layout from "../components/Layout";
import WeatherContextProvider from "../context/WeatherContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <WeatherContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WeatherContextProvider>
    </ChakraProvider>
  );
}
