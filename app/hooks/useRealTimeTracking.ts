import { useEffect, useState, useRef } from "react";
import { haversineDistance } from "../utils/geolocation";
// import Geolocation from "@react-native-community/geolocation"; doesn't work with expo go
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
  //const savedLocationsRef = useRef<Location[]>([]);

  useEffect(() => {
    if (!userId) {
      setError("User not authenticated.");
      return;
    }
    
    //let watchId: number | null = null;

    let subscription: Location.LocationSubscription | null = null; // location tracking event listener

    const initializeTracking = async () => {
      try {
        // request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Location permissions denied");
          return;
        }

        // Fetch saved locations from Firestore
        const locations = await fetchLocations(userId);
        //savedLocationsRef.current = locations;
        setSavedLocations(locations);

        // Start real-time tracking
        // watchId = Geolocation.watchPosition(
        //   async (position: GeoPosition) => {
        //     const { latitude, longitude } = position.coords;

        //     // Check if this location is far enough from saved locations
        //     const isFarEnough = savedLocationsRef.current.every((saved) => {
        //       const distance = haversineDistance(
        //         latitude,
        //         longitude,
        //         saved.latitude,
        //         saved.longitude
        //       );
        //       return distance > radius;
        //     });

        //     if (isFarEnough) {
        //       // Save the new location to Firestore
        //       await saveLocation(userId, latitude, longitude);

        //       // Update cached locations
        //       savedLocationsRef.current.push({
        //         latitude,
        //         longitude
        //       });
        //       setSavedLocations([...savedLocationsRef.current]);
        //     }

        //     // Update current location
        //     setLocation(position);
        //   },
        //   (error: GeolocationError) => {
        //     console.error("Error getting location:", error.message);
        //     setError(error.message);
        //   },
        //   {
        //     enableHighAccuracy: true,
        //     distanceFilter: 10,
        //     interval: 5000,
        //   }
        // );
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 50, // 50 meters for interval from last point
            timeInterval: 5000, // 5 seconds, 5k ms
          },
          async (position) => {
            const {latitude, longitude} = position.coords;

            const isFarEnough = savedLocations.every((saved) => {
              const distance = haversineDistance(
                latitude,
                longitude,
                saved.latitude,
                saved.longitude
              );
            });

            if (isFarEnough) {
              await saveLocation(userId, latitude, longitude); // save location to firestore

              setSavedLocations((prev) => [...prev, {latitude, longitude}]); // update cached locations
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
