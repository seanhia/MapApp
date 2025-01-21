import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const googleMapsAPIKey="AIzaSyAetkasDlFSrTmAfJfAIF3ZGKTWkR6v4e0"

const containerStyle = {
  width: "100%",
  height: "90%",
};

interface MapComponentProps {
  initialCenter: { lat: number; lng: number };
}

const MapComponent: React.FC<MapComponentProps> = ({ initialCenter }) => {
  const [currentCenter, setCurrentCenter] = useState(initialCenter);

  // Update the map's center when initialCenter changes
  useEffect(() => {
    setCurrentCenter(initialCenter);
  }, [initialCenter]);

  return (
    <LoadScript googleMapsApiKey={googleMapsAPIKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentCenter} // Always use the updated center
        zoom={12}
      >
        <Marker position={currentCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
