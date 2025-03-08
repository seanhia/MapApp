import * as Location from 'expo-location';


/**
 * Calculates the distance between two geographical points using the Haversine formula.
 * @param lat1 Latitude of the first point
 * @param lon1 Longitude of the first point
 * @param lat2 Latitude of the second point
 * @param lon2 Longitude of the second point
 * @returns Distance in meters
 */

// Haversine Formula 
// Source: https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/#

export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const toRadians = (angle: number) => (angle * Math.PI) / 180;
  
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; // Distance in meters
  }

  export async function getCityCountry() {
    try{
      // check permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log("Need location permissions")
        return null;
    }

    // get coordinates with expo-location
    const location = await Location.getCurrentPositionAsync({});
    if (!location || !location.coords) {
      console.log("Location not available");
      return { city: "Location not available", country: "Location not available" };
    }

    console.log(`Lat ${location.coords.latitude}, Lng ${location.coords.longitude}`);
    const places = await Location.reverseGeocodeAsync(location.coords); // reverse geocode coords to get places data
    console.log("Reverse Geocode:", JSON.stringify(places, null, 2));

    if (!places || places.length === 0) {
      console.log("Reverse geocoding failed");
      return { city: "Unknown", country: "Unknown" };
    }
    const place = places[0]; // get the first place object

    return {
        city: place.city || "City not found",
        country: place.country || "Country not found",
    };
    } catch (error) {
      console.error("Error getting city/country", error);
      return { city: "error w/ city", country: "error w/ country"};
    }
    
}
  