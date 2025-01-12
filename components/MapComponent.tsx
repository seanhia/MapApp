import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const googleMapsAPIKey="AIzaSyAetkasDlFSrTmAfJfAIF3ZGKTWkR6v4e0"

const containerStyle = {
  width: "100%",
  height: "90%",
};

const defaultCenter = {
  lat: 37.7749, // Example latitude
  lng: -122.4194, // Example longitude
};

interface MapComponentProps {
  initialCenter: { lat: number; lng: number }; // Initial center of the map
  onPlaceSelected?: (place: string) => void; // Optional callback when a place is selected
}

const MapComponent: React.FC<MapComponentProps> =({ 
  initialCenter, onPlaceSelected 
}) => {
  const [currentCenter, setCurrentCenter] = useState(initialCenter); 
  const [markers, setMarkers] = useState([initialCenter]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    }
  };

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => console.error('Geolocation not supported ')
      );
    }, []);

  return (
    <LoadScript googleMapsApiKey = {googleMapsAPIKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentCenter}
        zoom={12}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
