import { ReactNode } from "react";

export interface UserLocation {
  longitude: number;
  latitude: number;
}

export interface ProviderProps {
  children: ReactNode;
}

export interface ModalControls {
  isOpen: boolean;
  onClose: () => void;
}
