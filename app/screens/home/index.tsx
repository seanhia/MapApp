import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Platform, PermissionsAndroid } from 'react-native';
import MapComponent from '@/components/MapComponent';
import FooterBar from '@/components/FooterBar';
import { SearchBar } from '@/components/MapSearchBar';
import Geolocation from 'react-native-geolocation-service';
import useRealTimeTracking from '../../hooks/useRealTimeTracking';
import { getAuth } from "firebase/auth";
import axios from 'axios';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';

const WEATHER_API_KEY = "c91505cb2ca1c66df5e70feade5e8d06"; // Replace with your API key

export default function Home() {
  const { colorScheme } = useTheme();
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  if (!userId) {
    console.error("User is not logged in!");
    Alert.alert("Error", "You are not logged in. Please log in to use the app.");
    return null;
  }

  const [location, error] = useRealTimeTracking(userId, 100); //save a new location once 100 meters away from prev coordinates
  const [mapCenter, setMapCenter] = useState({ lat: 33.7838, lng: -118.1141 });
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (location) {
      console.log("Real-time location:", location.coords.latitude, location.coords.longitude);
      setMapCenter({ lat: location.coords.latitude, lng: location.coords.longitude });
      fetchWeather(location.coords.latitude, location.coords.longitude);
    }
    if (error) {
      console.error("Error with real-time tracking:", error);
      Alert.alert("Error", error);
    }
  }, [location, error]);

  const fetchWeather = async (latitude: number, longitude: number): Promise<void> => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`
      );
      setWeather(response.data);
      console.log("Weather Data:", response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      Alert.alert("Unable to fetch weather data.");
    }
  };

  const handlePlaceChanged = (data: any, details:any) => {
    if (details && details.geometry) {
      const location = details.geometry.location;
      setMapCenter({ lat: location.lat, lng: location.lng });
      fetchWeather(location.lat, location.lng);
    }
  };

  return (
    <View style={{ backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background, flex: 1 }}>
      <SearchBar onPlaceSelected={handlePlaceChanged} />
      <View style={styles.content}>
        <MapComponent initialCenter={mapCenter} weather={weather} mapId='37201bcde93d12e8'/>
      </View>
      <FooterBar />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const customMapStyles: google.maps.MapTypeStyle[] = [
  {
    featureType: "water",
    stylers: [
      {
        color: "#19a0d8",
      },
    ],
  },
  {
    featureType: "landscape",
    stylers: [
      {
        color: "#f1f1f1",
      },
    ],
  },
  // Add more styles here...
];
