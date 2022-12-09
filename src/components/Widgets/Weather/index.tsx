import { Spinner, Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useWeather } from "../../../context/WeatherContext";
import CurrentWeather from "./CurrentWeather";
import ForecastItem from "./ForecastItem";

export default function Weather() {
  const { isLoading, localData, forecast } = useWeather();

  if (isLoading || !localData || !forecast) return <Spinner />;

  const currentWeather = {
    ...forecast[0],
  };

  const forecastPerDay = forecast.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof forecast>);

  return (
    <Box rounded="8px">
      <CurrentWeather currentWeather={currentWeather} localData={localData} />
      <Flex justifyContent="space-between" p="1rem">
        {Object.keys(forecastPerDay).map((item) => {
          const forecast = forecastPerDay[item][0];
          const dayName = new Date(forecast.dt * 1000).toLocaleDateString(
            "en-US",
            { weekday: "short" }
          );

          const min = Math.round(
            forecastPerDay[item].reduce(
              (acc, item) => Math.min(acc, item.main.temp_min),
              1000
            ) - 273.15
          );
          const max = Math.round(
            forecastPerDay[item].reduce(
              (acc, item) => Math.max(acc, item.main.temp_max),
              -1000
            ) - 273.15
          );

          return (
            <ForecastItem
              key={forecast.dt}
              label={dayName}
              icon={forecast.weather[0].icon}
              min={min}
              max={max}
            />
          );
        })}
      </Flex>
    </Box>
  );
}
