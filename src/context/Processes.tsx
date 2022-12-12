import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useWindowActivity, { ProcessState } from "../hooks/useWindowActivity";
import { ProviderProps } from "../interfaces";
import {
  AddProcessType,
  DeskProcesses,
  ProcessesProviderType,
  PROCESS_TYPES,
} from "../interfaces/Processes";
import { ContextNotReadyFunction } from "../utils";
import { getIconForProcessType } from "../utils/processType";

const ProcessesContext = createContext<ProcessesProviderType>({
  processes: [],
  addProcess: ContextNotReadyFunction,
  createProcess: ContextNotReadyFunction,
});

export function useProcesses() {
  return useContext(ProcessesContext);
}

export default function ProcessesProvider({ children }: ProviderProps) {
  const [processes, setProcesses] = useState<DeskProcesses>([]);
  const { readCachedProcesses, saveState, updateState } = useWindowActivity();
  const isInitRef = useRef(false);

  const closeProcess = useCallback((id: number) => {
    setProcesses((prev) => prev.filter((currProcess) => currProcess.id !== id));
  }, []);

  const minimizeProcess = useCallback(
    (id: number, state: boolean = true) => {
      setProcesses((prev) =>
        prev.map((currProcess) => {
          if (currProcess.id === id) {
            if (currProcess.isMinimizing) return currProcess;

            setTimeout(() => {
              setProcesses((prev) =>
                prev.map((currProcess) => {
                  if (currProcess.id === id) {
                    return {
                      ...currProcess,
                      isMinimizing: false,
                    };
                  }

                  return currProcess;
                })
              );
            }, 500);

            updateState({
              type: currProcess.type,
              isMinimized: state,
              isActive: false,
            });

            return {
              ...currProcess,
              isMinimized: state,
              isMinimizing: true,
              isActive: false,
            };
          }

          return currProcess;
        })
      );
    },
    [updateState]
  );

  const setActiveProcess = useCallback(
    (id: number, isActive: boolean = true) => {
      setProcesses((prev) =>
        prev.map((currProcess) => {
          if (currProcess.id === id) {
            updateState({
              type: currProcess.type,
              isMinimized: false,
              isActive,
            });

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
    [updateState]
  );

  const addProcess = useCallback(
    (process: AddProcessType) => {
      console.log(process.id);

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
          isMinimizing: false,
        },
      ]);
    },
    [closeProcess, minimizeProcess, setActiveProcess]
  );

  const createProcess = useCallback(
    (
      type: PROCESS_TYPES,
      isMinimized: boolean = false,
      isActive: boolean = false,
      providedId: number = 69
    ) => {
      if (processes.some((process) => process.type === type)) return;

      const id = providedId
        ? providedId
        : processes.reduce(
            (prev, curr) => (prev > curr.id ? prev : curr.id),
            0
          );
      console.log("create", id);

      addProcess({
        id,
        type,
        name: type,
        icon: getIconForProcessType(type),
        isMinimized,
        isActive,
        isMinimizing: false,
      });

      saveState({
        type: type,
        isMinimized,
        isActive,
        position: {
          x: 0,
          y: 0,
        },
      });
    },
    [addProcess, processes, saveState]
  );

  useEffect(() => {
    if (isInitRef.current) return;
    isInitRef.current = true;
    const cachedProcesses = readCachedProcesses();

    cachedProcesses.forEach((process: ProcessState, index: number) => {
      createProcess(process.type, process.isMinimized, process.isActive, index);
    });
  }, [createProcess, processes, readCachedProcesses]);

  return (
    <ProcessesContext.Provider
      value={{
        processes,
        addProcess,
        createProcess,
      }}
    >
      {children}
    </ProcessesContext.Provider>
  );
}
