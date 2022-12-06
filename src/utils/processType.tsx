import {
  BsCalculator,
  BsClock,
  BsClouds,
  BsMusicNote,
  BsPencil,
} from "react-icons/bs";
import DrawingCanvas from "../components/Canvas/DrawingCanvas";
import Clock from "../components/Clock";
import Weather from "../components/Weather";
import { PROCESS_TYPES } from "../interfaces/Processes";
import Calculator from "../components/Calculator";
import Spotify from "../components/Spotify";

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
    icon: <BsCalculator />,
  },
  [PROCESS_TYPES.SPOTIFY]: {
    element: <Spotify />,
    icon: <BsMusicNote />,
  },
};

export function getElementForProcessType(type: PROCESS_TYPES) {
  return map[type].element;
}

export function getIconForProcessType(type: PROCESS_TYPES) {
  return map[type].icon;
}
