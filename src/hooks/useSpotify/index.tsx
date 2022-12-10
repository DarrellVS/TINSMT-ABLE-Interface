import { useCallback, useEffect, useState } from "react";
import {
  AUTH_ENDPOINT,
  CLIENT_ID,
  getCachedToken,
  getPlayerState,
  makeRequest,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPES,
  toggleShuffleHelper,
} from "./utils";

export default function useSpotify() {
  const [token, setToken] = useState<string>();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [playerState, setPlayerState] = useState<any>();
  const [tokenIntervalId, setTokenIntervalId] = useState<NodeJS.Timeout>();
  const isAuthed = token !== undefined;

  useEffect(() => {
    const refreshFunc = () => {
      const cachedToken = getCachedToken();
      if (!cachedToken) return;
      setToken(cachedToken);
    };
    refreshFunc();
    const interval = setInterval(refreshFunc, 5000);
    setTokenIntervalId(interval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (token && tokenIntervalId) {
      clearInterval(tokenIntervalId);
    }
  }, [token, tokenIntervalId]);

  const getAuthUrl = () => {
    if (typeof window === "undefined" || !window) return "/";
    const url = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${
      window.location.origin + REDIRECT_URI
    }&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`;
    return url;
  };

  const logOut = useCallback(() => {
    window.localStorage.removeItem("token");
    setToken(undefined);
    clearInterval(intervalId);
  }, [intervalId]);

  const fetchPlayerData = useCallback(async () => {
    if (!token) return;
    const returned = await getPlayerState(token);
    try {
      // @ts-ignore
      const { data, status } = returned;

      if (status !== 200) {
        setPlayerState(undefined);
        return;
      }

      setPlayerState(data);
    } catch (error) {}
  }, [token]);

  const toggleShuffle = useCallback(async () => {
    if (!playerState || !token) return;
    await toggleShuffleHelper(token, !playerState.shuffle_state);
    fetchPlayerData();
  }, [playerState, fetchPlayerData, token]);

  const skipToPrevious = useCallback(async () => {
    if (!playerState || !token) return;
    await makeRequest(token, "https://api.spotify.com/v1/me/player/previous", {
      method: "POST",
    });
    fetchPlayerData();
  }, [playerState, fetchPlayerData, token]);

  const skipToNext = useCallback(async () => {
    if (!playerState || !token) return;
    await makeRequest(token, "https://api.spotify.com/v1/me/player/next", {
      method: "POST",
    });
    fetchPlayerData();
  }, [playerState, fetchPlayerData, token]);

  const togglePlayPause = useCallback(async () => {
    if (!playerState || !token) return;
    await makeRequest(
      token,
      `https://api.spotify.com/v1/me/player/${
        playerState.is_playing ? "pause" : "play"
      }`,
      {
        method: "PUT",
      }
    );
    fetchPlayerData();
  }, [playerState, fetchPlayerData, token]);

  const toggleRepeat = useCallback(async () => {
    if (!playerState || !token) return;
    await makeRequest(
      token,
      `https://api.spotify.com/v1/me/player/repeat?state=${
        playerState.repeat_state === "off" ? "track" : "off"
      }`,
      {
        method: "PUT",
      }
    );
    fetchPlayerData();
  }, [playerState, fetchPlayerData, token]);

  useEffect(() => {
    if (!token) return;
    fetchPlayerData();
    const interval = setInterval(fetchPlayerData, 10000);
    setIntervalId(interval);

    return () => {
      clearInterval(intervalId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, setPlayerState]);

  return {
    getAuthUrl,
    setToken,
    isAuthed,
    logOut,
    token,
    playerState,
    toggleShuffle,
    skip: {
      previous: skipToPrevious,
      next: skipToNext,
    },
    togglePlayPause,
    toggleRepeat,
  };
}
