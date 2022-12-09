import { Flex, Text, Image } from "@chakra-ui/react";

export default function ForecastItem({
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
