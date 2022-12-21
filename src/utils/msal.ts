import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useCallback, useEffect, useState } from "react";

export const msalConfig = {
  auth: {
    clientId: "9a730cca-abac-40e4-b94c-5df5c8e13243",
    authority: "https://login.microsoftonline.com/consumers",
    redirectUri: "http://localhost:3000/",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read", "Calendars.Read"],
};

export enum GraphEndpoints {
  me = "https://graph.microsoft.com/v1.0/me",
  calendars = "https://graph.microsoft.com/v1.0/me/calendars",
  calendarView = "https://graph.microsoft.com/v1.0/me/calendar/calendarView?startDateTime={2022-12-20T23:00:00.000Z}&endDateTime={2022-12-31T23:00:00.000Z}",
}

interface MsGraphProps {
  accessToken: string | null;
  endpoint: GraphEndpoints;
}

export async function callMsGraph({ accessToken, endpoint }: MsGraphProps) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(endpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function useMsGraph({ accessToken, endpoint }: MsGraphProps) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);

    callMsGraph({ accessToken, endpoint })
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [accessToken, endpoint]);

  return { data, error, loading };
}

export function useAccessToken() {
  const { instance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (!accounts[0]) return;

    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then((response) => {
        setAccessToken(response.accessToken);
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          setAccessToken(response.accessToken);
        });
      });
  }, [accounts, instance]);

  return accessToken;
}

export function useMsalLogin() {
  const { instance } = useMsal();

  const msalLogin = useCallback(() => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });
  }, [instance]);

  return msalLogin;
}

export function useMsalLogout() {
  const { instance } = useMsal();

  const msalLogout = useCallback(() => {
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/", // redirects the top level app after logout
    });
  }, [instance]);

  return msalLogout;
}

export function useMsalAuth() {
  const isAuthenticated = useIsAuthenticated();
  const login = useMsalLogin();
  const logout = useMsalLogout();

  return { isAuthenticated, login, logout };
}
