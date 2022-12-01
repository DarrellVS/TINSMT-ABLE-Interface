import { BsClock, BsClouds, BsPencil } from "react-icons/bs";
import DrawingCanvas from "../components/Canvas/DrawingCanvas";
import Clock from "../components/Clock";
import Weather from "../components/Weather";
import { PROCESS_TYPES } from "../interfaces/Processes";
import { CiCalculator2 } from "react-icons/ci";
import Calculator from "../components/Calculator";

const map = {
  [PROCESS_TYPES.WEATHER]: {
    element: <Weather />,
    icon: <BsClouds />,
  },
  [PROCESS_TYPES.DRAW]: {
    element: <DrawingCanvas />,
    icon: <BsPencil />,
  },
  [PROCESS_TYPES.CLOCK]: {
    element: <Clock />,
    icon: <BsClock />,
  },
  [PROCESS_TYPES.CALCULATOR]: {
    element: <Calculator />,
    icon: <CiCalculator2 />,
  },
};

export function getElementForProcessType(type: PROCESS_TYPES) {
  return map[type].element;
}

export function getIconForProcessType(type: PROCESS_TYPES) {
  return map[type].icon;
}
