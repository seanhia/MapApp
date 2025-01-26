import { useEffect, useState, useRef } from "react";
import { haversineDistance } from "../utils/geolocation";
import Geolocation from "@react-native-community/geolocation";
import { saveLocation, fetchLocations } from "../../firestore";


export interface GeoPosition {
  coords: {
    latitude: number;
    longitude: number;
    altitude?: number | null;
    accuracy: number;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null;
  };
  timestamp: number;
}

export interface GeolocationError {
  code: number;
  message: string;
}

interface Location {
  latitude: number;
  longitude: number;
}

const useRealTimeTracking = (
  userId: string,
  radius: number
): [GeoPosition | null, string | null] => {
  const [location, setLocation] = useState<GeoPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedLocations, setSavedLocations] = useState<Location[]>([]);
  const savedLocationsRef = useRef<Location[]>([]);


  if (!userId) {
    console.error("User is not logged in!");
  } else {
    console.log("Authenticated user ID:", userId);
  }

  useEffect(() => {
    if (!userId) {
      setError("User not authenticated.");
      return;
    }

    let watchId: number | null = null;

    const initializeTracking = async () => {
      try {
        // Fetch saved locations from Firestore
        const locations = await fetchLocations(userId);
        savedLocationsRef.current = locations;
        setSavedLocations(locations);

        // Start real-time tracking
        watchId = Geolocation.watchPosition(
          async (position: GeoPosition) => {
            const { latitude, longitude } = position.coords;

            // Check if this location is far enough from saved locations
            const isFarEnough = savedLocationsRef.current.every((saved) => {
              const distance = haversineDistance(
                latitude,
                longitude,
                saved.latitude,
                saved.longitude
              );
              return distance > radius;
            });

            if (isFarEnough) {
              // Save the new location to Firestore
              await saveLocation(userId, latitude, longitude);

              // Update cached locations
              savedLocationsRef.current.push({
                latitude,
                longitude
              });
              setSavedLocations([...savedLocationsRef.current]);
            }

            // Update current location
            setLocation(position);
          },
          (error: GeolocationError) => {
            console.error("Error getting location:", error.message);
            setError(error.message);
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 10,
            interval: 5000,
          }
        );
      } catch (err) {
        console.error("Error initializing tracking:", err);
        setError("Failed to initialize location tracking.");
      }
    };

    initializeTracking();

    // Cleanup watcher on unmount
    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [userId, radius]);

  return [location, error];
};


export default useRealTimeTracking;
