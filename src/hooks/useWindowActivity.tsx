import { useCallback } from "react";
import { PROCESS_TYPES } from "../interfaces/Processes";

export interface ProcessUpdateState {
  type: PROCESS_TYPES;
  isMinimized?: boolean;
  isActive?: boolean;
  position?: { x: number; y: number };
}

export interface ProcessState {
  type: PROCESS_TYPES;
  isMinimized: boolean;
  isActive: boolean;
  position: { x: number; y: number };
}

export default function useWindowActivity() {
  const readCachedProcesses = useCallback(() => {
    const localStorageItem = localStorage.getItem("processes");
    const processes: ProcessState[] = localStorageItem
      ? JSON.parse(localStorageItem)
      : [];

    return processes;
  }, []);

  const saveState = useCallback(
    ({ type, isMinimized, isActive, position }: ProcessState) => {
      const processes = readCachedProcesses();

      const processExists = processes.some(
        (process: ProcessState) => process.type === type
      );

      if (processExists) return;

      const newProcesses = [
        ...processes,
        {
          type,
          isMinimized,
          isActive,
          position,
        },
      ];

      localStorage.setItem("processes", JSON.stringify(newProcesses));
    },
    [readCachedProcesses]
  );

  const updateState = useCallback(
    ({ type, isMinimized, isActive, position }: ProcessUpdateState) => {
      const processes = readCachedProcesses();

      const newProcesses = processes.map((process: ProcessState) => {
        if (process.type === type) {
          return {
            ...process,
            isMinimized: isMinimized ?? process.isMinimized,
            isActive: isActive ?? process.isActive,
            position: position ?? process.position,
          };
        }

        return process;
      });

      localStorage.setItem("processes", JSON.stringify(newProcesses));
    },
    [readCachedProcesses]
  );

  const getProcessState = useCallback(
    (type: PROCESS_TYPES) => {
      const processes = readCachedProcesses();

      const process = processes.find((process: ProcessState) => {
        return process.type === type;
      });

      return process;
    },
    [readCachedProcesses]
  );

  const removeProcessState = useCallback(
    (type: PROCESS_TYPES) => {
      const processes = readCachedProcesses();

      const newProcesses = processes.filter((process: ProcessState) => {
        return process.type !== type;
      });

      localStorage.setItem("processes", JSON.stringify(newProcesses));
    },
    [readCachedProcesses]
  );

  return {
    readCachedProcesses,
    saveState,
    updateState,
    getProcessState,
    removeProcessState,
  };
}
