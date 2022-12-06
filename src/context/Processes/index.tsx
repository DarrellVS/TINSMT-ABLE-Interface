import React, { createContext, useCallback, useContext, useState } from "react";
import { ProviderProps } from "../../interfaces";
import {
  AddProcessType,
  DeskProcesses,
  ProcessesProviderType,
} from "../../interfaces/Processes";
import { ContextNotReadyFunction } from "../../utils";

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
            isActive: currProcess.isMinimized,
          };
        }

        return {
          ...currProcess,
          isActive: false,
        };
      })
    );
  }, []);

  const minimizeProcess = useCallback((id: number) => {
    setProcesses((prev) =>
      prev.map((currProcess) => {
        if (currProcess.id === id) {
          return {
            ...currProcess,
            isMinimized: true,
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

  const maximizeProcess = useCallback((id: number) => {
    setProcesses((prev) =>
      prev.map((currProcess) => {
        if (currProcess.id === id) {
          return {
            ...currProcess,
            isMinimized: false,
            isMaximized: true,
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

  const toggleMaximizeProcess = useCallback((id: number) => {
    setProcesses((prev) =>
      prev.map((currProcess) => {
        if (currProcess.id === id) {
          return {
            ...currProcess,
            isMinimized: false,
            isMaximized: !currProcess.isMaximized,
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
        ...prev.map((currProcess) => ({
          ...currProcess,
          isActive: false,
        })),
        {
          ...process,
          minimize: () => minimizeProcess(process.id),
          toggleMinimize: () => toggleMinimizeProcess(process.id),
          maximize: () => maximizeProcess(process.id),
          toggleMaximize: () => toggleMaximizeProcess(process.id),
          close: () => closeProcess(process.id),
          setActive: (isActive?: boolean) =>
            setActiveProcess(process.id, isActive),
          isActive: true,
        },
      ]);
    },
    [
      closeProcess,
      maximizeProcess,
      minimizeProcess,
      setActiveProcess,
      toggleMaximizeProcess,
      toggleMinimizeProcess,
    ]
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
