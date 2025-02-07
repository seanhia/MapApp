import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const googleMapsAPIKey="AIzaSyBA3GzhBkw9-TB7VArb6Os-3fAUSdC2o9c"

const containerStyle = {
  width: "100%",
  height: "90%",
};

interface MapComponentProps {
  initialCenter: { lat: number; lng: number };
  mapId: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ initialCenter, mapId}) => {
  const [currentCenter, setCurrentCenter] = useState(initialCenter);


  // Update the map's center when initialCenter changes
  useEffect(() => {
    setCurrentCenter(initialCenter);
  }, [initialCenter]);

  const options = {
    mapId: mapId, // Add the mapId here to apply the custom style
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsAPIKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentCenter} // Always use the updated center
        zoom={17}
        options={options} 
      >
        <Marker position={currentCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;

