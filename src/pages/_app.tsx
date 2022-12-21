import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import WeatherContextProvider from "../context/WeatherContext";
import ProcessesProvider from "../context/Processes";
import DockProvider from "../context/DockProvider";
import { theme } from "../theme";
import PageHead from "../components/PageHead";
import SystemProvider from "../context/SystemProvider";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../utils/msal";

export default function App({ Component, pageProps }: AppProps) {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <>
      <PageHead />
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <MsalProvider instance={msalInstance}>
          <SystemProvider>
            <DockProvider>
              <ProcessesProvider>
                <WeatherContextProvider>
                  <Component {...pageProps} />
                </WeatherContextProvider>
              </ProcessesProvider>
            </DockProvider>
          </SystemProvider>
        </MsalProvider>
      </ChakraProvider>
    </>
  );
}
