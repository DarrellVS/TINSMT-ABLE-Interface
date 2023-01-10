export interface DeskProcess {
  id: number;
  type: PROCESS_TYPES;
  name: string;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  isMinimized: boolean;
  isActive: boolean;
  isMinimizing: boolean;
}

export type DeskProcesses = DeskProcess[];

export interface ProcessesProviderType {
  processes: DeskProcesses;
  addProcess: (process: DeskProcess) => void;
  createProcess: (
    type: PROCESS_TYPES,
    isMinimized?: boolean,
    isActive?: boolean,
    providedId?: number
  ) => void;
  closeProcess: (id: number) => void;
  minimizeProcess: (id: number, state?: boolean) => void;
  setActiveProcess: (id: number, isActive?: boolean) => void;
}

export enum PROCESS_TYPES {
  CALCULATOR = "CALCULATOR",
  WEATHER = "WEATHER",
  CLOCK = "CLOCK",
  DRAW = "DRAW",
  SPOTIFY = "SPOTIFY",
  CALENDAR = "CALENDAR",
  // NOTES = "NOTES",
}
