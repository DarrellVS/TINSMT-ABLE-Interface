import { ReactNode } from "react";
import Dock from "./Dock";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Dock />
      {children}
    </>
  );
}
