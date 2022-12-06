import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSpotify from "../../hooks/useSpotify";
import { getCachedToken, setCachedToken } from "../../hooks/useSpotify/utils";

export default function SpotifyCallbackPage() {
  const router = useRouter();
  const { setToken } = useSpotify();

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
    router.replace("/");
  }, [router, setToken]);

  return <Spinner />;
}
