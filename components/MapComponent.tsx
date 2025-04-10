import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text } from "react-native";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { fetchLocations } from "@/firestore"; // Ensure this returns a Promise<Location[]>

const googleMapsAPIKey = "AIzaSyBA3GzhBkw9-TB7VArb6Os-3fAUSdC2o9c";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface MapComponentProps {
  initialCenter: { lat: number; lng: number };
  mapId: string;
  userId: string;
}

interface Location {
  lat: number;
  lng: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ initialCenter, mapId, userId }) => {
  const [googleMaps, setGoogleMaps] = useState<typeof google | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [cutoutPositions, setCutoutPositions] = useState<{ x: string; y: string }[]>([]);
  const [radiusInPixels, setRadiusInPixels] = useState(0);

  const mapRef = useRef<google.maps.Map | null>(null);
  const overlayRef = useRef<google.maps.OverlayView | null>(null);

  const { isLoaded } = useLoadScript({ googleMapsApiKey: googleMapsAPIKey });

  useEffect(() => {
    if (isLoaded && window.google) {
      setGoogleMaps(window.google);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!userId) return;
    fetchLocations(userId).then((data) => {
      setLocations(data.map(loc => ({ lat: loc.latitude, lng: loc.longitude })));
    });
  }, [userId]);
  

  const calculateRadiusInPixels = (zoom: number, lat: number) => {
    const metersPerPixel = (40008000 * Math.cos(lat * Math.PI / 180)) / (Math.pow(2, zoom) * 256);
    return 100 / metersPerPixel;
  };

  const updateCircle = useCallback(() => {
    if (!googleMaps || !mapRef.current || !initialCenter) return;

    const map = mapRef.current;
    const zoom = map.getZoom();
    const lat = initialCenter.lat;
    const newRadiusInPixels = calculateRadiusInPixels(zoom, lat);
    setRadiusInPixels(newRadiusInPixels);

    if (overlayRef.current) {
      overlayRef.current.setMap(null);
      overlayRef.current = null;
    }

    class CustomOverlay extends googleMaps.maps.OverlayView {
      onAdd() {}
      draw() {
        const projection = this.getProjection();
        const positions: { x: string; y: string }[] = [];

        locations.forEach((loc) => {
          const point = projection.fromLatLngToContainerPixel(
            new googleMaps.maps.LatLng(loc.lat, loc.lng)
          );
          if (point) {
            positions.push({ x: `${point.x}px`, y: `${point.y}px` });
          }
        });

        setCutoutPositions(positions);
      }
      onRemove() {}
    }

    const overlay = new CustomOverlay();
    overlay.setMap(map);
    overlayRef.current = overlay;
  }, [googleMaps, initialCenter, locations]);

  useEffect(() => {
    if (!googleMaps || !mapRef.current) return;

    updateCircle();

    const zoomListener = mapRef.current.addListener("zoom_changed", updateCircle);
    const dragListener = mapRef.current.addListener("dragend", updateCircle);

    return () => {
      google.maps.event.removeListener(zoomListener);
      google.maps.event.removeListener(dragListener);
    };
  }, [googleMaps, updateCircle]);

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
        {locations.map((point, index) => (
          <Marker key={index} position={point} />
        ))}
      </GoogleMap>

      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <mask id="cutout-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {cutoutPositions.map((pos, index) => (
                <circle
                  key={index}
                  cx={parseFloat(pos.x)}
                  cy={parseFloat(pos.y)}
                  r={radiusInPixels}
                  fill="black"
                />
              ))}
            </mask>
          </defs>

          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(105, 105, 105, 0.7)"
            mask="url(#cutout-mask)"
          />
        </svg>
      </View>
    </View>
  );
};

export default MapComponent;
