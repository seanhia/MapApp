import 'react-native-get-random-values';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Alert, Text, Image, TouchableOpacity } from 'react-native';
import MapComponent from '@/components/MapComponent';
import FooterBar from '@/components/FooterBar';
import { SearchBar } from '@/components/MapSearchBar';
import useRealTimeTracking from '../../hooks/useRealTimeTracking';
import { getAuth } from "firebase/auth";
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme'; 
import { saveStats } from '@/firestore';

const WEATHER_API_KEY = "c91505cb2ca1c66df5e70feade5e8d06"; // Replace with your API key

export default function Home() {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  if (!userId) {
    console.error("User is not logged in!");
    Alert.alert("Error", "You are not logged in. Please log in to use the app.");
    return (
      <View style={styles.container}>
        <Text>User is not logged in. Please log in to continue.</Text>
      </View>
    );null;
  }
  const { colorScheme } = useTheme();
  const [location, error] = useRealTimeTracking(userId, 100); // Save new location once 100 meters away
  const [mapCenter, setMapCenter] = useState({ lat: 33.7838, lng: -118.1141 });
  const [weather, setWeather] = useState<{ iconUrl?: string; description?: string; details?: any } | null>(null);
  const [isExpanded, setIsExpanded] = useState(false); // Toggle for pop-up details
  const lastFetchedLocation = useRef<{ lat: number; lng: number } | null>(null);
  var darkMode = '51d9728a5051a451'

  if (colorScheme === 'dark') {
    darkMode = '51d9728a5051a451'
  } else {
    darkMode = '37201bcde93d12e8'
  }

  useEffect(() => {
    if (location) {
      console.log("Real-time location:", location.coords.latitude, location.coords.longitude);
      setMapCenter({ lat: location.coords.latitude, lng: location.coords.longitude });
      fetchWeather(location.coords.latitude, location.coords.longitude);
    }

    if(userId) {
      saveStats(userId);
    }
    
    if (error) {
      console.error("Error with real-time tracking:", error);
      Alert.alert("Error", error.toString());
    }
  }, [location, error]);

  const fetchWeather = async (latitude: number, longitude: number): Promise<void> => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`
      );
  
      const weatherData = response.data;
      const iconCode = weatherData.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      const description = weatherData.weather[0].description;
  
      setWeather({ iconUrl, description, details: weatherData });
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
  colorScheme === 'dark' ? Colors.dark.background : Colors.light.background
  return (     
    <View style={styles.container}>
      <SearchBar onPlaceSelected={handlePlaceChanged} />
      <View style={styles.mapContainer}>
        <MapComponent initialCenter={mapCenter} weatherIcon={weather?.iconUrl} mapId={darkMode} />
      </View>

      {/* Floating Weather Box */}
      {weather?.iconUrl && (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={styles.weatherBox}>
          <Image source={{ uri: weather.iconUrl }} style={styles.weatherIcon} />
        </TouchableOpacity>
      )}

      {/*  Weather Details  */}
      {isExpanded && weather?.details && (
        <View style={styles.weatherPopup}>
          <Text style={styles.weatherDescription}>{weather.details.weather[0]?.description}</Text>
          <Text>Temperature: {weather.details.main?.temp}°C</Text>
          <Text>Humidity: {weather.details.main?.humidity}%</Text>
          <Text>Wind Speed: {weather.details.wind?.speed} m/s</Text>
        </View>
      )}

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
  // weather box (light box)
  weatherBox: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Light effect
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  // Weather details pop-up
  weatherPopup: {
    position: "absolute",
    top: 80,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },
  weatherDescription: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: "bold",
  },
});


