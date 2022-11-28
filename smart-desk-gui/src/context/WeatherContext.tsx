import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Forecast,
  LocalData,
  OpenWeatherMap,
  WeatherContextType,
} from "../interfaces/OpenWeatherMap";

interface Props {
  children: React.ReactNode;
}

const WeatherContext = createContext<WeatherContextType>({});

interface DefaultFetcherOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, string>;
  body?: Record<string, string>;
  controller?: AbortController;
}

function fetcher<T>(url: string, options: DefaultFetcherOptions): Promise<T> {
  const { method = "GET", params, body } = options;
  const query = new URLSearchParams(params);
  const urlWithQuery = `${url}?${query.toString()}`;

  const { signal } = options.controller || new AbortController();

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

export default function WeatherContextProvider({ children }: Props) {
  const [forecast, setForecast] = useState<Forecast>();
  const [localData, setLocalData] = useState<LocalData>();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [interval, setIntervalState] = useState<NodeJS.Timer>();

  const getWeather = useCallback(() => {
    fetcher<OpenWeatherMap>(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat: "51.5074",
          lon: "0.1278",
          appid: "d6008acc1d16a2432de986ca86ee3c1e",
        },
      }
    )
      .then((data) => {
        const { list, city } = data;
        setForecast(list);
        setLocalData({
          ...city,
          city: city.name,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setIsLoading(false);
      });
  }, []);

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
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        forecast,
        localData,
        error,
        isLoading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}
