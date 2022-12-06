import axios from "axios";

export function setCachedToken(token: string) {
  window.localStorage.setItem("spotifyToken", token);
}

export function getCachedToken() {
  const data = window.localStorage.getItem("spotifyToken");
  return data;
}

export async function makeRequest(
  token: string,
  url: string,
  options?: {
    method?: string;
    params?: any;
  }
) {
  try {
    const data = await axios({
      method: options?.method || "GET",
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...(options?.params && { params: options.params }),
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function searchArtists(token: string, query: string) {
  return await makeRequest(token, "https://api.spotify.com/v1/search", {
    params: {
      query,
      type: "artist",
    },
  });
}

export async function searchTracks(token: string, query: string) {
  return await makeRequest(token, "https://api.spotify.com/v1/search", {
    params: {
      query,
      type: "track",
    },
  });
}

export async function getPlayerState(token: string) {
  return await makeRequest(token, "https://api.spotify.com/v1/me/player");
}

export async function toggleShuffleHelper(token: string, state: boolean) {
  return await makeRequest(
    token,
    "https://api.spotify.com/v1/me/player/shuffle",
    {
      method: "PUT",
      params: {
        state,
      },
    }
  );
}

export function refreshToken(token: string) {
  return makeRequest(token, "https://accounts.spotify.com/api/token", {
    method: "POST",
    params: {
      grant_type: "refresh_token",
    },
  });
}

export function getTokensSwap(code: string) {
  return axios({
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    params: {
      grant_type: "authorization_code",
      code,
      redirect_uri: "http://localhost:3000",
    },
    headers: {
      Authorization: `Basic ${btoa(
        `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`
      )}`,
    },
  });
}
