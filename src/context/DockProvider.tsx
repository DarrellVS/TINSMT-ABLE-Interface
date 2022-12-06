import React, { createContext, useContext, useState } from "react";

const DockContext = createContext({
  displayDropArea: false,
  setDisplayDropArea: (display: boolean) => {},
});

export default function DockProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [displayDropArea, setDisplayDropArea] = useState(false);

  return (
    <DockContext.Provider value={{ displayDropArea, setDisplayDropArea }}>
      {children}
    </DockContext.Provider>
  );
}

export function useDock() {
  return useContext(DockContext);
}
