import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScriptNext, Marker, useLoadScript } from "@react-google-maps/api";

const googleMapsAPIKey = "AIzaSyBA3GzhBkw9-TB7VArb6Os-3fAUSdC2o9c"; // Replace with your actual API key

const containerStyle = {
  width: "100%",
  height: "90%",
};

interface MapComponentProps {
  initialCenter: { lat: number; lng: number };
  mapId: string;
  weatherIcon?:string;
}

const MapComponent: React.FC<MapComponentProps> = ({ initialCenter, mapId,weatherIcon }) => {
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

  // Calculate the number of pixels for a 100m radius based on the zoom 
  const calculateRadiusInPixels = (zoom: number, lat: number) => {
    const metersPerPixel = (40008000 * Math.cos(lat * Math.PI / 180)) / (Math.pow(2, zoom) * 256); // Earth circumference at latitude
    const radiusInMeters = 100; // 100 meters radius
    return radiusInMeters / metersPerPixel;
  };

  // Update cutout position and radius when the map is loaded or zoomed
  useEffect(() => {
    if (!googleMaps || !mapRef.current || !initialCenter?.lat || !initialCenter?.lng) return;

    const map = mapRef.current;

    const updateCircle = () => {
      const zoom = map.getZoom();
      const lat = initialCenter.lat;

      // Calculate the radius in pixels for 100 meters at current zoom level
      const radiusInPixels = calculateRadiusInPixels(zoom, lat);
      setRadiusInPixels(radiusInPixels);

     
      class CustomOverlay extends googleMaps.maps.OverlayView {
        private div: HTMLDivElement | null = null;

        onAdd() {
          this.div = document.createElement("div");
          this.div.style.position = "absolute";
          this.div.style.background = "rgba(255, 0, 0, 0.5)";
          const panes = this.getPanes();
          if (panes) {
            panes.overlayLayer.appendChild(this.div);
          }
        }

        draw() {
          if (!this.div) return;

          const projection = this.getProjection();
          if (!projection) return;

          const latLng = new googleMaps.maps.LatLng(initialCenter.lat, initialCenter.lng);
          const point = projection.fromLatLngToContainerPixel(latLng);

          if (point) {
            this.div.style.left = `${point.x - radiusInPixels / 2}px`; // Adjust to make the circle centered
            this.div.style.top = `${point.y - radiusInPixels / 2}px`; // Adjust to make the circle centered

            // Set the mask position
            setCutoutPosition({
              x: `${point.x}px`,
              y: `${point.y}px`,
            });
          }
        }

        onRemove() {
          if (this.div) {
            this.div.remove();
            this.div = null;
          }
        }
      }

      const overlay = new CustomOverlay();
      overlay.setMap(map);
      overlayRef.current = overlay;

      return () => {
        if (overlayRef.current) {
          overlayRef.current.setMap(null);
          overlayRef.current = null;
        }
      };
    };

    updateCircle();

    const zoomListener = map.addListener("zoom_changed", updateCircle); // Update on zoom change
    const dragListener = map.addListener("dragend", updateCircle); // Update on map drag

    return () => {
       
      if (zoomListener) {
        google.maps.event.removeListener(zoomListener);
      }
      if (dragListener) {
        google.maps.event.removeListener(dragListener);
      }
    };
  }, [googleMaps, initialCenter, radiusInPixels]);

  const options = {
    mapId: mapId, // Applying custom map style
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ position: "absolute", width: "100%", height: "90%" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initialCenter}
        zoom={17}
        options={options}
        onLoad={(map) => (mapRef.current = map)}
      >
        <Marker position={initialCenter} />
      </GoogleMap>

      {/* overlay with circular cutout */}
      <div
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
          WebkitMaskImage: `radial-gradient(circle ${radiusInPixels}px at ${cutoutPosition.x} ${cutoutPosition.y}, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 60%)`,  // For Safari compatibility
        }}
      />
    </div>
  );
};

export default MapComponent;
