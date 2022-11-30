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

// @ts-ignore
import CanvasDraw from "react-canvas-draw";
import { CanvasProps } from "../interfaces/canvas";

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
      boxShadow={`5px 5px 10px rgba(0,0,0,0.2)`}
    />
  );
}

export default function DrawingCanvas() {
  const [canvasProps, setCanvasProps] = useState<CanvasProps>({
    brushColor: "red",
    hideGrid: true,
    canvasWidth: 500,
    brushRadius: 2,
  });

  const canvasRef = useRef(null);

  const undo = useCallback(() => {
    if (!canvasRef.current) return;
    // @ts-ignore
    canvasRef.current.undo();
  }, []);

  const defaultColors = [
    "red",
    "green",
    "blue",
    "purple",
    "yellow",
    "orange",
    "black",
    "white",
  ];

  return (
    <Grid templateRows="auto auto">
      <Box p="2rem" bg="gray.200" w={canvasProps.canvasWidth}>
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
      <CanvasDraw ref={canvasRef} {...canvasProps} />
    </Grid>
  );
}
