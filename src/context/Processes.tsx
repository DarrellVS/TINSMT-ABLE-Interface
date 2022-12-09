import React, { createContext, useCallback, useContext, useState } from "react";
import { Position } from "../components/Widgets/DrawingCanvas";
import { ProviderProps } from "../interfaces";
import {
  AddProcessType,
  DeskProcesses,
  ProcessesProviderType,
} from "../interfaces/Processes";
import { ContextNotReadyFunction } from "../utils";

const ProcessesContext = createContext<ProcessesProviderType>({
  processes: [],
  addProcess: ContextNotReadyFunction,
});

export function useProcesses() {
  return useContext(ProcessesContext);
}

export default function ProcessesProvider({ children }: ProviderProps) {
  const [processes, setProcesses] = useState<DeskProcesses>([]);

  const closeProcess = useCallback((id: number) => {
    setProcesses((prev) => prev.filter((currProcess) => currProcess.id !== id));
  }, []);

  const minimizeProcess = useCallback((id: number, state: boolean = true) => {
    setProcesses((prev) =>
      prev.map((currProcess) => {
        if (currProcess.id === id) {
          return {
            ...currProcess,
            isMinimized: state,
            isActive: false,
          };
        }

        return currProcess;
      })
    );
  }, []);

  const setActiveProcess = useCallback(
    (id: number, isActive: boolean = true) => {
      setProcesses((prev) =>
        prev.map((currProcess) => {
          if (currProcess.id === id) {
            return {
              ...currProcess,
              isActive,
            };
          }

          if (isActive)
            return {
              ...currProcess,
              isActive: false,
            };

          return currProcess;
        })
      );
    },
    []
  );

  const addProcess = useCallback(
    (process: AddProcessType) => {
      setProcesses((prev) => [
        ...prev.map((currProcess) => ({
          ...currProcess,
          isActive: false,
        })),
        {
          ...process,
          minimize: (state?: boolean) => minimizeProcess(process.id, state),
          close: () => closeProcess(process.id),
          setActive: (isActive?: boolean) =>
            setActiveProcess(process.id, isActive),
          isActive: true,
        },
      ]);
    },
    [closeProcess, minimizeProcess, setActiveProcess]
  );

  return (
    <ProcessesContext.Provider
      value={{
        processes,
        addProcess,
      }}
    >
      {children}
    </ProcessesContext.Provider>
  );
}
