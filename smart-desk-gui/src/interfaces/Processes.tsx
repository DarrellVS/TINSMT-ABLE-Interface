import { ReactNode, RefObject } from "react";

export interface AddProcessType {
  id: number;
  type: VALID_PROCESSES;
  name: string;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  isMinimized: boolean;
}

export interface DeskProcess extends AddProcessType {
  toggleMinimize: () => void;
  close: () => void;
}

export type DeskProcesses = DeskProcess[];

export interface ProcessesProviderType {
  processes: DeskProcesses;
  addProcess: (process: AddProcessType) => void;
}

export enum VALID_PROCESSES {
  WEATHER = "WEATHER",
  // CALENDAR = "CALENDAR",
  // NOTES = "NOTES",
}
