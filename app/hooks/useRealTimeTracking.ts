import { useEffect, useState } from "react";
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
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
}

interface Location {
  latitude: number;
  longitude: number;
  description: string;
}

const useRealTimeTracking = (
  userId: string,
  radius: number
): [GeoPosition | null, string | null] => {
  const [location, setLocation] = useState<GeoPosition | null>(null); // Current location
  const [error, setError] = useState<string | null>(null); // Error messages
  const [savedLocations, setSavedLocations] = useState<Location[]>([]); // Cached saved locations

  useEffect(() => {
    let watchId: number | null = null;

    (async () => {
      try {
        // Fetch saved locations from Firestore
        const locations = await fetchLocations(userId);
        setSavedLocations(locations);

        // Start real-time tracking
        watchId = Geolocation.watchPosition(
          async (position: GeoPosition) => {
            const { latitude, longitude } = position.coords;

            // Check if this location is far enough from all saved locations
            const isFarEnough = savedLocations.every((saved) => {
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
              await saveLocation(userId, latitude, longitude, "New location");

              // Update cached locations
              setSavedLocations((prev) => [
                ...prev,
                { latitude, longitude, description: "New location" },
              ]);
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
            distanceFilter: 10, // Minimum distance in meters for updates
            interval: 5000, // Minimum time in milliseconds for updates
          }
        );
      } catch (err) {
        console.error("Error initializing real-time tracking:", err);
        setError("Failed to initialize location tracking.");
      }
    })();

    // Cleanup watcher on unmount
    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [userId, radius, savedLocations]);

  return [location, error];
};

export default useRealTimeTracking;
