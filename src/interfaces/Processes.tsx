import { ReactNode } from "react";

export interface AddProcessType {
  id: number;
  type: PROCESS_TYPES;
  name: string;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
}

export interface DeskProcess extends AddProcessType {
  minimize: () => void;
  toggleMinimize: () => void;
  maximize: () => void;
  toggleMaximize: () => void;
  close: () => void;
  setActive: (isActive?: boolean) => void;
  element: ReactNode;
}

export type DeskProcesses = DeskProcess[];

export interface ProcessesProviderType {
  processes: DeskProcesses;
  addProcess: (process: AddProcessType) => void;
}

export enum PROCESS_TYPES {
  CALCULATOR = "CALCULATOR",
  WEATHER = "WEATHER",
  CLOCK = "CLOCK",
  DRAW = "DRAW",
  // CALENDAR = "CALENDAR",
  // NOTES = "NOTES",
}