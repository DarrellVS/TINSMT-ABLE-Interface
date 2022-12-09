import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import { ProviderProps } from "../interfaces";
import {
  Forecast,
  LocalData,
  OpenWeatherMap,
} from "../interfaces/OpenWeatherMap";

const WeatherContext = createContext<Weather>({});

interface DefaultFetcherOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, string>;
  body?: Record<string, string>;
  controller?: AbortController;
}

export function fetcher<T>(
  url: string,
  options?: DefaultFetcherOptions
): Promise<T> {
  const { method = "GET", params, body } = options || {};
  const query = new URLSearchParams(params);
  const urlWithQuery = `${url}?${query.toString()}`;

  const { signal } = options?.controller || new AbortController();

  const bodyHeaders = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(urlWithQuery, {
    method,
    ...(body ? { body: JSON.stringify(body), ...bodyHeaders } : {}),
    signal,
  }).then((res) => res.json());
}

interface Weather {
  localData?: LocalData;
  forecast?: Forecast;
  isLoading?: boolean;
  error?: string;
}

export default function WeatherContextProvider({ children }: ProviderProps) {
  const [interval, setIntervalState] = useState<NodeJS.Timer>();
  const [weather, setWeather] = useState<Weather>({
    isLoading: true,
  });
  const location = useGeoLocation();

  const getWeather = useCallback(() => {
    if (!location) return;

    fetcher<OpenWeatherMap>(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat: location.latitude.toString(),
          lon: location.longitude.toString(),
          appid: "d6008acc1d16a2432de986ca86ee3c1e",
        },
      }
    )
      .then((data) => {
        const { list, city } = data;
        setWeather((weather) => ({
          ...weather,
          forecast: list,
          localData: city,
          isLoading: false,
        }));
      })
      .catch((err) => {
        console.error(err);
        setWeather((weather) => ({
          ...weather,
          error: err.message,
          isLoading: false,
        }));
      });
  }, [location]);

  const cancelRequest = useCallback(() => {
    clearInterval(interval);
  }, [interval]);

  useEffect(() => {
    getWeather();
    setIntervalState(setInterval(getWeather, 15000));

    return () => {
      cancelRequest();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (!weather) return <>{children}</>;

  return (
    <WeatherContext.Provider value={weather}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}
