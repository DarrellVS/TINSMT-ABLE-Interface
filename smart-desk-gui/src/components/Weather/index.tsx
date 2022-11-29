import { Flex, Text, Image, Spinner, Box } from "@chakra-ui/react";
import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useWeather } from "../../context/WeatherContext";

export default function Weather() {
  const { isLoading, localData, forecast } = useWeather();

  if (isLoading || !localData || !forecast) return <Spinner />;

  const currentWeather = {
    ...forecast[0],
  };

  console.log(forecast);

  const tempCelcius = Math.round(currentWeather.main.temp - 273.15);
  const min = Math.round(currentWeather.main.temp_min - 273.15);
  const max = Math.round(currentWeather.main.temp_max - 273.15);
  const feelsLike = Math.round(currentWeather.main.feels_like - 273.15);

  const forecastInCelcius = forecast.map((item) => {
    return {
      ...item,
      main: {
        ...item.main,
        temp: Math.round(item.main.temp - 273.15),
        temp_min: Math.round(item.main.temp_min - 273.15),
        temp_max: Math.round(item.main.temp_max - 273.15),
        feels_like: Math.round(item.main.feels_like - 273.15),
      },
    };
  });

  return (
    <Box p="2rem" rounded="8px" bg="gray.300">
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

      <LineChart width={500} height={300} data={forecastInCelcius}>
        <XAxis dataKey="dt" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="main.temp" stroke="#82ca9d" />
      </LineChart>
    </Box>
  );
}
