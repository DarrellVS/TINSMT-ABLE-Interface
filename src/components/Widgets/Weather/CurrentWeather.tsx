import { Box, Flex, Image, Text } from "@chakra-ui/react";

export default function CurrentWeather({
  currentWeather,
  localData,
}: {
  currentWeather: any;
  localData: any;
}) {
  const tempCelcius = Math.round(currentWeather.main.temp - 273.15);
  const min = Math.round(currentWeather.main.temp_min - 273.15);
  const max = Math.round(currentWeather.main.temp_max - 273.15);

  return (
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
  );
}
