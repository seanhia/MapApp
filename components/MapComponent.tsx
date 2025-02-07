import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const googleMapsAPIKey = "AIzaSyBA3GzhBkw9-TB7VArb6Os-3fAUSdC2o9c"; // Replace with your actual API key

const containerStyle = {
  width: "100%",
  height: "90%",
};

interface MapComponentProps {
  initialCenter: { lat: number; lng: number };
  mapId: string;
  weatherIcon?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ initialCenter, mapId, weatherIcon }) => {
  const [currentCenter, setCurrentCenter] = useState(initialCenter);
  const [googleMaps, setGoogleMaps] = useState<typeof google | null>(null);

  useEffect(() => {
    if (window.google) {
      setGoogleMaps(window.google);
    }
  }, []);

  useEffect(() => {
    setCurrentCenter(initialCenter);
  }, [initialCenter]);

  const options = {
    mapId: mapId, // Applying custom map style
  };

  const scaledSize = googleMaps?.maps?.Size
    ? new googleMaps.maps.Size(50, 50)
    : { width: 50, height: 50 }; // Fallback size

  return (
    <LoadScript googleMapsApiKey={googleMapsAPIKey} onLoad={() => setGoogleMaps(window.google)}>
      <GoogleMap mapContainerStyle={containerStyle} center={currentCenter} zoom={17} options={options}>
        {/* User's location marker */}
        <Marker position={currentCenter} />

        {/* Weather icon marker */}
        {weatherIcon && (
          <Marker
            position={currentCenter}
            icon={{
              url: weatherIcon || "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Default marker if no weather icon
              scaledSize: scaledSize, // Use the computed scaled size
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
