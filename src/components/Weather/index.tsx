import { Text, Image, Spinner, Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useWeather } from "../../context/WeatherContext";

function ForecastItem({
  label,
  icon,
  min,
  max,
}: {
  label: string;
  icon: string;
  min: number;
  max: number;
}) {
  return (
    <Flex direction="column" align="center">
      <Text>{label}</Text>
      <Image
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={label}
        w="4rem"
      />
      <Text>{max}°C</Text>
      <Text opacity="0.7">{min}°C</Text>
    </Flex>
  );
}

export default function Weather() {
  const { isLoading, localData, forecast } = useWeather();

  if (isLoading || !localData || !forecast) return <Spinner />;

  const currentWeather = {
    ...forecast[0],
  };

  const tempCelcius = Math.round(currentWeather.main.temp - 273.15);
  const min = Math.round(currentWeather.main.temp_min - 273.15);
  const max = Math.round(currentWeather.main.temp_max - 273.15);

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
      <Flex justifyContent="space-between" gap="4rem">
        <Flex>
          <Image
            src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
            alt={"Weather Icon"}
          />
          <Box py="1rem">
            <Text fontSize="1.5rem" textTransform="capitalize">
              {currentWeather.weather[0].description}
            </Text>
            <Text>{localData.name}</Text>
          </Box>
        </Flex>

        <Box py="1rem" pr="2rem" textAlign="right">
          <Text fontSize="1.5rem">{tempCelcius}°C</Text>
          <Text opacity="0.7">
            {min}°C / {max}°C
          </Text>
        </Box>
      </Flex>

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
