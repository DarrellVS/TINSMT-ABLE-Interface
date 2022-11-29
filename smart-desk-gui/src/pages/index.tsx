import { Box } from "@chakra-ui/react";
import DrawingCanvas from "../components/Canvas/DrawingCanvas";
import UICanvas from "../components/Canvas/UICanvas";
import Weather from "../components/Weather";
import { useWeather } from "../context/WeatherContext";

export default function Home() {
  return (
    <Box>
      <Box m="auto" maxW="50rem" pt="20rem">
        <Weather />
      </Box>
      {/* <UICanvas /> */}
      {/* <DrawingCanvas /> */}
    </Box>
  );
}
