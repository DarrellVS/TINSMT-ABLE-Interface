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
  minimize: (state?: boolean) => void;
  close: () => void;
  setActive: (isActive?: boolean) => void;
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
  SPOTIFY = "SPOTIFY",
  // CALENDAR = "CALENDAR",
  // NOTES = "NOTES",
}
