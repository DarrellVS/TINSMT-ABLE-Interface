import { useProcesses } from "../context/Processes";

export default function useProcess(id: number) {
  const { processes } = useProcesses();
  const process = processes.find((process) => process.id === id);
  return process;
}
