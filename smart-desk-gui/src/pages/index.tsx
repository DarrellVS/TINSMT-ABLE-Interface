import { Box } from "@chakra-ui/react";
import DrawingCanvas from "../components/Canvas/DrawingCanvas";
import UICanvas from "../components/Canvas/UICanvas";
import { useWeather } from "../context/WeatherContext";

export default function Home() {
  const weather = useWeather();

  return (
    <Box>
      <UICanvas />
      {/* <DrawingCanvas /> */}
    </Box>
  );
}
