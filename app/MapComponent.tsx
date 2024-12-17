import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 37.7749, // Example latitude
  lng: -122.4194, // Example longitude
};

function MapComponent() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyAetkasDlFSrTmAfJfAIF3ZGKTWkR6v4e0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {/* Marker for user location */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
