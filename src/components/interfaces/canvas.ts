export interface CanvasProps {
  onChange?: () => void | null;
  loadTimeOffset?: number;
  lazyRadius?: number;
  brushRadius?: number;
  brushColor?: string;
  catenaryColor?: string;
  gridColor?: string;
  hideGrid?: boolean;
  canvasWidth?: number;
  canvasHeight?: number;
  disabled?: number;
  imgSrc?: string;
  saveData?: () => void | null;
  immediateLoading?: boolean;
  hideInterface?: boolean;
  gridSizeX?: number;
  gridSizeY?: number;
  gridLineWidth?: number;
  hideGridX?: boolean;
  hideGridY?: boolean;
  enablePanAndZoom?: boolean;
  mouseZoomFactor?: number;
  zoomExtents?: { min: number; max: number };
}
