import {
  BsCalculator,
  BsClock,
  BsClouds,
  BsMusicNote,
  BsPencil,
} from "react-icons/bs";
import DrawingCanvas from "../components/Widgets/DrawingCanvas";
import Clock from "../components/Widgets/Clock";
import Weather from "../components/Widgets/Weather";
import { PROCESS_TYPES } from "../interfaces/Processes";
import Calculator from "../components/Widgets/Calculator";
import Spotify from "../components/Widgets/Spotify";

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
