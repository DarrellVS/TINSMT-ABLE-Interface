import { BsClock, BsClouds, BsPencil } from "react-icons/bs";
import DrawingCanvas from "../components/Canvas/DrawingCanvas";
import Clock from "../components/Clock";
import Weather from "../components/Weather";
import { PROCESS_TYPES } from "../interfaces/Processes";

const elementMap = {
  [PROCESS_TYPES.WEATHER]: <Weather />,
  [PROCESS_TYPES.DRAW]: <DrawingCanvas />,
  [PROCESS_TYPES.CLOCK]: <Clock />,
};

export function getElementForProcessType(type: PROCESS_TYPES) {
  return elementMap[type];
}

const iconMap = {
  [PROCESS_TYPES.WEATHER]: <BsClouds />,
  [PROCESS_TYPES.DRAW]: <BsPencil />,
  [PROCESS_TYPES.CLOCK]: <BsClock />,
};

export function getIconForProcessType(type: PROCESS_TYPES) {
  return iconMap[type];
}
