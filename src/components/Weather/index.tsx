import { Text, Image, Spinner, Box } from "@chakra-ui/react";
import React from "react";
import { useWeather } from "../../context/WeatherContext";

export default function Weather() {
  const { isLoading, localData, forecast } = useWeather();

  if (isLoading || !localData || !forecast) return <Spinner />;

  const currentWeather = {
    ...forecast[0],
  };

  const tempCelcius = Math.round(currentWeather.main.temp - 273.15);
  const min = Math.round(currentWeather.main.temp_min - 273.15);
  const max = Math.round(currentWeather.main.temp_max - 273.15);
  const feelsLike = Math.round(currentWeather.main.feels_like - 273.15);

  return (
    <Box p="2rem" rounded="8px">
      <Image
        src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
        alt={"Weather Icon"}
      />
      <Text fontSize="xl">City: {localData.name}</Text>
      <Text fontSize="xl">Status: {currentWeather.weather[0].description}</Text>
      <Text fontSize="xl">Temperature: {tempCelcius}℃</Text>
      <Text fontSize="xl">Min: {min}℃</Text>
      <Text fontSize="xl">Max: {max}℃</Text>
      <Text fontSize="xl">Feels Like: {feelsLike}℃</Text>
      <Text fontSize="xl">Humidity: {currentWeather.main.humidity}%</Text>
      <Text fontSize="xl">Wind Speed: {currentWeather.wind.speed}m/s</Text>
    </Box>
  );
}
