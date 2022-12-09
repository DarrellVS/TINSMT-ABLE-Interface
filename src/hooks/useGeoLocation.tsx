import { useEffect, useState } from "react";
import { UserLocation } from "../interfaces";

export default function useGeoLocation() {
  const [location, setLocation] = useState<UserLocation>();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, [setLocation]);

  return location;
}
