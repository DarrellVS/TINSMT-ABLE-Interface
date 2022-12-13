import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSystem } from "../../context/SystemProvider";

export default function Clock() {
  const [date, setDate] = useState(new Date());
  const { touch } = useSystem();

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const hourFormatted = date.getHours().toString().padStart(2, "0");
  const minuteFormatted = date.getMinutes().toString().padStart(2, "0");
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const monthName = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  return (
    <Box p="3rem" pb="3rem">
      <Flex justifyContent="space-between" alignItems="center" gap="3rem">
        <Flex
          direction="column"
          lineHeight="50px"
          fontWeight="bold"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="50">{hourFormatted}</Text>
          <Text fontSize="50">{minuteFormatted}</Text>
        </Flex>
        <Box opacity={0.7}>
          <Text fontSize="50" lineHeight="60px">
            {dayName}
          </Text>
          <Text fontSize="20">
            {monthName} {day}, {year}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
