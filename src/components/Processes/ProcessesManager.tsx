import React, { ReactNode } from "react";
import { useProcesses } from "../../context/Processes";
import Weather from "../Weather";
import Window from "../Window";

export default function ProcessesManager({
  children,
}: {
  children: ReactNode;
}) {
  const { processes } = useProcesses();
  return (
    <>
      {processes.map((process) => {
        return (
          <Window key={process.id} process={process}>
            {process.element}
          </Window>
        );
      })}
      {children}
    </>
  );
}
