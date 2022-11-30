import { ReactNode, RefObject } from "react";

export interface AddProcessType {
  id: number;
  type: PROCESS_TYPES;
  name: string;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  isMinimized: boolean;
  isActive: boolean;
}

export interface DeskProcess extends AddProcessType {
  toggleMinimize: () => void;
  close: () => void;
  setActive: () => void;
  element: ReactNode;
}

export type DeskProcesses = DeskProcess[];

export interface ProcessesProviderType {
  processes: DeskProcesses;
  addProcess: (process: AddProcessType) => void;
}

export enum PROCESS_TYPES {
  WEATHER = "WEATHER",
  DRAW = "DRAW",
  // CALENDAR = "CALENDAR",
  // NOTES = "NOTES",
}
