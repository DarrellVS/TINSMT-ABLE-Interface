import { ReactNode } from "react";

export interface UserLocation {
  longitude: number;
  latitude: number;
}

export interface ProviderProps {
  children: ReactNode;
}
