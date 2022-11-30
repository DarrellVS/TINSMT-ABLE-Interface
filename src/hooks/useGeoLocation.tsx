import { useEffect, useState } from "react";
import { UserLocation } from "../interfaces";

export default function useGeoLocation() {
  const [location, setLocation] = useState<UserLocation>();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.log(error);
      }
    );
  }, [setLocation]);

  return location;
}
