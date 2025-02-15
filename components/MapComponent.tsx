import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";

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

  return (
    <LoadScriptNext googleMapsApiKey={googleMapsAPIKey} onLoad={() => setGoogleMaps(window.google)}>
      {/* Wrapper div to position the overlay */}
      <div style={{ position: "relative", width: "100%", height: "90%" }}>
        {/* Google Map */}
        <GoogleMap mapContainerStyle={containerStyle} center={currentCenter} zoom={17} options={options}>
          {/* User's location marker */}
          <Marker position={currentCenter} />
        </GoogleMap>

        {/* Overlay with circular cutout */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)", // Dark overlay
            zIndex: 9999, 
            pointerEvents: "none", // Allow interaction with the map
            maskImage: `radial-gradient(circle 150px at center, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 60%)`, // Circular transparency effect
            WebkitMaskImage: `radial-gradient(circle 150px at center, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 60%)`, // For Safari compatibility
          }}
        />
      </div>
    </LoadScriptNext>
  );
};

export default MapComponent;
