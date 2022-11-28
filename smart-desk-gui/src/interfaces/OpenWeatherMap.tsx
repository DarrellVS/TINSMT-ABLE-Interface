export interface OpenWeatherMap {
  city: {
    id: number;
    name: string;
    country: string;
    coord: {
      lon: number;
      lat: number;
    };
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
  cod: string;
  message: number;
  cnt: number;
  list: Forecast;
}

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  visibility: number;
  clouds: {
    all: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}

export type Forecast = ForecastItem[];

export interface LocalData {
  id: number;
  city: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface WeatherContextType {
  forecast?: Forecast;
  localData?: LocalData;
  error?: Error;
  isLoading?: boolean;
}
