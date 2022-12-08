import { ReactNode } from "react";

export interface UserLocation {
  lon: number;
  lat: number;
}

export interface ProviderProps {
  children: ReactNode;
}

export interface ModalControls {
  isOpen: boolean;
  onClose: () => void;
}
