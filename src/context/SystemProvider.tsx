import React, { createContext, useContext, useState } from "react";
import { ContextNotReadyFunction } from "../utils";

interface SystemContextType {
  touch: {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
  };
}

const SystemContext = createContext<SystemContextType>({
  touch: {
    enabled: true,
    setEnabled: ContextNotReadyFunction,
  },
});

export default function SystemProvider<SystemContextType>({
  children,
}: {
  children: React.ReactNode;
}) {
  const [touchEnabled, setTouchEnabled] = useState(true);

  return (
    <SystemContext.Provider
      value={{
        touch: {
          enabled: touchEnabled,
          setEnabled: setTouchEnabled,
        },
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  return useContext(SystemContext);
}
