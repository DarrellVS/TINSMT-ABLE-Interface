import { Button, Heading, Spinner, Image, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useSpotify from "../../hooks/useSpotify";
import { getCachedToken, setCachedToken } from "../../hooks/useSpotify/utils";

export default function SpotifyCallbackPage() {
  const { isAuthed, setToken } = useSpotify();

  useEffect(() => {
    const hash = window.location.hash;
    let token = getCachedToken();

    if (!token && hash) {
      const substr = hash.substring(1);
      const split = substr.split("&");
      const elem = split.find((elem) => elem.startsWith("access_token"));
      if (!elem) return;
      token = elem.split("=")[1];
      window.location.hash = "";
      setCachedToken(token);
    }

    token && setToken(token);
  }, [setToken]);

  return !isAuthed ? (
    <Spinner />
  ) : (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      h="80vh"
    >
      <Image src="/logo/svg.svg" alt="logo" h="30vh" />
      <Heading>Successfully connected spotify</Heading>
      <Heading size="lg" fontWeight="400" opacity={0.8} mt="1rem">
        You may now close this page
      </Heading>

      <Button
        onClick={() => {
          window.close();
        }}
        mt="3rem"
        px="3rem"
        py="1.25rem"
        h="auto"
      >
        Close page
      </Button>
    </Flex>
  );
}
