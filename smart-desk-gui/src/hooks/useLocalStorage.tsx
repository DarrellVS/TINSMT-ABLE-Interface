import { useEffect, useState } from "react";

export function useStateLocalStorage<T>(
  key: string,
  defaultValue: T,
  partial?: (state: T) => Partial<T>
): [T, (value: T) => void] {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return defaultValue;

    const valueInLocalStorage = localStorage.getItem(key);
    if (valueInLocalStorage) {
      // Base initial state on default value because localstorage written can be partial
      return { ...defaultValue, ...JSON.parse(valueInLocalStorage) };
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(partial ? partial(state) : state));
  }, [key, state, partial]);

  return [state, setState];
}
