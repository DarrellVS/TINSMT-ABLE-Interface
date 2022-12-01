import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function Clock() {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Box p="2rem">
      <Text fontSize="xl">{date.toLocaleTimeString()}</Text>
    </Box>
  );
}
