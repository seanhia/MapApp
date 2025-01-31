import React from 'react';
import { Image } from 'react-native';
import MapView from 'react-native-web-maps';

export default function MapComponent({ initialCenter, weather }) {
  return (
    <MapView
      style={{ flex: 1, width: '100%', height: '100%' }}
      initialRegion={{
        latitude: initialCenter.lat,
        longitude: initialCenter.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {/* User's Current Location Marker */}
      <Marker coordinate={{ latitude: initialCenter.lat, longitude: initialCenter.lng }}>
        <Image source={require('../../../../assets/images/home.png')} style={{ width: 40, height: 40 }} />
      </Marker>

      {/* Weather Icon Marker */}
      {weather && weather.weather[0]?.icon && (
        <Marker coordinate={{ latitude: initialCenter.lat, longitude: initialCenter.lng }}>
          <Image
  source={{ uri: weather ? `https://openweathermap.org/img/wn/${weather.weather[0]?.icon || "01d"}@2x.png` : null }}
  style={{ width: 50, height: 50 }}
  onError={() => console.error("Weather icon failed to load!")}
        />
        </Marker>
      )}
    </MapView>
  );
}
