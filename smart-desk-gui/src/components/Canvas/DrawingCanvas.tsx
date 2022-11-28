import { Grid } from "@chakra-ui/react";
import React, { useState } from "react";

// @ts-ignore
import CanvasDraw from "react-canvas-draw";
import { CanvasProps } from "../interfaces/canvas";

export interface Position {
  x: number;
  y: number;
}

export default function DrawingCanvas() {
  const [canvasProps, setCanvasProps] = useState<CanvasProps>({
    brushColor: "red",
  });

  return (
    <Grid templateColumns="5rem auto">
      <CanvasDraw {...canvasProps} />
    </Grid>
  );
}
