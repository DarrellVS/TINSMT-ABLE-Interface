import {
  Box,
  Button,
  Flex,
  Grid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import React, { useCallback, useRef, useState } from "react";
import CanvasDraw, { CanvasDrawProps } from "react-canvas-draw";

export interface Position {
  x: number;
  y: number;
}

function ColorItem({ color }: { color: string }) {
  return (
    <Box
      w="2rem"
      h="2rem"
      borderRadius="50%"
      bg={color}
      cursor="pointer"
      boxShadow={`0 0 10px rgba(255, 255, 255, .25)`}
      position="relative"
    />
  );
}

export default function DrawingCanvas() {
  const [canvasProps, setCanvasProps] = useState<CanvasDrawProps>({
    brushColor: "red",
    hideGrid: true,
    canvasWidth: 500,
    brushRadius: 2,
    enablePanAndZoom: true,
    mouseZoomFactor: -0.01,
    hideInterface: true,
  });
  const canvasRef = useRef<CanvasDraw>(null);

  const undo = useCallback(() => {
    if (!canvasRef.current) return;
    canvasRef.current.undo();
  }, []);

  const defaultColors = [
    "red",
    "green",
    "blue",
    "purple",
    "yellow",
    "black",
    "white",
  ];

  return (
    <Grid templateRows="auto auto">
      <Box
        p="2rem"
        w={canvasProps.canvasWidth}
        boxShadow="inset 0px -2px 2px -2px rgba(255, 255, 255, 0.5)"
      >
        <Flex gap="1rem" flexWrap="wrap">
          {defaultColors.map((color) => (
            <Box
              key={color}
              onClick={() => {
                setCanvasProps({
                  ...canvasProps,
                  brushColor: color,
                });
              }}
            >
              <ColorItem color={color} />
            </Box>
          ))}
        </Flex>
        <Flex mt="1rem" gap="1rem">
          <Button colorScheme="blue" onClick={undo}>
            Undo
          </Button>

          <Slider
            min={1}
            max={10}
            onChange={(v) => {
              setCanvasProps({
                ...canvasProps,
                brushRadius: v,
              });
            }}
            value={canvasProps.brushRadius}
          >
            <SliderTrack bg="gray.500">
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>
      </Box>
      <CanvasDraw
        ref={canvasRef}
        {...canvasProps}
        backgroundColor="transparent"
      />
    </Grid>
  );
}
