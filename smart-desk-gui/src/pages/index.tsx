import { Box, Heading } from "@chakra-ui/react";
import DrawingCanvas from "../components/Canvas/DrawingCanvas";
import UICanvas from "../components/Canvas/UICanvas";

export default function Home() {
  return (
    <Box>
      <UICanvas />
      {/* <DrawingCanvas /> */}
    </Box>
  );
}
