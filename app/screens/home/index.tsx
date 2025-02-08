import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Text, Image } from 'react-native';
import MapComponent from '@/components/MapComponent';
import FooterBar from '@/components/FooterBar';
import { SearchBar } from '@/components/MapSearchBar';
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

  const [location, error] = useRealTimeTracking(userId, 100); // Save new location once 100 meters away
  const [mapCenter, setMapCenter] = useState({ lat: 33.7838, lng: -118.1141 });
  const [weather, setWeather] = useState<{ iconUrl?: string; description?: string } | null>(null);

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
  
      const weatherData = response.data;
      const iconCode = weatherData.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`; // Use backticks here too
      const description = weatherData.weather[0].description;
  
      setWeather({ iconUrl, description });
      console.log("Weather Data:", weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      Alert.alert("Unable to fetch weather data.");
    }
  };
  

  const handlePlaceChanged = (data: any, details: any) => {
    if (details && details.geometry) {
      const location = details.geometry.location;
      setMapCenter({ lat: location.lat, lng: location.lng });
      fetchWeather(location.lat, location.lng);
    }
  };

  return (
    <View style={{ backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background, flex: 1 }}>
      <SearchBar onPlaceSelected={handlePlaceChanged} />
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapComponent initialCenter={mapCenter} weatherIcon={weather?.iconUrl} mapId='37201bcde93d12e8'/>
        </View>
        <View style={styles.weatherSidebar}>
          {weather && (
            <View style={styles.weatherCard}>
              <Text style={styles.weatherDescription}>{weather.description}</Text>
              <Image source={{ uri: weather.iconUrl }} style={styles.weatherIcon} />
            </View>
          )}
        </View>
      </View>
      <FooterBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mapContainer: {
    flex: 1,
    height: '100%',
  },
  weatherSidebar: {
    width: 120,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background, // Or dark, depending on theme
    borderLeftWidth: 1,
    borderLeftColor: Colors.light.border,
  },
  weatherCard: {
    padding: 10,
    alignItems: 'center',
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  weatherDescription: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});