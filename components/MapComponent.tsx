import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text } from 'react-native';
import { GoogleMap, LoadScriptNext, Marker, useLoadScript } from "@react-google-maps/api"; // Web imports

const googleMapsAPIKey = "AIzaSyBA3GzhBkw9-TB7VArb6Os-3fAUSdC2o9c"; 

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface MapComponentProps {
  initialCenter: { lat: number; lng: number };
  mapId: string;
  weatherIcon?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ initialCenter, mapId, weatherIcon }) => {
  const [googleMaps, setGoogleMaps] = useState<typeof google | null>(null);
  const [cutoutPosition, setCutoutPosition] = useState({ x: "50%", y: "50%" });
  const [radiusInPixels, setRadiusInPixels] = useState(0);

  const mapRef = useRef<google.maps.Map | null>(null);
  const overlayRef = useRef<google.maps.OverlayView | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsAPIKey,
  });

  useEffect(() => {
    if (isLoaded && window.google) {
      setGoogleMaps(window.google);
    }
  }, [isLoaded]);

  // Handle undefined initialCenter values
  useEffect(() => {
    if (!initialCenter?.lat || !initialCenter?.lng) {
      console.error("Invalid initialCenter prop");
      return;
    }
  }, [initialCenter]);

  // Calculate radius in pixels for a 100m area based on zoom
  const calculateRadiusInPixels = (zoom: number, lat: number) => {
    const metersPerPixel = (40008000 * Math.cos(lat * Math.PI / 180)) / (Math.pow(2, zoom) * 256);
    return 100 / metersPerPixel; // 100 meters in pixels
  };

  // Update overlay position and mask
  const updateCircle = useCallback(() => {
    if (!googleMaps || !mapRef.current || !initialCenter?.lat || !initialCenter?.lng) return;

    const map = mapRef.current;
    const zoom = map.getZoom();
    const lat = initialCenter.lat;

    // Calculate the radius in pixels for 100 meters at the current zoom level
    const newRadiusInPixels = calculateRadiusInPixels(zoom, lat);
    setRadiusInPixels(newRadiusInPixels);

    // Cleanup existing overlay before creating a new one
    if (overlayRef.current) {
      overlayRef.current.setMap(null);
      overlayRef.current = null;
    }

    class CustomOverlay extends googleMaps.maps.OverlayView {
      private div: HTMLDivElement | null = null;

      onAdd() {
        this.div = document.createElement("div");
        this.div.style.position = "absolute";
        this.div.style.background = "rgba(255, 0, 0, 0.5)";
        const panes = this.getPanes();
        panes?.overlayLayer.appendChild(this.div);
      }

      draw() {
        if (!this.div) return;

        const projection = this.getProjection();

        const latLng = new googleMaps.maps.LatLng(initialCenter.lat, initialCenter.lng);
        const point = projection.fromLatLngToContainerPixel(latLng);

        if (point) {
          this.div.style.left = `${point.x - newRadiusInPixels / 2}px`;
          this.div.style.top = `${point.y - newRadiusInPixels / 2}px`;

          setCutoutPosition({
            x: `${point.x}px`,
            y: `${point.y}px`,
          });
        }
      }

      onRemove() {
        this.div?.remove();
        this.div = null;
      }
    }

    const overlay = new CustomOverlay();
    overlay.setMap(map);
    overlayRef.current = overlay;
  }, [googleMaps, initialCenter]);

  useEffect(() => {
    if (!googleMaps || !mapRef.current) return;
    const map = mapRef.current;

    updateCircle();

    const zoomListener = map.addListener("zoom_changed", updateCircle);
    const dragListener = map.addListener("dragend", updateCircle);

    return () => {
      google.maps.event.removeListener(zoomListener);
      google.maps.event.removeListener(dragListener);

      if (overlayRef.current) {
        overlayRef.current.setMap(null);
        overlayRef.current = null;
      }
    };
  }, [googleMaps, initialCenter, updateCircle]);

  const options = {
    mapId: mapId,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
  };

  if (!isLoaded) return <Text>Loading...</Text>;

  return (
    <View style={{ position: "absolute", width: "100%", height: "90%" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initialCenter}
        zoom={17}
        options={options}
        onLoad={(map) => (mapRef.current = map)}
      >
        <Marker position={initialCenter} />
      </GoogleMap>

      {/* Overlay with circular cutout */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(105, 105, 105, .7)",
          zIndex: 1,
          pointerEvents: "none",
          maskImage: `radial-gradient(circle ${radiusInPixels}px at ${cutoutPosition.x} ${cutoutPosition.y}, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 60%)`,
          WebkitMaskImage: `radial-gradient(circle ${radiusInPixels}px at ${cutoutPosition.x} ${cutoutPosition.y}, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 60%)`, // For Safari compatibility
        }}
      />
    </View>
  );
};

export default MapComponent;
