import { useEffect, useState } from "react";
import { fetcher } from "../context/WeatherContext";
import { UserLocation } from "../interfaces";

interface IPApiReturnVal {
  status: string;
  lat: number;
  lon: number;
}

export default function useGeoLocation() {
  const [location, setLocation] = useState<UserLocation>();

  useEffect(() => {
    try {
      fetcher<IPApiReturnVal>(
        "http://ip-api.com/json/?fields=status,lat,lon,query"
      ).then(({ status, lat, lon }) => {
        if (status === "success") {
          setLocation({ lat, lon });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, [setLocation]);

  return location;
}
