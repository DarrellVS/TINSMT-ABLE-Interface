import { ReactNode } from "react";
import Dock from "./Dock";
import SystemControls from "./SystemControls";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Dock />
      <SystemControls />
      {children}
    </>
  );
}
