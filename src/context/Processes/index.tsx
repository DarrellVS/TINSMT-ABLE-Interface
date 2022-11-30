import React, { createContext, useCallback, useContext, useState } from "react";
import { ProviderProps } from "../../interfaces";
import {
  AddProcessType,
  DeskProcesses,
  ProcessesProviderType,
} from "../../interfaces/Processes";
import { ContextNotReadyFunction } from "../../utils";
import { getElementForProcessType } from "../../utils/processType";

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

  const toggleMinimizeProcess = useCallback((id: number) => {
    setProcesses((prev) =>
      prev.map((currProcess) => {
        if (currProcess.id === id) {
          return {
            ...currProcess,
            isMinimized: !currProcess.isMinimized,
          };
        }

        return currProcess;
      })
    );
  }, []);

  const setActiveProcess = useCallback((id: number) => {
    setProcesses((prev) =>
      prev.map((currProcess) => {
        if (currProcess.id === id) {
          return {
            ...currProcess,
            isActive: true,
          };
        }

        return {
          ...currProcess,
          isActive: false,
        };
      })
    );
  }, []);

  const addProcess = useCallback(
    (process: AddProcessType) => {
      setProcesses((prev) => [
        ...prev,
        {
          ...process,
          toggleMinimize: () => toggleMinimizeProcess(process.id),
          close: () => closeProcess(process.id),
          setActive: () => setActiveProcess(process.id),
          element: getElementForProcessType(process.type),
        },
      ]);
    },
    [closeProcess, setActiveProcess, toggleMinimizeProcess]
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
