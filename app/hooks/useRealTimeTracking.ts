import { useEffect, useState, useRef } from "react";
import { haversineDistance } from "../utils/geolocation";
import * as Location from 'expo-location';
import { saveLocation, fetchLocations } from "../../firestore";


export interface GeoPosition {
  coords: {
    latitude: number;
    longitude: number;
    altitude?: number | null;
    accuracy: number | null;
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
  const lastSavedLocationRef = useRef<Location | null>(null);

  useEffect(() => { // update ref when savedLocations updates
    savedLocationsRef.current = savedLocations;
  }, [savedLocations]);

  useEffect(() => {
    if (!userId) {
      setError("User not authenticated.");
      return;
    }
    
    let subscription: Location.LocationSubscription | null = null; // location tracking event listener

    const initializeTracking = async () => {
      try {
        // request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Location permissions denied");
          return;
        }

        // use ref to fetch all saved location instead of querying each location individually
        const updateSavedLocation = (newLocation: Location) => {
          setSavedLocations((prev) => {
            const updated = [...prev, newLocation];
            savedLocationsRef.current = updated;
            return updated;
          });
        };

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: radius, // interval from last point
            timeInterval: 30000, // 30 seconds
          },
          async (position) => { //callback 
            const {latitude, longitude} = position.coords;

            // check for duplicates (usaully happens when location first initializes)
            if (
              lastSavedLocationRef.current &&
              lastSavedLocationRef.current.latitude === latitude &&
              lastSavedLocationRef.current.longitude === longitude
            ) {
              setLocation(position);
              return;
            }
        

            const isFarEnough = savedLocationsRef.current.every((saved) => {
              const distance = haversineDistance(
                latitude,
                longitude,
                saved.latitude,
                saved.longitude
              );
              return distance >= radius; //return true if the distance is larger than radius
            });

            if (isFarEnough) {
              await saveLocation(userId, latitude, longitude); // save location to firestore
              updateSavedLocation({latitude, longitude}) // update cached locations
            }
            setLocation(position); // update current location
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
      if (subscription) {
        subscription.remove();
      }
    };
  }, [userId, radius]);

  return [location, error];
};


export default useRealTimeTracking;
